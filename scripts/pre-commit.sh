#!/usr/bin/env bash
# ============================================================
# OpenClaw101 — Pre-Commit Hook
# ============================================================

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# ── 找最新可用的 Node.js（优先 nvm 最新版）────────────────
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
  echo "⚠️  node not found, skipping pre-commit checks."
  exit 0
fi

ROOT="$(git rev-parse --show-toplevel)"
ESLINT_JS="$ROOT/node_modules/eslint/bin/eslint.js"
START_TIME=$(date +%s)

echo ""
echo -e "${BLUE}╔══════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   🔍 OpenClaw101 Pre-Commit Checks      ║${NC}"
echo -e "${BLUE}╚══════════════════════════════════════════╝${NC}"
echo ""

ERRORS=0

# ── Step 1: ESLint ────────────────────────────────────────
echo -e "${YELLOW}[1/3]${NC} Running ESLint..."

STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACM | grep -E '\.(ts|tsx|js|mjs)$' || true)

if [ -z "$STAGED_FILES" ]; then
  echo -e "  ${GREEN}✅ No staged JS/TS files to lint${NC}"
elif [ ! -f "$ESLINT_JS" ]; then
  echo -e "  ${YELLOW}⚠️  ESLint not found, skipping${NC}"
else
  if "$NODE" "$ESLINT_JS" $STAGED_FILES 2>&1; then
    echo -e "  ${GREEN}✅ ESLint passed${NC}"
  else
    echo -e "  ${RED}❌ ESLint failed${NC}"
    ERRORS=$((ERRORS + 1))
  fi
fi

# ── Step 2: 结构验证 ──────────────────────────────────────
echo -e "${YELLOW}[2/3]${NC} Running structure validation..."

if "$NODE" "$ROOT/scripts/lint-structure.js" 2>/dev/null 1>/dev/null; then
  echo -e "  ${GREEN}✅ Structure validation passed${NC}"
else
  echo -e "  ${RED}❌ Structure validation failed${NC}"
  "$NODE" "$ROOT/scripts/lint-structure.js" 2>&1 | grep -E '❌|⚠️' | head -10
  ERRORS=$((ERRORS + 1))
fi

# ── Step 3: 博客一致性 ────────────────────────────────────
echo -e "${YELLOW}[3/3]${NC} Running blog article checks..."

STAGED_BLOG=$(git diff --cached --name-only --diff-filter=ACM | grep -E 'src/data/blog/' || true)

if [ -z "$STAGED_BLOG" ]; then
  echo -e "  ${GREEN}✅ No blog data changes to check${NC}"
elif "$NODE" "$ROOT/scripts/check-blog.mjs" 2>/dev/null 1>/dev/null; then
  echo -e "  ${GREEN}✅ Blog consistency passed${NC}"
else
  echo -e "  ${YELLOW}⚠️  Blog consistency has warnings (non-blocking)${NC}"
fi

# ── 结果汇总 ──────────────────────────────────────────────
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
