#!/bin/bash

# ============================================================
# prepare-truth-repo.sh — 准备 cn-truth 单一事实源仓库
#
# 使用方法:
#   bash scripts/prepare-truth-repo.sh
#
# 前置条件:
#   - 有 GitHub 仓库 https://github.com/moonye6/cn-truth 的写入权限
#   - git 已配置认证
# ============================================================

set -euo pipefail

SOURCE_DIR="$(cd "$(dirname "$0")/.." && pwd)"
TRUTH_DIR="/tmp/cn-truth-staging"
TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")

echo "🔧 准备 cn-truth 单一事实源"
echo "═══════════════════════════"

# 清理并创建临时目录
rm -rf "$TRUTH_DIR"
mkdir -p "$TRUTH_DIR"
cd "$TRUTH_DIR"

# 初始化 git
git init
git checkout -b main

# 创建目录结构
mkdir -p eslint-rules scripts .context openclaw101

# 复制核心 Harness 文件 (P0)
echo "📋 复制 P0 文件..."
cp "$SOURCE_DIR/AGENTS.md" ./AGENTS.md
cp "$SOURCE_DIR/eslint-rules/"*.js ./eslint-rules/
cp "$SOURCE_DIR/scripts/lint-structure.js" ./scripts/lint-structure.js

# 复制 P1 文件
echo "📋 复制 P1 文件..."
cp "$SOURCE_DIR/feature_list.json" ./feature_list.json
cp "$SOURCE_DIR/progress.json" ./progress.json

# 复制上下文分层
echo "📋 复制上下文分层..."
cp "$SOURCE_DIR/.context/"* ./.context/ 2>/dev/null || true

# 复制 README
cp "$SOURCE_DIR/.truth/README.md" ./README.md

# 复制项目配置快照
echo "📋 复制项目配置快照..."
cp "$SOURCE_DIR/eslint.config.mjs" ./openclaw101/
cp "$SOURCE_DIR/package.json" ./openclaw101/
cp "$SOURCE_DIR/playwright.config.ts" ./openclaw101/

# 生成同步日志
cat > SYNC_LOG.md << EOF
# 同步日志

| 属性 | 值 |
|------|-----|
| **最后同步** | $TIMESTAMP |
| **源项目** | openclaw101 |
| **Harness 等级** | Level 2: 反馈回路 |

## 文件清单
$(find . -type f -not -path './.git/*' | sort | sed 's/^/- /')
EOF

# 提交
git add -A
git commit -m "init: OpenClaw101 Agent Harness artifacts [$TIMESTAMP]"

echo ""
echo "═══════════════════════════"
echo "✅ 本地仓库准备完成: $TRUTH_DIR"
echo ""
echo "📤 请手动推送到 GitHub:"
echo "   cd $TRUTH_DIR"
echo "   git remote add origin https://github.com/moonye6/cn-truth.git"
echo "   git push -u origin main"
