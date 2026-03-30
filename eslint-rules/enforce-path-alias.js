/**
 * ESLint 自定义规则: enforce-path-alias
 * 
 * 强制使用 @/ 路径别名，禁止深层相对路径。
 * 
 * ❌ 错误: import { Button } from '../../components/ui'
 * ✅ 正确: import { Button } from '@/components/ui'
 * 
 * 修复方法:
 * 1. 将 '../..' 相对路径改为 '@/' 开头的绝对路径
 * 2. '@/' 映射到 'src/' 目录 (参见 tsconfig.json)
 * 3. 例如: '@/components/ui' → 'src/components/ui'
 */

module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description: "Enforce @/ path alias for imports from src/. Disallow deep relative imports.",
      category: "Best Practices",
      recommended: true,
    },
    messages: {
      enforceAlias:
        "❌ 禁止使用深层相对路径 '{{path}}' → 修复: 改为 '@/...' 路径别名。参见 AGENTS.md §2.2 规则 3。",
    },
    fixable: "code",
    schema: [],
  },
  create(context) {
    return {
      ImportDeclaration(node) {
        const importPath = node.source.value;
        
        // 检测超过 1 层的相对路径 (../../)
        if (importPath && importPath.startsWith("../..")) {
          context.report({
            node: node.source,
            messageId: "enforceAlias",
            data: { path: importPath },
          });
        }
      },
    };
  },
};
