#!/usr/bin/env bash
# ============================================================
# OpenClaw101 — Pre-Deploy Verification
# ============================================================
# 推送到远程 / 部署前执行的完整检查
# 包含：TypeScript 类型检查 + ESLint 全量 + 结构验证 + 博客检查 + Next.js 构建
# 比 pre-commit 更严格更全面
# ============================================================
# 用法：
#   pnpm pre-deploy          # 完整检查（含构建）
#   pnpm pre-deploy --quick  # 跳过构建（仅验证）
# ============================================================

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

QUICK_MODE=false
if [[ "$1" == "--quick" ]]; then
  QUICK_MODE=true
fi

START_TIME=$(date +%s)
ERRORS=0
WARNINGS=0
TOTAL_STEPS=5
if [ "$QUICK_MODE" = true ]; then
  TOTAL_STEPS=4
fi

echo ""
echo -e "${CYAN}╔══════════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║   🚀 OpenClaw101 Pre-Deploy Verification     ║${NC}"
if [ "$QUICK_MODE" = true ]; then
echo -e "${CYAN}║   ⚡ Quick mode (skip build)                 ║${NC}"
fi
echo -e "${CYAN}╚══════════════════════════════════════════════╝${NC}"
echo ""

# ────────────────────────────────────────
# Step 1: TypeScript 类型检查
# ────────────────────────────────────────
STEP=1
echo -e "${YELLOW}[${STEP}/${TOTAL_STEPS}]${NC} TypeScript type checking (src only)..."
STEP_START=$(date +%s)

# 只检查 src/ 目录（排除 tests/ 的 Playwright 类型问题）
TS_ERRORS=$(npx tsc --noEmit 2>&1 | grep -v 'tests/' | grep -c 'error TS' || true)
if [ "$TS_ERRORS" -eq 0 ]; then
  STEP_END=$(date +%s)
  echo -e "  ${GREEN}✅ TypeScript — no type errors in src/ ($(( STEP_END - STEP_START ))s)${NC}"
else
  STEP_END=$(date +%s)
  echo -e "  ${RED}❌ TypeScript: ${TS_ERRORS} type error(s) in src/ ($(( STEP_END - STEP_START ))s)${NC}"
  npx tsc --noEmit 2>&1 | grep -v 'tests/' | grep 'error TS' | head -10
  ERRORS=$((ERRORS + 1))
fi

# ────────────────────────────────────────
# Step 2: ESLint 全量检查
# ────────────────────────────────────────
STEP=2
echo -e "${YELLOW}[${STEP}/${TOTAL_STEPS}]${NC} ESLint full scan..."
STEP_START=$(date +%s)

if npx eslint 2>/dev/null; then
  STEP_END=$(date +%s)
  echo -e "  ${GREEN}✅ ESLint — no errors ($(( STEP_END - STEP_START ))s)${NC}"
else
  STEP_END=$(date +%s)
  echo -e "  ${RED}❌ ESLint found errors ($(( STEP_END - STEP_START ))s)${NC}"
  ERRORS=$((ERRORS + 1))
fi

# ────────────────────────────────────────
# Step 3: 结构验证
# ────────────────────────────────────────
STEP=3
echo -e "${YELLOW}[${STEP}/${TOTAL_STEPS}]${NC} Structure validation..."
STEP_START=$(date +%s)

if node scripts/lint-structure.js 2>&1 | tee /tmp/oc101-struct.log | tail -2 | grep -q "所有检查通过"; then
  STEP_END=$(date +%s)
  echo -e "  ${GREEN}✅ Structure — all checks passed ($(( STEP_END - STEP_START ))s)${NC}"
else
  STEP_END=$(date +%s)
  echo -e "  ${RED}❌ Structure validation failed ($(( STEP_END - STEP_START ))s)${NC}"
  cat /tmp/oc101-struct.log | grep -E '❌' | head -10
  ERRORS=$((ERRORS + 1))
fi

# ────────────────────────────────────────
# Step 4: 博客文章一致性
# ────────────────────────────────────────
STEP=4
echo -e "${YELLOW}[${STEP}/${TOTAL_STEPS}]${NC} Blog article consistency..."
STEP_START=$(date +%s)

if node scripts/check-blog.mjs 2>&1 | tee /tmp/oc101-blog.log | tail -3 | grep -q "ALL ARTICLES PASS"; then
  STEP_END=$(date +%s)
  echo -e "  ${GREEN}✅ Blog — all articles passed ($(( STEP_END - STEP_START ))s)${NC}"
else
  STEP_END=$(date +%s)
  echo -e "  ${YELLOW}⚠️  Blog — some articles need attention ($(( STEP_END - STEP_START ))s)${NC}"
  WARNINGS=$((WARNINGS + 1))
fi

# ────────────────────────────────────────
# Step 5: Next.js 构建（完整模式）
# ────────────────────────────────────────
if [ "$QUICK_MODE" = false ]; then
  STEP=5
  echo -e "${YELLOW}[${STEP}/${TOTAL_STEPS}]${NC} Next.js production build..."
  STEP_START=$(date +%s)

  if npx next build 2>&1 | tee /tmp/oc101-build.log | tail -5 | grep -q "Generating static pages"; then
    STEP_END=$(date +%s)
    # 提取页面数
    PAGE_COUNT=$(grep -oP 'Generating static pages \(\d+/\K\d+' /tmp/oc101-build.log || echo "?")
    echo -e "  ${GREEN}✅ Build success — ${PAGE_COUNT} pages generated ($(( STEP_END - STEP_START ))s)${NC}"
  else
    STEP_END=$(date +%s)
    echo -e "  ${RED}❌ Build failed ($(( STEP_END - STEP_START ))s)${NC}"
    tail -15 /tmp/oc101-build.log | grep -E 'Error|error' | head -5
    ERRORS=$((ERRORS + 1))
  fi
fi

# ────────────────────────────────────────
# 清理临时文件
# ────────────────────────────────────────
rm -f /tmp/oc101-struct.log /tmp/oc101-blog.log /tmp/oc101-build.log

# ────────────────────────────────────────
# 结果汇总
# ────────────────────────────────────────
END_TIME=$(date +%s)
ELAPSED=$((END_TIME - START_TIME))

echo ""
echo -e "${CYAN}══════════════════════════════════════════════${NC}"
echo -e "${CYAN}  📊 Pre-Deploy Report${NC}"
echo -e "${CYAN}──────────────────────────────────────────────${NC}"
echo -e "  ⏱  Total time:  ${ELAPSED}s"
echo -e "  ❌ Errors:      ${ERRORS}"
echo -e "  ⚠️  Warnings:    ${WARNINGS}"
echo -e "${CYAN}══════════════════════════════════════════════${NC}"

if [ $ERRORS -gt 0 ]; then
  echo ""
  echo -e "${RED}  🚫 DEPLOY BLOCKED — Fix ${ERRORS} error(s) before deploying${NC}"
  echo ""
  exit 1
else
  if [ $WARNINGS -gt 0 ]; then
    echo ""
    echo -e "${YELLOW}  ✅ DEPLOY OK (with ${WARNINGS} warning(s))${NC}"
  else
    echo ""
    echo -e "${GREEN}  🚀 ALL CLEAR — Ready to deploy!${NC}"
  fi
  echo ""
  exit 0
fi
