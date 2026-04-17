/**
 * seo-diagnosis.ts
 * openclaw101.vip SEO 诊断脚本 — 基于 SerpAPI 的全面审计
 *
 * 功能：
 * 1. 搜索 40+ 个目标关键词，检查 openclaw101.vip 的排名
 * 2. 分析竞争对手：同类关键词前10名是谁
 * 3. site:openclaw101.vip 检查 Google 实际收录页面
 * 4. 品牌词可见度检测
 * 5. People Also Ask 和 Related Searches 挖掘
 * 6. 输出完整的 SEO 审计报告（JSON + Markdown）
 *
 * 用法：SERPAPI_KEY=xxx npx tsx scripts/seo-diagnosis.ts
 */

import fs from "fs";
import path from "path";

const SERPAPI_KEY = process.env.SERPAPI_KEY;
const SITE_DOMAIN = "openclaw101.vip";
const REPORT_DIR = path.resolve(__dirname, "../report");

// ═══════════════════════════════════════════════════════════
// 目标关键词 — openclaw101.vip 应该争夺的搜索词
// ═══════════════════════════════════════════════════════════

const TARGET_KEYWORDS = [
  // ── 核心品牌+产品词（英文） ──
  { keyword: "openclaw tutorial", category: "brand_product" },
  { keyword: "openclaw guide", category: "brand_product" },
  { keyword: "how to use openclaw", category: "brand_product" },
  { keyword: "openclaw installation", category: "brand_product" },
  { keyword: "openclaw setup guide", category: "brand_product" },
  { keyword: "openclaw skills", category: "brand_product" },

  // ── 核心品牌+产品词（中文） ──
  { keyword: "openclaw 教程", category: "brand_product_zh" },
  { keyword: "openclaw 安装", category: "brand_product_zh" },
  { keyword: "openclaw 使用指南", category: "brand_product_zh" },
  { keyword: "openclaw 技能", category: "brand_product_zh" },

  // ── Telegram Bot 系列（SEO 核心流量词） ──
  { keyword: "how to create telegram bot", category: "telegram" },
  { keyword: "telegram bot tutorial 2026", category: "telegram" },
  { keyword: "telegram bot examples", category: "telegram" },
  { keyword: "telegram automation guide", category: "telegram" },
  { keyword: "telegram bot api tutorial", category: "telegram" },
  { keyword: "best telegram bot tools 2026", category: "telegram" },
  { keyword: "telegram bot python", category: "telegram" },
  { keyword: "create telegram bot step by step", category: "telegram" },

  // ── AI Agent 系列 ──
  { keyword: "ai agent tutorial", category: "ai_agent" },
  { keyword: "ai agent guide", category: "ai_agent" },
  { keyword: "how to build ai agent", category: "ai_agent" },
  { keyword: "open source ai agent", category: "ai_agent" },
  { keyword: "self hosted ai assistant", category: "ai_agent" },
  { keyword: "ai agent framework comparison", category: "ai_agent" },

  // ── 对比类词 ──
  { keyword: "openclaw vs chatgpt", category: "comparison" },
  { keyword: "openclaw vs langchain", category: "comparison" },
  { keyword: "openclaw vs cursor", category: "comparison" },
  { keyword: "openclaw vs claude code", category: "comparison" },

  // ── 安装/部署/排错类（长尾词，高转化） ──
  { keyword: "openclaw docker compose", category: "install_deploy" },
  { keyword: "openclaw common errors", category: "install_deploy" },
  { keyword: "openclaw installation troubleshooting", category: "install_deploy" },
  { keyword: "openclaw self hosting guide", category: "install_deploy" },
  { keyword: "openclaw local ai integration", category: "install_deploy" },

  // ── 平台集成 ──
  { keyword: "openclaw telegram bot", category: "integration" },
  { keyword: "openclaw feishu integration", category: "integration" },
  { keyword: "openclaw whatsapp bot", category: "integration" },
  { keyword: "openclaw discord bot", category: "integration" },
  { keyword: "openclaw qq bot", category: "integration" },

  // ── 功能/技能相关 ──
  { keyword: "clawhub skills", category: "features" },
  { keyword: "openclaw automation workflow", category: "features" },
  { keyword: "openclaw n8n integration", category: "features" },
  { keyword: "openclaw browser automation", category: "features" },
  { keyword: "openclaw vscode extension", category: "features" },

  // ── 中文流量词 ──
  { keyword: "如何创建 telegram 机器人", category: "zh_traffic" },
  { keyword: "ai agent 入门指南", category: "zh_traffic" },
  { keyword: "openclaw 免费吗", category: "zh_traffic" },
  { keyword: "openclaw 配置教程", category: "zh_traffic" },
];

