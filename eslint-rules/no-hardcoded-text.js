/**
 * ESLint 自定义规则: no-hardcoded-text
 * 
 * 禁止在 JSX 中硬编码用户可见的文本。
 * 所有文本必须通过 next-intl 的 useTranslations() / t() 获取。
 * 
 * ❌ 错误: <h1>Welcome</h1>
 * ✅ 正确: <h1>{t('welcome')}</h1>
 * 
 * 修复方法:
 * 1. 在组件中: const t = useTranslations('namespace');
 * 2. 将硬编码文本替换为 t('key')
 * 3. 在 src/i18n/en.json 和 src/i18n/zh.json 中添加翻译
 */

module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description: "Disallow hardcoded text in JSX. Use next-intl translations instead.",
      category: "i18n",
      recommended: true,
    },
    messages: {
      noHardcodedText:
        "❌ 禁止硬编码文本 '{{text}}' → 修复: 使用 useTranslations() 的 t('key') 替代。参见 AGENTS.md §2.2 规则 1。",
    },
    schema: [],
  },
  create(context) {
    // 允许的简单字符 (空白、标点、数字等)
    const ALLOWED_PATTERN = /^[\s\d\p{P}\p{S}]*$/u;
    
    // 跳过这些组件属性中的文本
    const SKIP_ATTRIBUTES = new Set([
      "className", "style", "key", "id", "data-testid",
      "href", "src", "alt", "type", "name", "value",
      "placeholder", "aria-label", "role",
    ]);

    return {
      JSXText(node) {
        const text = node.value.trim();
        if (text && !ALLOWED_PATTERN.test(text)) {
          context.report({
            node,
            messageId: "noHardcodedText",
            data: { text: text.substring(0, 40) },
          });
        }
      },
      // Check template literals in JSX expressions  
      JSXExpressionContainer(node) {
        if (
          node.expression.type === "TemplateLiteral" &&
          node.expression.quasis.some(
            (q) => q.value.raw.trim() && !ALLOWED_PATTERN.test(q.value.raw.trim())
          )
        ) {
          context.report({
            node,
            messageId: "noHardcodedText",
            data: { text: "template literal with text" },
          });
        }
      },
    };
  },
};
