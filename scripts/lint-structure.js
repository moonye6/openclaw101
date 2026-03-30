#!/usr/bin/env node

/**
 * 结构化验证脚本 - lint:structure
 * 
 * 验证项目结构的完整性和一致性。
 * 每条错误消息都嵌入修复指令。
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
let errors = 0;
let warnings = 0;

function error(msg) { console.error(`❌ ERROR: ${msg}`); errors++; }
function warn(msg) { console.warn(`⚠️  WARN: ${msg}`); warnings++; }
function success(msg) { console.log(`✅ PASS: ${msg}`); }

// Check 1: i18n key 一致性
function checkI18nKeys() {
  console.log("\n📋 检查 1: i18n key 一致性");
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
      } else { keys.push(fullKey); }
    }
    return keys;
  }
  const enKeys = new Set(getKeys(en));
  const zhKeys = new Set(getKeys(zh));
  const missingInZh = [...enKeys].filter((k) => !zhKeys.has(k));
  const missingInEn = [...zhKeys].filter((k) => !enKeys.has(k));
  if (missingInZh.length > 0) error(`${missingInZh.length} 个 key 在 zh.json 中缺失:\n` + missingInZh.map((k) => `    - ${k}`).join("\n"));
  if (missingInEn.length > 0) error(`${missingInEn.length} 个 key 在 en.json 中缺失:\n` + missingInEn.map((k) => `    - ${k}`).join("\n"));
  if (missingInZh.length === 0 && missingInEn.length === 0) success(`i18n key 完全一致 (共 ${enKeys.size} 个 key)`);
}

// Check 2: UI 组件统一导出
function checkUIExports() {
  console.log("\n📋 检查 2: UI 组件统一导出");
  const uiDir = path.join(ROOT, "src/components/ui");
  const indexPath = path.join(uiDir, "index.ts");
  if (!fs.existsSync(indexPath)) { error("缺少 components/ui/index.ts"); return; }
  const indexContent = fs.readFileSync(indexPath, "utf8");
  const uiFiles = fs.readdirSync(uiDir).filter((f) => f.endsWith(".tsx"));
  const missingExports = uiFiles.filter((f) => !indexContent.includes(f.replace(".tsx", "")));
  if (missingExports.length > 0) error(`未导出的 UI 组件: ${missingExports.join(", ")}`);
  else success(`所有 UI 组件已统一导出 (${uiFiles.length} 个)`);
}

// Check 3: Harness 文件完整性
function checkHarnessFiles() {
  console.log("\n📋 检查 3: Harness 文件完整性");
  const files = ["AGENTS.md", "progress.json", "feature_list.json"];
  for (const file of files) {
    if (!fs.existsSync(path.join(ROOT, file))) error(`缺少 ${file}`);
    else success(`${file} 存在`);
  }
}

// Check 4: HTML 语义 (检查 <main> 嵌套)
function checkHTMLSemantics() {
  console.log("\n📋 检查 4: HTML 语义检查");
  const layoutPath = path.join(ROOT, "src/app/[locale]/layout.tsx");
  const pagePath = path.join(ROOT, "src/app/[locale]/page.tsx");
  if (fs.existsSync(layoutPath) && fs.existsSync(pagePath)) {
    const layout = fs.readFileSync(layoutPath, "utf8");
    const page = fs.readFileSync(pagePath, "utf8");
    if (layout.includes("<main") && page.includes("<main")) {
      error("<main> 标签嵌套 → 修复: layout.tsx 使用 <main>，page.tsx 改为 <div> 或 <section>");
    } else { success("无 <main> 嵌套"); }
  }
}

// Main
console.log("🔍 OpenClaw101 结构化验证");
console.log("=".repeat(50));
checkI18nKeys();
checkUIExports();
checkHarnessFiles();
checkHTMLSemantics();
console.log("\n" + "=".repeat(50));
console.log(`📊 结果: ${errors} 错误, ${warnings} 警告`);
if (errors > 0) { console.log("💡 每条错误都包含修复指令。"); process.exit(1); }
else { console.log("✨ 所有检查通过！"); process.exit(0); }