// ── site: 查询词 ──
const SITE_QUERIES = [
  `site:${SITE_DOMAIN}`,
  `site:${SITE_DOMAIN} openclaw`,
  `site:${SITE_DOMAIN} telegram bot`,
  `site:${SITE_DOMAIN} tutorial`,
  `site:${SITE_DOMAIN} skills`,
  `site:${SITE_DOMAIN} guide`,
];

// ── 品牌词 ──
const BRAND_KEYWORDS = [
  "openclaw101",
  "openclaw101.vip",
  "openclaw 101",
  "openclaw101 guide",
];

// ═══════════════════════════════════════════════════════════
// 类型定义
// ═══════════════════════════════════════════════════════════

interface KeywordAudit {
  keyword: string;
  category: string;
  totalResults?: number;
  ourRanking: number | null;
  ourPage?: string;
  topCompetitors: Array<{
    position: number;
    domain: string;
    title: string;
    link: string;
  }>;
  relatedSearches?: string[];
  peopleAlsoAsk?: string[];
}

interface SiteIndexAudit {
  query: string;
  totalResults?: number;
  indexedPages: Array<{
    position: number;
    title: string;
    link: string;
    snippet?: string;
  }>;
}

interface SEOAuditReport {
  date: string;
  site: string;
  siteInfo: {
    totalBlogPosts: number;
    totalTutorials: number;
    totalSkillCategories: number;
    totalSkills: number;
    seoCoreSlugs: number;
    sitemapPages: number;
    hasRSS: boolean;
    hasFAQSchema: boolean;
    hasCourseSchema: boolean;
    hasBreadcrumbs: boolean;
  };
  summary: {
    totalKeywordsChecked: number;
    keywordsRanking: number;
    keywordsTop10: number;
    keywordsTop20: number;
    keywordsTop50: number;
    avgPosition: number | null;
    indexedPagesFound: number;
    brandVisibility: boolean;
    topCompetitorDomains: Array<{ domain: string; appearances: number }>;
  };
  categoryBreakdown: Record<string, {
    total: number;
    ranking: number;
    top10: number;
    top20: number;
  }>;
  keywordAudits: KeywordAudit[];
  siteIndexAudits: SiteIndexAudit[];
  brandAudits: KeywordAudit[];
  recommendations: string[];
  technicalIssues: string[];
}

// ═══════════════════════════════════════════════════════════
// SerpAPI 请求
// ═══════════════════════════════════════════════════════════

async function serpSearch(
  query: string,
  num: number = 20,
  hl: string = "en",
  gl: string = "us"
): Promise<{
  organic_results: any[];
  search_information?: any;
  related_searches?: any[];
  people_also_ask?: any[];
}> {
  const url = `https://serpapi.com/search.json?q=${encodeURIComponent(
    query
  )}&api_key=${SERPAPI_KEY}&num=${num}&hl=${hl}&gl=${gl}`;

  const resp = await fetch(url);
  if (!resp.ok) {
    throw new Error(`SerpAPI error ${resp.status}: ${await resp.text()}`);
  }
  return resp.json() as any;
}

function extractDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

// 判断是否为中文关键词
function isChinese(keyword: string): boolean {
  return /[\u4e00-\u9fff]/.test(keyword);
}

async function auditKeyword(
  keyword: string,
  category: string
): Promise<KeywordAudit> {
  const isZh = isChinese(keyword);
  console.log(`  🔍 "${keyword}" [${isZh ? "zh" : "en"}]`);

  try {
    const data = await serpSearch(keyword, 30, isZh ? "zh-CN" : "en", isZh ? "cn" : "us");
    const organicResults = data.organic_results || [];

    let ourRanking: number | null = null;
    let ourPage: string | undefined;

    const topCompetitors: KeywordAudit["topCompetitors"] = [];

    for (const result of organicResults) {
      const domain = extractDomain(result.link || "");
      const position = result.position || topCompetitors.length + 1;

      if (domain.includes(SITE_DOMAIN)) {
        ourRanking = position;
        ourPage = result.link;
      }

      if (topCompetitors.length < 10) {
        topCompetitors.push({
          position,
          domain,
          title: result.title || "",
          link: result.link || "",
        });
      }
    }

    const relatedSearches = (data.related_searches || []).map(
      (r: any) => r.query
    );
    const peopleAlsoAsk = (data.people_also_ask || []).map(
      (r: any) => r.question
    );

    const totalResults = data.search_information?.total_results;

    const status = ourRanking
      ? `#${ourRanking}`
      : "未上榜";
    console.log(`     → ${status}`);

    return {
      keyword,
      category,
      totalResults,
      ourRanking,
      ourPage,
      topCompetitors,
      relatedSearches: relatedSearches.slice(0, 8),
      peopleAlsoAsk: peopleAlsoAsk.slice(0, 5),
    };
  } catch (err) {
    console.warn(`  ⚠️  Failed: ${err}`);
    return {
      keyword,
      category,
      ourRanking: null,
      topCompetitors: [],
    };
  }
}

