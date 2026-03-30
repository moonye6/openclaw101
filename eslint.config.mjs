import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import noHardcodedText from "./eslint-rules/no-hardcoded-text.js";
import requirePageMetadata from "./eslint-rules/require-page-metadata.js";
import enforcePathAlias from "./eslint-rules/enforce-path-alias.js";

// OpenClaw101 自定义规则插件
const openclawPlugin = {
  rules: {
    "no-hardcoded-text": noHardcodedText,
    "require-page-metadata": requirePageMetadata,
    "enforce-path-alias": enforcePathAlias,
  },
};

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Agent harness files
    "eslint-rules/**",
    "scripts/**",
  ]),
  // OpenClaw101 自定义规则 (Agent Harness)
  {
    plugins: {
      openclaw: openclawPlugin,
    },
    rules: {
      // 禁止硬编码文本 (强制 i18n) — 当前为 warn，稳定后改为 error
      "openclaw/no-hardcoded-text": "warn",
      // 页面必须导出 metadata (SEO)
      "openclaw/require-page-metadata": "warn",
      // 强制 @/ 路径别名
      "openclaw/enforce-path-alias": "warn",
    },
  },
]);

export default eslintConfig;
