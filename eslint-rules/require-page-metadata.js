/**
 * ESLint 自定义规则: require-page-metadata
 * 
 * 每个 Next.js 页面必须导出 metadata 或 generateMetadata。
 * 这对 SEO 至关重要。
 * 
 * ❌ 错误: page.tsx 没有 metadata 导出
 * ✅ 正确: export const metadata = { title: '...' }
 * ✅ 正确: export async function generateMetadata() { ... }
 * 
 * 修复方法:
 * 1. 在 page.tsx 文件中添加: export const metadata: Metadata = { title: '...', description: '...' }
 * 2. 或者使用动态 metadata: export async function generateMetadata({ params }) { ... }
 * 3. 参见 Next.js 文档: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
 */

module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description: "Require metadata or generateMetadata export in Next.js page files.",
      category: "SEO",
      recommended: true,
    },
    messages: {
      requireMetadata:
        "❌ 页面缺少 SEO metadata → 修复: 添加 `export const metadata` 或 `export async function generateMetadata()`。参见 AGENTS.md §2.2 规则 8。",
    },
    schema: [],
  },
  create(context) {
    const filename = context.getFilename();
    
    // 只检查 page.tsx 文件
    if (!filename.endsWith("page.tsx") && !filename.endsWith("page.ts")) {
      return {};
    }

    // 跳过 API 路由
    if (filename.includes("/api/")) {
      return {};
    }

    let hasMetadata = false;

    return {
      ExportNamedDeclaration(node) {
        // export const metadata = ...
        if (node.declaration && node.declaration.type === "VariableDeclaration") {
          for (const decl of node.declaration.declarations) {
            if (decl.id && decl.id.name === "metadata") {
              hasMetadata = true;
            }
          }
        }
        // export async function generateMetadata() { ... }
        if (node.declaration && node.declaration.type === "FunctionDeclaration") {
          if (node.declaration.id && node.declaration.id.name === "generateMetadata") {
            hasMetadata = true;
          }
        }
      },
      "Program:exit"() {
        if (!hasMetadata) {
          context.report({
            loc: { line: 1, column: 0 },
            messageId: "requireMetadata",
          });
        }
      },
    };
  },
};
