#!/usr/bin/env bash
# ============================================================
# OpenClaw101 — Pre-Commit Hook
# ============================================================
# 每次 git commit 前自动执行的快速检查
# 包含：ESLint、结构验证、博客一致性
# 如果任何检查失败，commit 将被阻止
# ============================================================

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 计时
START_TIME=$(date +%s)

echo ""
echo -e "${BLUE}╔══════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   🔍 OpenClaw101 Pre-Commit Checks      ║${NC}"
echo -e "${BLUE}╚══════════════════════════════════════════╝${NC}"
echo ""

ERRORS=0

# ────────────────────────────────────────
# Step 1: ESLint（仅检查 staged 的文件）
# ────────────────────────────────────────
echo -e "${YELLOW}[1/3]${NC} Running ESLint..."

# 获取 staged 的 .ts/.tsx/.js/.mjs 文件
STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACM | grep -E '\.(ts|tsx|js|mjs)$' || true)

if [ -n "$STAGED_FILES" ]; then
  if npx eslint $STAGED_FILES 2>/dev/null; then
    echo -e "  ${GREEN}✅ ESLint passed${NC}"
  else
    echo -e "  ${RED}❌ ESLint failed${NC}"
    ERRORS=$((ERRORS + 1))
  fi
else
  echo -e "  ${GREEN}✅ No staged JS/TS files to lint${NC}"
fi

# ────────────────────────────────────────
# Step 2: 结构验证（i18n key 一致性 + UI 导出 + HTML 语义 + Harness 文件）
# ────────────────────────────────────────
echo -e "${YELLOW}[2/3]${NC} Running structure validation..."

if node scripts/lint-structure.js 2>/dev/null 1>/dev/null; then
  echo -e "  ${GREEN}✅ Structure validation passed${NC}"
else
  echo -e "  ${RED}❌ Structure validation failed${NC}"
  # 重新运行以显示错误详情
  node scripts/lint-structure.js 2>&1 | grep -E '❌|⚠️' | head -10
  ERRORS=$((ERRORS + 1))
fi

# ────────────────────────────────────────
# Step 3: 博客文章一致性检查
# ────────────────────────────────────────
echo -e "${YELLOW}[3/3]${NC} Running blog article checks..."

# 检查是否有 staged 的博客数据文件
STAGED_BLOG=$(git diff --cached --name-only --diff-filter=ACM | grep -E 'src/data/blog/' || true)

if [ -n "$STAGED_BLOG" ]; then
  if node scripts/check-blog.mjs 2>/dev/null 1>/dev/null; then
    echo -e "  ${GREEN}✅ Blog consistency passed${NC}"
  else
    echo -e "  ${YELLOW}⚠️  Blog consistency has warnings (non-blocking)${NC}"
    # 博客检查作为警告，不阻止提交
  fi
else
  echo -e "  ${GREEN}✅ No blog data changes to check${NC}"
fi

# ────────────────────────────────────────
# 结果汇总
# ────────────────────────────────────────
END_TIME=$(date +%s)
ELAPSED=$((END_TIME - START_TIME))

echo ""
echo -e "${BLUE}──────────────────────────────────────────${NC}"

if [ $ERRORS -gt 0 ]; then
  echo -e "${RED}❌ Pre-commit check FAILED (${ERRORS} error(s)) — ${ELAPSED}s${NC}"
  echo -e "${RED}   Fix the issues above before committing.${NC}"
  echo ""
  exit 1
else
  echo -e "${GREEN}✅ All pre-commit checks passed — ${ELAPSED}s${NC}"
  echo ""
  exit 0
fi