async function auditSiteIndex(query: string): Promise<SiteIndexAudit> {
  console.log(`  🔍 "${query}"`);

  try {
    const data = await serpSearch(query, 30);
    const results = data.organic_results || [];

    console.log(`     → ${results.length} 个结果`);

    return {
      query,
      totalResults: data.search_information?.total_results,
      indexedPages: results.map((r: any, i: number) => ({
        position: r.position || i + 1,
        title: r.title || "",
        link: r.link || "",
        snippet: r.snippet || "",
      })),
    };
  } catch (err) {
    console.warn(`  ⚠️  Failed: ${err}`);
    return { query, indexedPages: [] };
  }
}

// ═══════════════════════════════════════════════════════════
// 建议生成
// ═══════════════════════════════════════════════════════════

function generateRecommendations(report: SEOAuditReport): string[] {
  const recs: string[] = [];
  const { summary, keywordAudits, categoryBreakdown } = report;

  // 1. 索引状况
  if (summary.indexedPagesFound < 10) {
    recs.push(
      `[🔴 紧急] Google 仅索引了约 ${summary.indexedPagesFound} 个页面。网站有 ${report.siteInfo.totalBlogPosts} 篇博客 + ${report.siteInfo.totalTutorials} 个教程，但大部分未被索引。需要在 GSC 手动提交 sitemap.xml 并请求索引。`
    );
  } else if (summary.indexedPagesFound < 30) {
    recs.push(
      `[🟡 注意] Google 索引了约 ${summary.indexedPagesFound} 个页面，但网站共有 ${report.siteInfo.totalBlogPosts + report.siteInfo.totalTutorials}+ 个内容页。索引覆盖率偏低，建议检查是否有页面被 noindex 或被 robots.txt 阻止。`
    );
  } else {
    recs.push(
      `[🟢 正面] Google 索引了约 ${summary.indexedPagesFound} 个页面，索引覆盖率良好。`
    );
  }

  // 2. 总体排名分析
  if (summary.keywordsRanking === 0) {
    recs.push(
      `[🔴 紧急] ${summary.totalKeywordsChecked} 个目标关键词中，openclaw101.vip 没有任何排名。网站处于冷启动阶段（Stage 1）。`
    );
    recs.push(
      `[💡 策略] 冷启动期优先级：1) 确保 GSC 已添加并提交 sitemap 2) 品牌词排名 3) 长尾关键词（如 "openclaw docker compose setup"）4) 获取初始外链。`
    );
  } else {
    if (summary.keywordsTop10 > 0) {
      recs.push(
        `[🟢 正面] 有 ${summary.keywordsTop10} 个关键词进入前10，继续优化这些页面的 CTR（改进 title/description）。`
      );
    }
    if (summary.keywordsTop20 > summary.keywordsTop10) {
      const strikingDistance = summary.keywordsTop20 - summary.keywordsTop10;
      recs.push(
        `[🟡 机会] ${strikingDistance} 个关键词在排名 11-20（Striking Distance），通过添加内链、补强内容可以快速推进前10。`
      );
    }
    if (summary.keywordsRanking > 0 && summary.avgPosition) {
      recs.push(
        `[📊 数据] 有排名的 ${summary.keywordsRanking} 个关键词平均排名 ${summary.avgPosition.toFixed(1)}。`
      );
    }
  }

  // 3. 分类排名分析
  for (const [cat, data] of Object.entries(categoryBreakdown)) {
    if (data.ranking === 0 && data.total > 3) {
      const catNames: Record<string, string> = {
        brand_product: "品牌产品词（英文）",
        brand_product_zh: "品牌产品词（中文）",
        telegram: "Telegram Bot 词",
        ai_agent: "AI Agent 词",
        comparison: "对比类词",
        install_deploy: "安装部署词",
        integration: "平台集成词",
        features: "功能特性词",
        zh_traffic: "中文流量词",
      };
      recs.push(
        `[📂 ${catNames[cat] || cat}] ${data.total} 个关键词全部未排名，需要专门优化该方向的内容。`
      );
    }
  }

  // 4. 品牌词
  if (!summary.brandVisibility) {
    recs.push(
      `[🔴 品牌] 品牌词 "openclaw101" 搜索未出现在前5。对于新站这可能正常，但需确保首页 title 和 H1 包含 "openclaw101"。`
    );
  } else {
    recs.push(
      `[🟢 品牌] 品牌词 "openclaw101" 在搜索结果前5有展现，品牌可见度良好。`
    );
  }

  // 5. 竞争对手分析
  if (summary.topCompetitorDomains.length > 0) {
    const topDomains = summary.topCompetitorDomains.slice(0, 5);
    recs.push(
      `[🏢 竞争] 主要竞争对手: ${topDomains.map((d) => `${d.domain}(出现${d.appearances}次)`).join("、")}。建议分析这些站的内容深度、外链和权重。`
    );
  }

  // 6. 内容缺口
  const noRankKeywords = keywordAudits
    .filter((k) => k.ourRanking === null)
    .map((k) => k.keyword);
  if (noRankKeywords.length > 5) {
    recs.push(
      `[📝 内容缺口] ${noRankKeywords.length} 个目标关键词没有排名，高优先级待优化关键词：\n    ${noRankKeywords.slice(0, 10).join("\n    ")}`
    );
  }

  // 7. People Also Ask 机会
  const allPAA = new Set<string>();
  for (const audit of keywordAudits) {
    for (const paa of audit.peopleAlsoAsk || []) {
      allPAA.add(paa);
    }
  }
  if (allPAA.size > 0) {
    recs.push(
      `[💡 PAA 机会] Google "People Also Ask" 中发现 ${allPAA.size} 个相关问题，可用作 FAQ Schema 或创建独立博客文章：\n    ${Array.from(allPAA).slice(0, 10).join("\n    ")}`
    );
  }

  // 8. Related Searches 拓词
  const allRelated = new Set<string>();
  for (const audit of keywordAudits) {
    for (const r of audit.relatedSearches || []) {
      allRelated.add(r);
    }
  }
  if (allRelated.size > 0) {
    recs.push(
      `[🔗 拓词] Google Related Searches 发现 ${allRelated.size} 个相关搜索词，可用于内容扩展和长尾词覆盖。详见报告 JSON。`
    );
  }

  return recs;
}

