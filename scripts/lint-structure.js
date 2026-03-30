#!/usr/bin/env node

/**
 * 结构化验证脚本 - lint:structure
 * 
 * 验证项目结构的完整性和一致性。
 * 每条错误消息都嵌入了修复指令，让 Agent 工作时同时"学会"修复。
 * 
 * 检查项:
 * 1. i18n key 一致性 (en.json vs zh.json)
 * 2. UI 组件统一导出
 * 3. 页面测试覆盖
 * 4. AGENTS.md 存在性
 * 5. progress.json 存在性
 * 6. feature_list.json 有效性
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
let errors = 0;
let warnings = 0;

function error(msg) {
  console.error(`❌ ERROR: ${msg}`);
  errors++;
}

function warn(msg) {
  console.warn(`⚠️  WARN: ${msg}`);
  warnings++;
}

function success(msg) {
  console.log(`✅ PASS: ${msg}`);
}

// ============================================================
// Check 1: i18n key 一致性
// ============================================================
function checkI18nKeys() {
  console.log("\n📋 检查 1: i18n key 一致性");
  console.log("─".repeat(50));

  const enPath = path.join(ROOT, "src/i18n/en.json");
  const zhPath = path.join(ROOT, "src/i18n/zh.json");

  if (!fs.existsSync(enPath) || !fs.existsSync(zhPath)) {
    error("缺少 i18n 文件 → 修复: 确保 src/i18n/en.json 和 src/i18n/zh.json 都存在");
    return;
  }

  const en = JSON.parse(fs.readFileSync(enPath, "utf8"));
  const zh = JSON.parse(fs.readFileSync(zhPath, "utf8"));

  function getKeys(obj, prefix = "") {
    const keys = [];
    for (const [key, value] of Object.entries(obj)) {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      if (typeof value === "object" && value !== null && !Array.isArray(value)) {
        keys.push(...getKeys(value, fullKey));
      } else {
        keys.push(fullKey);
      }
    }
    return keys;
  }

  const enKeys = new Set(getKeys(en));
  const zhKeys = new Set(getKeys(zh));

  const missingInZh = [...enKeys].filter((k) => !zhKeys.has(k));
  const missingInEn = [...zhKeys].filter((k) => !enKeys.has(k));

  if (missingInZh.length > 0) {
    error(
      `${missingInZh.length} 个 key 在 zh.json 中缺失 → 修复: 在 src/i18n/zh.json 中添加以下 key:\n` +
        missingInZh.map((k) => `    - ${k}`).join("\n")
    );
  }

  if (missingInEn.length > 0) {
    error(
      `${missingInEn.length} 个 key 在 en.json 中缺失 → 修复: 在 src/i18n/en.json 中添加以下 key:\n` +
        missingInEn.map((k) => `    - ${k}`).join("\n")
    );
  }

  if (missingInZh.length === 0 && missingInEn.length === 0) {
    success(`i18n key 完全一致 (共 ${enKeys.size} 个 key)`);
  }
}

// ============================================================
// Check 2: UI 组件统一导出
// ============================================================
function checkUIExports() {
  console.log("\n📋 检查 2: UI 组件统一导出");
  console.log("─".repeat(50));

  const uiDir = path.join(ROOT, "src/components/ui");
  const indexPath = path.join(uiDir, "index.ts");

  if (!fs.existsSync(indexPath)) {
    error("缺少 components/ui/index.ts → 修复: 创建统一导出文件");
    return;
  }

  const indexContent = fs.readFileSync(indexPath, "utf8");
  const uiFiles = fs
    .readdirSync(uiDir)
    .filter((f) => f.endsWith(".tsx") && f !== "index.tsx");

  const missingExports = uiFiles.filter((f) => {
    const name = f.replace(".tsx", "");
    return !indexContent.includes(name);
  });

  if (missingExports.length > 0) {
    error(
      `以下 UI 组件未在 index.ts 中导出 → 修复: 在 src/components/ui/index.ts 中添加导出:\n` +
        missingExports
          .map((f) => `    export { ${f.replace(".tsx", "")} } from './${f.replace(".tsx", "")}';`)
          .join("\n")
    );
  } else {
    success(`所有 UI 组件已统一导出 (${uiFiles.length} 个)`);
  }
}

// ============================================================
// Check 3: 页面测试覆盖
// ============================================================
function checkTestCoverage() {
  console.log("\n📋 检查 3: 页面测试覆盖");
  console.log("─".repeat(50));

  const pagesDir = path.join(ROOT, "src/app/[locale]");
  const testsDir = path.join(ROOT, "tests/e2e");

  if (!fs.existsSync(pagesDir) || !fs.existsSync(testsDir)) {
    error("缺少页面或测试目录");
    return;
  }

  const testFiles = fs.readdirSync(testsDir).map((f) => f.replace(".spec.ts", ""));

  // 获取所有页面目录
  const pageDirs = fs
    .readdirSync(pagesDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  const uncoveredPages = pageDirs.filter((p) => {
    // 检查是否有相关测试文件
    return !testFiles.some(
      (t) => t.includes(p) || t === "homepage" || t === "home" || t === "navigation"
    );
  });

  if (uncoveredPages.length > 0) {
    warn(
      `以下页面缺少 E2E 测试 → 修复: 在 tests/e2e/ 下创建测试文件:\n` +
        uncoveredPages.map((p) => `    - tests/e2e/${p}.spec.ts`).join("\n")
    );
  } else {
    success(`所有页面都有 E2E 测试覆盖`);
  }
}

// ============================================================
// Check 4: Harness 文件完整性
// ============================================================
function checkHarnessFiles() {
  console.log("\n📋 检查 4: Harness 文件完整性");
  console.log("─".repeat(50));

  const requiredFiles = [
    {
      path: "AGENTS.md",
      fix: "创建 AGENTS.md → 参考设计文档建立 Agent 会话常驻上下文",
    },
    {
      path: "progress.json",
      fix: "创建 progress.json → 用于跨会话进度追踪",
    },
    {
      path: "feature_list.json",
      fix: "创建 feature_list.json → 用于结构化功能列表和完成标准",
    },
  ];

  for (const file of requiredFiles) {
    const fullPath = path.join(ROOT, file.path);
    if (!fs.existsSync(fullPath)) {
      error(`缺少 ${file.path} → 修复: ${file.fix}`);
    } else {
      success(`${file.path} 存在`);
    }
  }

  // 验证 progress.json 有效性
  const progressPath = path.join(ROOT, "progress.json");
  if (fs.existsSync(progressPath)) {
    try {
      const progress = JSON.parse(fs.readFileSync(progressPath, "utf8"));
      if (!progress.current_session) {
        warn("progress.json 缺少 current_session 字段");
      }
      if (!progress.sessions || !Array.isArray(progress.sessions)) {
        error("progress.json 缺少 sessions 数组 → 修复: 添加 sessions 数组记录会话历史");
      }
    } catch (e) {
      error(`progress.json 解析失败 → 修复: 检查 JSON 格式: ${e.message}`);
    }
  }

  // 验证 feature_list.json 有效性
  const featurePath = path.join(ROOT, "feature_list.json");
  if (fs.existsSync(featurePath)) {
    try {
      const features = JSON.parse(fs.readFileSync(featurePath, "utf8"));
      if (!features.features || !Array.isArray(features.features)) {
        error("feature_list.json 缺少 features 数组");
      } else {
        const noTests = features.features.filter(
          (f) => f.status === "done" && (!f.tests || f.tests.length === 0)
        );
        if (noTests.length > 0) {
          warn(
            `${noTests.length} 个已完成功能缺少测试 → 修复: 为以下功能添加 E2E 测试:\n` +
              noTests.map((f) => `    - ${f.id}: ${f.name}`).join("\n")
          );
        }
      }
    } catch (e) {
      error(`feature_list.json 解析失败 → 修复: 检查 JSON 格式: ${e.message}`);
    }
  }
}

// ============================================================
// Check 5: 上下文利用率估算
// ============================================================
function checkContextSize() {
  console.log("\n📋 检查 5: 上下文利用率估算");
  console.log("─".repeat(50));

  const CONTEXT_LIMIT = 200000; // tokens (approximate)
  const TARGET_UTILIZATION = 0.4; // 40%

  // 估算 Tier 1 文件 token 数 (粗略: 1 token ≈ 4 chars)
  const tier1Files = ["AGENTS.md", "progress.json"];
  let tier1Tokens = 0;

  for (const file of tier1Files) {
    const fullPath = path.join(ROOT, file);
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, "utf8");
      tier1Tokens += Math.ceil(content.length / 4);
    }
  }

  const utilization = tier1Tokens / CONTEXT_LIMIT;
  const utilizationPercent = (utilization * 100).toFixed(1);

  if (utilization > TARGET_UTILIZATION) {
    warn(
      `Tier 1 上下文利用率 ${utilizationPercent}% 超过目标 40% → 修复: 精简 AGENTS.md 和 progress.json`
    );
  } else {
    success(`Tier 1 上下文利用率: ${utilizationPercent}% (目标 < 40%)`);
  }
}

// ============================================================
// Main
// ============================================================
console.log("🔍 OpenClaw101 结构化验证");
console.log("=".repeat(50));
console.log(`时间: ${new Date().toISOString()}`);

checkI18nKeys();
checkUIExports();
checkTestCoverage();
checkHarnessFiles();
checkContextSize();

console.log("\n" + "=".repeat(50));
console.log(`📊 结果: ${errors} 错误, ${warnings} 警告`);

if (errors > 0) {
  console.log("💡 提示: 每条错误消息都包含修复指令，Agent 可直接执行修复。");
  process.exit(1);
} else {
  console.log("✨ 所有检查通过！");
  process.exit(0);
}
