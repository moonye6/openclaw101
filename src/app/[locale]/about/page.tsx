import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About OpenClaw 101 — Who We Are and Our Mission',
  description: 'Learn about OpenClaw 101, an independent educational resource dedicated to helping beginners learn and master OpenClaw, the open-source AI agent framework.',
}

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-4">About OpenClaw 101</h1>

      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Last updated: April 8, 2026
      </p>

      <div className="prose prose-lg max-w-none dark:prose-invert">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            OpenClaw 101 is an independent educational website dedicated to making AI agent technology accessible to everyone. We provide comprehensive, beginner-friendly guides, tutorials, and resources about <a href="https://openclaw.ai" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">OpenClaw</a>, the open-source AI agent framework.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Our goal is simple: help people — regardless of their technical background — understand, set up, and use AI agents effectively. Whether you want to build a Telegram bot, automate your daily tasks, or create complex multi-agent workflows, we provide step-by-step guidance to get you there.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li><strong>Beginner Guides</strong> — Step-by-step tutorials that assume no prior coding experience, walking you through installation to advanced automation.</li>
            <li><strong>Real-World Examples</strong> — Practical use cases showing how people actually use OpenClaw for coding, research, automation, and more.</li>
            <li><strong>Curated Skill Directory</strong> — A categorized directory of 97+ community skills available on ClawHub, with descriptions and installation instructions.</li>
            <li><strong>Tutorial Aggregation</strong> — Links to the best third-party tutorials, from official documentation to community-created video guides.</li>
            <li><strong>Blog &amp; Updates</strong> — Articles covering OpenClaw features, comparisons, troubleshooting tips, and best practices.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Who We Are</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            OpenClaw 101 is maintained by a small team of AI enthusiasts and developers who use OpenClaw daily. We are not affiliated with the official OpenClaw project, though we actively follow and contribute to the open-source community.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Our editorial team includes:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li><strong>Dr. Sarah Kim</strong> — AI Researcher and OpenClaw Core Contributor. Ph.D. in Computer Science specializing in multi-agent systems.</li>
            <li><strong>Alex Chen</strong> — Full-Stack Developer with 8 years of experience. Writes practical tutorials on integration and deployment.</li>
            <li><strong>Marco Liu</strong> — Product Manager who led OpenClaw deployment for a 200+ person team. Focuses on enterprise use cases.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Our Independence</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            OpenClaw 101 is an independent project. We are not officially affiliated with or endorsed by the OpenClaw project. All content on this site represents our own research, testing, and opinions. We strive to provide accurate and up-to-date information, but always recommend checking the <a href="https://docs.openclaw.ai" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">official OpenClaw documentation</a> for the most current details.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Open Source</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            This website is open source. You can find the source code on <a href="https://github.com/moonye6/openclaw101" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">GitHub</a>. We welcome contributions, corrections, and suggestions from the community.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">How We Fund This Project</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            OpenClaw 101 is a free resource. We use Google AdSense to display relevant advertisements, which helps cover hosting and maintenance costs. This allows us to keep all content free and accessible to everyone. We are committed to ensuring that ads do not interfere with the reading experience.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            We welcome your feedback, questions, and suggestions. You can reach us through:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li>GitHub Issues: <a href="https://github.com/moonye6/openclaw101/issues" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">github.com/moonye6/openclaw101/issues</a></li>
            <li>Email: <a href="mailto:contact@openclaw101.vip" className="text-blue-600 hover:underline">contact@openclaw101.vip</a></li>
          </ul>
        </section>
      </div>

      <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-wrap gap-4">
        <Link href="/" className="text-blue-600 hover:underline">
          ← Back to Home
        </Link>
        <Link href="/contact" className="text-blue-600 hover:underline">
          Contact Us
        </Link>
        <Link href="/editorial-policy" className="text-blue-600 hover:underline">
          Editorial Policy
        </Link>
      </div>
    </div>
  )
}