function generateTechnicalIssues(): string[] {
  const issues: string[] = [];

  // ── 已修复项（e6dd94a 2026-04-17） ──
  issues.push(
    `[✅ 已修复 2026-04-17] robots.txt 冲突：public/robots.txt 早已不存在，仅保留 src/app/robots.ts 动态版本（/api/ blocked）。原问题描述已过时。`
  );

  issues.push(
    `[✅ 已修复 2026-04-17] hreflang 幽灵引用：routing.ts 仅配置 locales: ['en']，zh 路由已移除。layout / home / blog list / blog detail 中的 zh language alternates 已全部删除，不再生成 /zh/* 幽灵 URL。`
  );

  issues.push(
    `[✅ 已修复 2026-04-17] canonical URL 错误：[locale]/layout.tsx 原来将所有页面 canonical 覆盖为根域名。现已移除 layout 中的 generateMetadata canonical 覆盖，每个页面自行声明正确的 canonical。`
  );

  issues.push(
    `[✅ 已修复 2026-04-17] 结构化数据：博客列表页已新增 Blog schema（含前10篇 BlogPosting）；博客详情页 BlogPosting + BreadcrumbList 早已存在。现已全面覆盖。`
  );

  // ── 当前仍存在的问题 ──
  issues.push(
    `[🟡 内链密度] 建议系统化地在每篇文章底部添加"相关文章"区块（3篇推荐），增强站内链接图密度，提升 PageRank 流动效率。`
  );

  issues.push(
    `[🟡 AdSense + GA 影响 Core Web Vitals] 页面加载了 AdSense 和 GA4 脚本，可能影响 LCP/CLS。建议用 Lighthouse 检测 Core Web Vitals 后决定是否延迟加载。`
  );

  issues.push(
    `[🟢 RSS Feed] /feed.xml 已配置 RSS 2.0 + Atom，覆盖博客和教程，有助于内容发现和 Google News 收录。`
  );

  issues.push(
    `[🟢 Sitemap] 动态 sitemap 正常，BUILD_DATE 已更新至 2026-04-17，优先级分层：核心文章 0.9 / 博客 0.7 / 教程 0.6 / 技能分类 0.7。`
  );

  issues.push(
    `[🟢 结构化数据全覆盖] WebSite + Organization（首页）、Blog + BlogPosting（列表页）、BlogPosting + BreadcrumbList（详情页）、FAQPage、Course（学习路径）。`
  );

  return issues;
}

