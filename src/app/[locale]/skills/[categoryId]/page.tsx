import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeft, Star, ExternalLink } from 'lucide-react';
import { skillCategories, getCategoryById, getSkillsByCategory } from '@/data/skills';
import { JsonLd } from '@/components/seo/JsonLd';
import { Link } from '@/i18n/routing';

const SITE_URL = 'https://openclaw101.vip';

export async function generateStaticParams() {
  return skillCategories.map((c) => ({ categoryId: c.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; categoryId: string }>;
}): Promise<Metadata> {
  const { locale, categoryId } = await params;
  const category = getCategoryById(categoryId);
  if (!category) return {};

  const isZh = locale === 'zh';
  const catName = isZh ? category.nameZh : category.name;

  const title = isZh
    ? `${catName}技能 — ${category.count}+ 个 OpenClaw 社区技能`
    : `${catName} Skills — ${category.count}+ OpenClaw Community Skills`;
  const description = isZh
    ? (category.descriptionZh ?? `浏览 ${category.count}+ 个 ${catName} 分类的 OpenClaw AI 技能。一键安装。`)
    : (category.description ?? `Browse ${category.count}+ ${catName} skills for OpenClaw AI assistant. Install with one command.`);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}/skills/${categoryId}`,
      locale: isZh ? 'zh_CN' : 'en_US',
    },
    alternates: {
      canonical: `${SITE_URL}/en/skills/${categoryId}`,
    },
  };
}

export default async function SkillCategoryPage({
  params,
}: {
  params: Promise<{ locale: string; categoryId: string }>;
}) {
  const { locale, categoryId } = await params;
  const category = getCategoryById(categoryId);

  if (!category) {
    notFound();
  }

  const isZh = locale === 'zh';
  const catName = isZh ? category.nameZh : category.name;
  const catDescription = isZh ? category.descriptionZh : category.description;
  const categorySkills = getSkillsByCategory(categoryId);
  const otherCategories = skillCategories.filter((c) => c.id !== categoryId).slice(0, 6);

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: isZh ? '首页' : 'Home',
        item: `${SITE_URL}/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: isZh ? '技能库' : 'Skills',
        item: `${SITE_URL}/${locale}/skills`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: catName,
        item: `${SITE_URL}/${locale}/skills/${categoryId}`,
      },
    ],
  };

  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${catName} — OpenClaw Skills`,
    description: catDescription,
    url: `${SITE_URL}/${locale}/skills/${categoryId}`,
    numberOfItems: category.count,
    isPartOf: {
      '@type': 'WebSite',
      name: 'OpenClaw 101',
      url: SITE_URL,
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={collectionJsonLd} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-purple-600 to-indigo-700 py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link
            href="/skills"
            className="inline-flex items-center gap-1.5 text-sm text-white/80 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            {isZh ? '返回技能库' : 'Back to Skills'}
          </Link>

          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">{category.icon}</span>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                {catName}
              </h1>
              <p className="mt-1 text-lg text-purple-200">
                {category.count}+ {isZh ? '个技能' : 'skills'}
              </p>
            </div>
          </div>
          {catDescription && (
            <p className="text-lg text-purple-100 max-w-2xl leading-relaxed">
              {catDescription}
            </p>
          )}
          <div className="mt-8">
            <code className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg text-white font-mono text-sm">
              npx clawhub@latest install &lt;skill-name&gt;
            </code>
          </div>
        </div>
      </section>

      {/* Skills in this category */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {isZh ? `精选 ${catName} 技能` : `Featured ${catName} Skills`}
          </h2>

          {categorySkills.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {categorySkills.map((skill) => (
                <div key={skill.id} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">{skill.name}</h3>
                    </div>
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="text-sm">{skill.stars}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{skill.description}</p>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 bg-gray-100 px-3 py-2 rounded text-sm font-mono text-gray-800 overflow-x-auto">
                      {skill.installCommand}
                    </code>
                    {skill.githubUrl && (
                      <a
                        href={skill.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl p-8 text-center border border-gray-100">
              <p className="text-gray-500 mb-4">
                {isZh
                  ? `${catName} 分类有 ${category.count}+ 个技能，可在 ClawHub 浏览完整列表。`
                  : `${catName} has ${category.count}+ skills available on ClawHub.`}
              </p>
              <a
                href="https://clawhub.com"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="inline-flex items-center gap-2 px-6 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
              >
                {isZh ? '浏览 ClawHub' : 'Browse ClawHub'}
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Other categories */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {isZh ? '其他技能分类' : 'Other Categories'}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {otherCategories.map((cat) => (
              <Link
                key={cat.id}
                href={`/skills/${cat.id}`}
                className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all"
              >
                <span className="text-2xl">{cat.icon}</span>
                <div>
                  <h3 className="font-semibold text-gray-900">{isZh ? cat.nameZh : cat.name}</h3>
                  <p className="text-sm text-gray-500">{cat.count}+ {isZh ? '技能' : 'skills'}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
