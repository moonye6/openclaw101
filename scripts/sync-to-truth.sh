#!/bin/bash

# ============================================================
# sync-to-truth.sh — 同步 Harness 制品到单一事实源仓库
# 
# 用途: 将所有 Agent Harness 相关文件同步到 cn-truth 仓库
# 目标: https://github.com/moonye6/cn-truth
# ============================================================

set -euo pipefail

# 配置
TRUTH_REPO="https://github.com/moonye6/cn-truth"
TRUTH_DIR="/tmp/cn-truth"
SOURCE_DIR="$(cd "$(dirname "$0")/.." && pwd)"
TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")

echo "🔄 同步 OpenClaw101 Harness 制品到单一事实源"
echo "═══════════════════════════════════════════════"
echo "源目录: $SOURCE_DIR"
echo "目标仓库: $TRUTH_REPO"
echo "时间: $TIMESTAMP"
echo ""

# Step 1: 克隆或更新 cn-truth 仓库
if [ -d "$TRUTH_DIR" ]; then
  echo "📂 更新已有的 cn-truth 仓库..."
  cd "$TRUTH_DIR"
  git pull origin main || git pull origin master || true
else
  echo "📥 克隆 cn-truth 仓库..."
  git clone "$TRUTH_REPO" "$TRUTH_DIR" 2>/dev/null || {
    echo "⚠️  仓库不存在或无权限，创建本地仓库..."
    mkdir -p "$TRUTH_DIR"
    cd "$TRUTH_DIR"
    git init
    git remote add origin "$TRUTH_REPO" 2>/dev/null || true
  }
fi

cd "$TRUTH_DIR"

# Step 2: 创建目录结构
echo ""
echo "📁 创建目录结构..."
mkdir -p eslint-rules scripts .context openclaw101

# Step 3: 复制核心 Harness 文件
echo "📋 复制核心文件..."

# P0 文件
cp "$SOURCE_DIR/AGENTS.md" ./AGENTS.md
echo "  ✅ AGENTS.md"

cp "$SOURCE_DIR/eslint-rules/"*.js ./eslint-rules/
echo "  ✅ eslint-rules/ ($(ls eslint-rules/*.js | wc -l) 条自定义规则)"

cp "$SOURCE_DIR/scripts/lint-structure.js" ./scripts/lint-structure.js
echo "  ✅ scripts/lint-structure.js"

# P1 文件
cp "$SOURCE_DIR/feature_list.json" ./feature_list.json
echo "  ✅ feature_list.json"

cp "$SOURCE_DIR/progress.json" ./progress.json
echo "  ✅ progress.json"

# 上下文分层
cp "$SOURCE_DIR/.context/"* ./.context/ 2>/dev/null || true
echo "  ✅ .context/ (分层上下文)"

# README
cp "$SOURCE_DIR/.truth/README.md" ./README.md
echo "  ✅ README.md"

# Step 4: 复制项目配置快照 (只读参考)
echo ""
echo "📋 复制项目配置快照..."
cp "$SOURCE_DIR/eslint.config.mjs" ./openclaw101/eslint.config.mjs
cp "$SOURCE_DIR/package.json" ./openclaw101/package.json
cp "$SOURCE_DIR/playwright.config.ts" ./openclaw101/playwright.config.ts
echo "  ✅ openclaw101/ (项目配置快照)"

# Step 5: 生成同步摘要
echo ""
echo "📊 生成同步摘要..."
cat > SYNC_LOG.md << EOF
# 同步日志

| 属性 | 值 |
|------|-----|
| **最后同步** | $TIMESTAMP |
| **源项目** | openclaw101 |
| **Harness 等级** | Level 2: 反馈回路 |

## 同步文件清单

\`\`\`
$(find . -type f -not -path './.git/*' -not -name 'SYNC_LOG.md' | sort)
\`\`\`

## 变更摘要

$(cd "$SOURCE_DIR" && git log --oneline -5 2>/dev/null || echo "无 git 历史")
EOF
echo "  ✅ SYNC_LOG.md"

# Step 6: 提交和推送
echo ""
echo "📤 提交变更..."
git add -A
git status --short

if git diff --cached --quiet; then
  echo "ℹ️  没有变更需要提交"
else
  git commit -m "sync: update harness artifacts from openclaw101 [$TIMESTAMP]"
  echo ""
  echo "🚀 推送到远程..."
  git push origin main 2>/dev/null || git push origin master 2>/dev/null || {
    echo "⚠️  推送失败 — 可能需要先设置远程仓库权限"
    echo "   手动推送: cd $TRUTH_DIR && git push origin main"
  }
fi

echo ""
echo "═══════════════════════════════════════════════"
echo "✅ 同步完成!"
echo "   本地副本: $TRUTH_DIR"
echo "   远程仓库: $TRUTH_REPO"