// ═══════════════════════════════════════════════════════════
// Markdown 报告生成
// ═══════════════════════════════════════════════════════════

function generateMarkdownReport(report: SEOAuditReport): string {
  let md = `# 🔍 SEO 诊断报告 — ${report.site}\n\n`;
  md += `> 生成日期: ${report.date.split("T")[0]}\n`;
  md += `> 工具: SerpAPI + 静态代码审计\n\n`;

  // 站点信息
  md += `## 📊 站点概览\n\n`;
  md += `| 指标 | 数值 |\n|---|---|\n`;
  md += `| 博客文章 | ${report.siteInfo.totalBlogPosts} 篇（双语） |\n`;
  md += `| 教程资源 | ${report.siteInfo.totalTutorials} 条 |\n`;
  md += `| 技能分类 | ${report.siteInfo.totalSkillCategories} 类 / ${report.siteInfo.totalSkills} 个技能 |\n`;
  md += `| SEO 核心文章 | ${report.siteInfo.seoCoreSlugs} 篇 |\n`;
  md += `| FAQ Schema | ${report.siteInfo.hasFAQSchema ? "✅" : "❌"} |\n`;
  md += `| Course Schema | ${report.siteInfo.hasCourseSchema ? "✅" : "❌"} |\n`;
  md += `| RSS Feed | ${report.siteInfo.hasRSS ? "✅" : "❌"} |\n`;
  md += `| 面包屑导航 | ${report.siteInfo.hasBreadcrumbs ? "✅" : "❌"} |\n\n`;

  // 搜索可见度摘要
  md += `## 🎯 搜索可见度摘要\n\n`;
  md += `| 指标 | 数值 |\n|---|---|\n`;
  md += `| 目标关键词 | ${report.summary.totalKeywordsChecked} 个 |\n`;
  md += `| 有排名 | ${report.summary.keywordsRanking} 个 |\n`;
  md += `| Top 10 | ${report.summary.keywordsTop10} 个 |\n`;
  md += `| Top 20 | ${report.summary.keywordsTop20} 个 |\n`;
  md += `| Top 50 | ${report.summary.keywordsTop50} 个 |\n`;
  md += `| 平均排名 | ${report.summary.avgPosition?.toFixed(1) || "N/A"} |\n`;
  md += `| Google 索引页面 | ~${report.summary.indexedPagesFound} |\n`;
  md += `| 品牌可见度 | ${report.summary.brandVisibility ? "✅ 品牌词前5" : "❌ 品牌词未进前5"} |\n\n`;

  // 阶段判断
  const stage = determineStage(report);
  const stageNames = ["", "冷启动期 ❄️", "索引增长期 🌱", "排名攀升期 📈", "稳定优化期 🏆"];
  md += `### 🎯 SEO 阶段判断: Stage ${stage} — ${stageNames[stage]}\n\n`;

  // 分类排名
  md += `## 📂 分类排名详情\n\n`;
  md += `| 分类 | 关键词数 | 有排名 | Top10 | Top20 |\n|---|---|---|---|---|\n`;
  const catNames: Record<string, string> = {
    brand_product: "品牌产品词（EN）",
    brand_product_zh: "品牌产品词（ZH）",
    telegram: "Telegram Bot",
    ai_agent: "AI Agent",
    comparison: "对比类",
    install_deploy: "安装部署",
    integration: "平台集成",
    features: "功能特性",
    zh_traffic: "中文流量",
  };
  for (const [cat, data] of Object.entries(report.categoryBreakdown)) {
    md += `| ${catNames[cat] || cat} | ${data.total} | ${data.ranking} | ${data.top10} | ${data.top20} |\n`;
  }
  md += `\n`;

  // 关键词详情
  md += `## 🔑 关键词排名详情\n\n`;
  md += `| 关键词 | 分类 | 排名 | 页面 |\n|---|---|---|---|\n`;
  for (const audit of report.keywordAudits) {
    const rank = audit.ourRanking !== null ? `#${audit.ourRanking}` : "未上榜";
    const page = audit.ourPage
      ? audit.ourPage.replace(`https://${report.site}`, "")
      : "-";
    md += `| ${audit.keyword} | ${audit.category} | ${rank} | ${page} |\n`;
  }

  // 竞争对手
  md += `\n## 🏢 主要竞争对手\n\n`;
  md += `| 域名 | 出现次数 |\n|---|---|\n`;
  for (const comp of report.summary.topCompetitorDomains.slice(0, 15)) {
    md += `| ${comp.domain} | ${comp.appearances} |\n`;
  }

  // 索引情况
  md += `\n## 📄 Google 索引情况\n\n`;
  for (const audit of report.siteIndexAudits) {
    md += `### \`${audit.query}\`\n\n`;
    if (audit.indexedPages.length === 0) {
      md += `> 无结果\n\n`;
    } else {
      md += `发现 ${audit.indexedPages.length} 个结果${audit.totalResults ? `（总计约 ${audit.totalResults}）` : ""}：\n\n`;
      for (const page of audit.indexedPages.slice(0, 15)) {
        md += `- **${page.title}**\n  ${page.link}\n`;
        if (page.snippet) {
          md += `  > ${page.snippet.slice(0, 150)}...\n`;
        }
      }
      md += `\n`;
    }
  }

  // 品牌词
  md += `## 🏷️ 品牌词检查\n\n`;
  for (const audit of report.brandAudits) {
    const rank = audit.ourRanking !== null ? `#${audit.ourRanking}` : "未找到";
    md += `- **"${audit.keyword}"** → ${rank}\n`;
  }

  // People Also Ask
  const allPAA = new Set<string>();
  for (const audit of report.keywordAudits) {
    for (const paa of audit.peopleAlsoAsk || []) {
      allPAA.add(paa);
    }
  }
  if (allPAA.size > 0) {
    md += `\n## ❓ People Also Ask\n\n`;
    md += `以下问题可用作新博客文章主题或 FAQ 扩展：\n\n`;
    for (const paa of allPAA) {
      md += `- ${paa}\n`;
    }
  }

  // Related Searches
  const allRelated = new Set<string>();
  for (const audit of report.keywordAudits) {
    for (const r of audit.relatedSearches || []) {
      allRelated.add(r);
    }
  }
  if (allRelated.size > 0) {
    md += `\n## 🔗 Google Related Searches\n\n`;
    md += `以下词可用于内容扩展和长尾关键词策略：\n\n`;
    for (const r of allRelated) {
      md += `- ${r}\n`;
    }
  }

  // 技术 SEO 问题
  md += `\n## 🔧 技术 SEO 问题\n\n`;
  for (let i = 0; i < report.technicalIssues.length; i++) {
    md += `${i + 1}. ${report.technicalIssues[i]}\n\n`;
  }

  // 优化建议
  md += `## 💡 优化建议\n\n`;
  for (let i = 0; i < report.recommendations.length; i++) {
    md += `${i + 1}. ${report.recommendations[i]}\n\n`;
  }

  // 行动计划
  md += `## 🗓️ 建议行动计划\n\n`;
  md += `### 第一周（紧急修复）\n`;
  md += `- [ ] 注册 Google Search Console，验证 openclaw101.vip 所有权\n`;
  md += `- [ ] 提交 sitemap.xml 到 GSC\n`;
  md += `- [ ] 修复 robots.txt 冲突（删除 public/robots.txt，完善 robots.ts）\n`;
  md += `- [ ] 为所有博客文章手动请求索引\n\n`;
  md += `### 第二周（技术优化）\n`;
  md += `- [ ] 添加 hreflang alternates 到 locale layout\n`;
  md += `- [ ] 修复 canonical URL 为每个 locale 正确的 URL\n`;
  md += `- [ ] 博客文章页面添加 Article/BlogPosting Schema\n`;
  md += `- [ ] OG locale 动态化\n\n`;
  md += `### 第三-四周（内容优化）\n`;
  md += `- [ ] 在每篇博客底部添加"相关文章"区块\n`;
  md += `- [ ] 利用 PAA 问题创建 5 篇新博客文章\n`;
  md += `- [ ] 优化 SEO 核心文章的 title 和 meta description\n`;
  md += `- [ ] 运行 Lighthouse 检测并优化 Core Web Vitals\n\n`;
  md += `### 持续优化\n`;
  md += `- [ ] 每周检查 GSC 数据，追踪索引和排名变化\n`;
  md += `- [ ] 获取高质量外链（提交到 Product Hunt、Hacker News、技术社区等）\n`;
  md += `- [ ] 每两周运行此诊断脚本，对比数据变化\n`;

  return md;
}

