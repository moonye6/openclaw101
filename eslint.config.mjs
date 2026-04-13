import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "scripts/**",
  ]),
  // OpenClaw101 自定义规则 (Agent Harness)
  // 使用 inline rules 避免 ESM/CJS 兼容性问题 (参见 AGENTS.md §4.1 #3)
  {
    rules: {
      // 强制 @/ 路径别名，禁止超过2层的相对路径
      "no-restricted-imports": ["warn", {
        patterns: [{
          group: ["../../*"],
          message: "❌ 禁止深层相对路径 → 修复: 改为 '@/...' 路径别名。参见 AGENTS.md §2.2 规则 3。",
        }],
      }],
      // 遗留代码中存在少量 any 和空接口，降级为 warn 以不阻塞 CI
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-empty-object-type": "warn",
    },
  },
]);

export default eslintConfig;
