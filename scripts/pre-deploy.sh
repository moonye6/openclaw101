#!/usr/bin/env bash
# ============================================================
# OpenClaw101 — Pre-Deploy Verification
# ============================================================
# 用法：
#   bash scripts/pre-deploy.sh          # 完整检查（含构建）
#   bash scripts/pre-deploy.sh --quick  # 跳过构建
# ============================================================

set -e

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

# ── 找最新可用的 Node.js ──────────────────────────────────
NODE=""
for candidate in \
  "$HOME/.nvm/versions/node/$(ls "$HOME/.nvm/versions/node/" 2>/dev/null | sort -V | tail -1)/bin/node" \
  "/usr/bin/node" \
  "/usr/local/bin/node"; do
  if [ -x "$candidate" ]; then
    NODE="$candidate"
    break
  fi
done

if [ -z "$NODE" ]; then
  echo "⚠️  node not found, aborting pre-deploy."
  exit 1
fi

ROOT="$(git rev-parse --show-toplevel)"
ESLINT_JS="$ROOT/node_modules/eslint/bin/eslint.js"
TSC_JS="$ROOT/node_modules/typescript/bin/tsc"

START_TIME=$(date +%s)
ERRORS=0
WARNINGS=0
TOTAL_STEPS=4
if [ "$QUICK_MODE" = false ]; then
  TOTAL_STEPS=5
fi

echo ""
echo -e "${CYAN}╔══════════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║   🚀 OpenClaw101 Pre-Deploy Verification     ║${NC}"
if [ "$QUICK_MODE" = true ]; then
  echo -e "${CYAN}║   ⚡ Quick mode (skip build)                 ║${NC}"
fi
echo -e "${CYAN}╚══════════════════════════════════════════════╝${NC}"
echo ""

# ── Step 1: TypeScript 类型检查 ───────────────────────────
STEP=1
echo -e "${YELLOW}[${STEP}/${TOTAL_STEPS}]${NC} TypeScript type checking..."
STEP_START=$(date +%s)

TS_ERRORS=$("$NODE" "$TSC_JS" --noEmit 2>&1 | grep -v 'tests/' | grep -c 'error TS' || true)
if [ "$TS_ERRORS" -eq 0 ]; then
  STEP_END=$(date +%s)
  echo -e "  ${GREEN}✅ TypeScript — no type errors ($(( STEP_END - STEP_START ))s)${NC}"
else
  STEP_END=$(date +%s)
  echo -e "  ${RED}❌ TypeScript: ${TS_ERRORS} type error(s) ($(( STEP_END - STEP_START ))s)${NC}"
  "$NODE" "$TSC_JS" --noEmit 2>&1 | grep -v 'tests/' | grep 'error TS' | head -10
  ERRORS=$((ERRORS + 1))
fi

# ── Step 2: ESLint 全量 ───────────────────────────────────
STEP=2
echo -e "${YELLOW}[${STEP}/${TOTAL_STEPS}]${NC} ESLint full scan..."
STEP_START=$(date +%s)

if [ ! -f "$ESLINT_JS" ]; then
  echo -e "  ${YELLOW}⚠️  ESLint not found, skipping${NC}"
elif "$NODE" "$ESLINT_JS" src/ --ext .ts,.tsx 2>&1; then
  STEP_END=$(date +%s)
  echo -e "  ${GREEN}✅ ESLint — no errors ($(( STEP_END - STEP_START ))s)${NC}"
else
  STEP_END=$(date +%s)
  echo -e "  ${RED}❌ ESLint found errors ($(( STEP_END - STEP_START ))s)${NC}"
  ERRORS=$((ERRORS + 1))
fi

# ── Step 3: 结构验证 ──────────────────────────────────────
STEP=3
echo -e "${YELLOW}[${STEP}/${TOTAL_STEPS}]${NC} Structure validation..."
STEP_START=$(date +%s)

if "$NODE" "$ROOT/scripts/lint-structure.js" 2>&1 | tee /tmp/oc101-struct.log | tail -2 | grep -q "所有检查通过"; then
  STEP_END=$(date +%s)
  echo -e "  ${GREEN}✅ Structure — all checks passed ($(( STEP_END - STEP_START ))s)${NC}"
else
  STEP_END=$(date +%s)
  echo -e "  ${RED}❌ Structure validation failed ($(( STEP_END - STEP_START ))s)${NC}"
  grep -E '❌' /tmp/oc101-struct.log | head -10
  ERRORS=$((ERRORS + 1))
fi

# ── Step 4: 博客一致性 ────────────────────────────────────
STEP=4
echo -e "${YELLOW}[${STEP}/${TOTAL_STEPS}]${NC} Blog article consistency..."
STEP_START=$(date +%s)

if "$NODE" "$ROOT/scripts/check-blog.mjs" 2>&1 | tee /tmp/oc101-blog.log | tail -3 | grep -q "ALL ARTICLES PASS"; then
  STEP_END=$(date +%s)
  echo -e "  ${GREEN}✅ Blog — all articles passed ($(( STEP_END - STEP_START ))s)${NC}"
else
  STEP_END=$(date +%s)
  echo -e "  ${YELLOW}⚠️  Blog — some articles need attention ($(( STEP_END - STEP_START ))s)${NC}"
  WARNINGS=$((WARNINGS + 1))
fi

# ── Step 5: Next.js 构建（完整模式）──────────────────────
if [ "$QUICK_MODE" = false ]; then
  STEP=5
  echo -e "${YELLOW}[${STEP}/${TOTAL_STEPS}]${NC} Next.js production build..."
  STEP_START=$(date +%s)

  NEXT_JS="$ROOT/node_modules/.bin/next"
  if "$NODE" "$NEXT_JS" build 2>&1 | tee /tmp/oc101-build.log | tail -5 | grep -q "Generating static pages"; then
    STEP_END=$(date +%s)
    PAGE_COUNT=$(grep -oP 'Generating static pages \(\d+/\K\d+' /tmp/oc101-build.log || echo "?")
    echo -e "  ${GREEN}✅ Build success — ${PAGE_COUNT} pages ($(( STEP_END - STEP_START ))s)${NC}"
  else
    STEP_END=$(date +%s)
    echo -e "  ${RED}❌ Build failed ($(( STEP_END - STEP_START ))s)${NC}"
    tail -15 /tmp/oc101-build.log | grep -E 'Error|error' | head -5
    ERRORS=$((ERRORS + 1))
  fi
fi

rm -f /tmp/oc101-struct.log /tmp/oc101-blog.log /tmp/oc101-build.log

# ── 结果汇总 ──────────────────────────────────────────────
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
    echo -e "${YELLOW}  ✅ DEPLOY OK (with ${WARNINGS} warning(s))${NC}"
  else
    echo -e "${GREEN}  🚀 ALL CLEAR — Ready to deploy!${NC}"
  fi
  echo ""
  exit 0
fi