function determineStage(report: SEOAuditReport): number {
  const { summary } = report;

  // 4 个指标判断，取最低值（保守策略）
  const stages: number[] = [];

  // 指标1: 索引页面数
  if (summary.indexedPagesFound < 10) stages.push(1);
  else if (summary.indexedPagesFound < 50) stages.push(2);
  else stages.push(3);

  // 指标2: 有排名的关键词数
  if (summary.keywordsRanking < 3) stages.push(1);
  else if (summary.keywordsRanking < 15) stages.push(2);
  else if (summary.keywordsRanking < 30) stages.push(3);
  else stages.push(4);

  // 指标3: Top10 关键词数
  if (summary.keywordsTop10 < 1) stages.push(1);
  else if (summary.keywordsTop10 < 5) stages.push(2);
  else if (summary.keywordsTop10 < 15) stages.push(3);
  else stages.push(4);

  // 指标4: 品牌可见度
  if (!summary.brandVisibility) stages.push(1);
  else stages.push(2);

  return Math.min(...stages);
}

// ═══════════════════════════════════════════════════════════
// 主流程
// ═══════════════════════════════════════════════════════════

async function main() {
  if (!SERPAPI_KEY) {
    console.error("❌ 缺少 SERPAPI_KEY 环境变量");
    console.error("   用法: SERPAPI_KEY=xxx npx tsx scripts/seo-diagnosis.ts");
    process.exit(1);
  }

  const totalRequests =
    TARGET_KEYWORDS.length + BRAND_KEYWORDS.length + SITE_QUERIES.length;

  console.log("═".repeat(70));
  console.log(`🔍 SEO 诊断: ${SITE_DOMAIN}`);
  console.log(`   日期: ${new Date().toISOString().split("T")[0]}`);
  console.log(`   目标关键词: ${TARGET_KEYWORDS.length} 个`);
  console.log(`   品牌词: ${BRAND_KEYWORDS.length} 个`);
  console.log(`   Site 查询: ${SITE_QUERIES.length} 个`);
  console.log(`   SerpAPI 总请求: ~${totalRequests} 次`);
  console.log("═".repeat(70));

  const report: SEOAuditReport = {
    date: new Date().toISOString(),
    site: SITE_DOMAIN,
    siteInfo: {
      totalBlogPosts: 39,
      totalTutorials: 60,
      totalSkillCategories: 17,
      totalSkills: 97,
      seoCoreSlugs: 13,
      sitemapPages: 136,
      hasRSS: true,
      hasFAQSchema: true,
      hasCourseSchema: true,
      hasBreadcrumbs: true,
    },
    summary: {
      totalKeywordsChecked: TARGET_KEYWORDS.length,
      keywordsRanking: 0,
      keywordsTop10: 0,
      keywordsTop20: 0,
      keywordsTop50: 0,
      avgPosition: null,
      indexedPagesFound: 0,
      brandVisibility: false,
      topCompetitorDomains: [],
    },
    categoryBreakdown: {},
    keywordAudits: [],
    siteIndexAudits: [],
    brandAudits: [],
    recommendations: [],
    technicalIssues: [],
  };

  // ── Step 1: 目标关键词排名检查 ──
  console.log("\n📡 Step 1: 检查目标关键词排名...");
  const competitorCount: Record<string, number> = {};

  for (let i = 0; i < TARGET_KEYWORDS.length; i++) {
    const { keyword, category } = TARGET_KEYWORDS[i];

    const audit = await auditKeyword(keyword, category);
    report.keywordAudits.push(audit);

    for (const comp of audit.topCompetitors) {
      if (!comp.domain.includes(SITE_DOMAIN)) {
        competitorCount[comp.domain] =
          (competitorCount[comp.domain] || 0) + 1;
      }
    }

    // Rate limit: 2.5s between requests
    if (i < TARGET_KEYWORDS.length - 1) {
      await new Promise((r) => setTimeout(r, 2500));
    }
  }

  // ── Step 2: Site 索引检查 ──
  console.log("\n📡 Step 2: 检查 Google 索引情况...");
  for (let i = 0; i < SITE_QUERIES.length; i++) {
    const audit = await auditSiteIndex(SITE_QUERIES[i]);
    report.siteIndexAudits.push(audit);

    if (i < SITE_QUERIES.length - 1) {
      await new Promise((r) => setTimeout(r, 2500));
    }
  }

  // ── Step 3: 品牌词检查 ──
  console.log("\n📡 Step 3: 检查品牌词可见度...");
  for (let i = 0; i < BRAND_KEYWORDS.length; i++) {
    const audit = await auditKeyword(BRAND_KEYWORDS[i], "brand");
    report.brandAudits.push(audit);

    if (i < BRAND_KEYWORDS.length - 1) {
      await new Promise((r) => setTimeout(r, 2500));
    }
  }

  // ── 计算 Summary ──
  const rankings = report.keywordAudits
    .filter((a) => a.ourRanking !== null)
    .map((a) => a.ourRanking as number);

  report.summary.keywordsRanking = rankings.length;
  report.summary.keywordsTop10 = rankings.filter((r) => r <= 10).length;
  report.summary.keywordsTop20 = rankings.filter((r) => r <= 20).length;
  report.summary.keywordsTop50 = rankings.filter((r) => r <= 50).length;
  report.summary.avgPosition =
    rankings.length > 0
      ? rankings.reduce((a, b) => a + b, 0) / rankings.length
      : null;

  const siteIndexMain = report.siteIndexAudits[0];
  report.summary.indexedPagesFound = siteIndexMain?.indexedPages?.length || 0;

  report.summary.brandVisibility = report.brandAudits.some(
    (a) => a.ourRanking !== null && a.ourRanking <= 5
  );

  report.summary.topCompetitorDomains = Object.entries(competitorCount)
    .map(([domain, appearances]) => ({ domain, appearances }))
    .sort((a, b) => b.appearances - a.appearances)
    .slice(0, 15);

  // ── 分类统计 ──
  for (const audit of report.keywordAudits) {
    if (!report.categoryBreakdown[audit.category]) {
      report.categoryBreakdown[audit.category] = {
        total: 0,
        ranking: 0,
        top10: 0,
        top20: 0,
      };
    }
    const cat = report.categoryBreakdown[audit.category];
    cat.total++;
    if (audit.ourRanking !== null) {
      cat.ranking++;
      if (audit.ourRanking <= 10) cat.top10++;
      if (audit.ourRanking <= 20) cat.top20++;
    }
  }

  // ── 生成技术问题和建议 ──
  report.technicalIssues = generateTechnicalIssues();
  report.recommendations = generateRecommendations(report);

  // ── 输出报告 ──
  if (!fs.existsSync(REPORT_DIR)) {
    fs.mkdirSync(REPORT_DIR, { recursive: true });
  }

  const dateStr = new Date().toISOString().split("T")[0];
  const jsonPath = path.join(REPORT_DIR, `seo-diagnosis-${dateStr}.json`);
  fs.writeFileSync(jsonPath, JSON.stringify(report, null, 2), "utf-8");

  const mdPath = path.join(REPORT_DIR, `seo-diagnosis-${dateStr}.md`);
  const md = generateMarkdownReport(report);
  fs.writeFileSync(mdPath, md, "utf-8");

  // ── 控制台摘要 ──
  const stage = determineStage(report);
  const stageNames = ["", "冷启动期 ❄️", "索引增长期 🌱", "排名攀升期 📈", "稳定优化期 🏆"];

  console.log("\n" + "═".repeat(70));
  console.log(`📊 SEO 诊断摘要 — ${SITE_DOMAIN}`);
  console.log("═".repeat(70));
  console.log(`  🎯 SEO 阶段: Stage ${stage} — ${stageNames[stage]}`);
  console.log(`  目标关键词: ${report.summary.totalKeywordsChecked} 个`);
  console.log(`  有排名: ${report.summary.keywordsRanking} 个`);
  console.log(`  Top 10: ${report.summary.keywordsTop10} 个`);
  console.log(`  Top 20: ${report.summary.keywordsTop20} 个`);
  console.log(`  Top 50: ${report.summary.keywordsTop50} 个`);
  console.log(
    `  平均排名: ${report.summary.avgPosition?.toFixed(1) || "N/A"}`
  );
  console.log(`  Google 索引页面: ~${report.summary.indexedPagesFound}`);
  console.log(
    `  品牌可见度: ${report.summary.brandVisibility ? "✅" : "❌"}`
  );

  console.log("\n  🏢 主要竞争对手:");
  for (const comp of report.summary.topCompetitorDomains.slice(0, 10)) {
    console.log(`     ${comp.domain} (出现 ${comp.appearances} 次)`);
  }

  console.log("\n  🔧 技术问题:");
  for (const issue of report.technicalIssues.slice(0, 5)) {
    console.log(`     ${issue.slice(0, 100)}...`);
  }

  console.log("\n  💡 优化建议:");
  for (const rec of report.recommendations.slice(0, 5)) {
    console.log(`     ${rec.slice(0, 100)}...`);
  }

  console.log(`\n  📋 完整报告: ${jsonPath}`);
  console.log(`  📋 Markdown: ${mdPath}`);
  console.log("═".repeat(70));
}

main().catch((err) => {
  console.error("💥 SEO 诊断失败:", err);
  process.exit(1);
});
