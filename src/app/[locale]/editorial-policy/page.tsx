import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Editorial Policy — OpenClaw 101',
  description: 'Learn about our editorial standards, content review process, and commitment to accuracy at OpenClaw 101.',
}

export default function EditorialPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-4">Editorial Policy</h1>

      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Last updated: April 8, 2026
      </p>

      <div className="prose prose-lg max-w-none dark:prose-invert">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Our Commitment</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            At OpenClaw 101, we are committed to providing accurate, helpful, and trustworthy information about the OpenClaw AI agent framework. Every piece of content we publish goes through a structured editorial process to ensure quality and reliability.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Content Standards</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            All content published on OpenClaw 101 must meet the following standards:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li><strong>Accuracy</strong> — Technical instructions are tested against the latest stable release of OpenClaw before publication.</li>
            <li><strong>Clarity</strong> — Content is written in clear, accessible language suitable for beginners. Jargon is explained when first introduced.</li>
            <li><strong>Originality</strong> — All guides and tutorials are original content based on our team&apos;s hands-on experience. We do not republish or spin content from other sources.</li>
            <li><strong>Completeness</strong> — Each guide includes all necessary steps, prerequisites, and potential troubleshooting tips so readers can follow along successfully.</li>
            <li><strong>Timeliness</strong> — We include &quot;Last updated&quot; dates on all articles and review content regularly to keep it current.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Editorial Process</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Our content creation follows this workflow:
          </p>
          <ol className="list-decimal pl-6 space-y-3 text-gray-700 dark:text-gray-300">
            <li><strong>Research &amp; Planning</strong> — We identify topics based on user needs, search trends, and gaps in existing OpenClaw documentation.</li>
            <li><strong>Hands-On Testing</strong> — Before writing, our team tests all tools, features, and workflows firsthand to ensure accuracy.</li>
            <li><strong>Drafting</strong> — Content is written by team members with relevant domain expertise.</li>
            <li><strong>Technical Review</strong> — A second team member verifies all technical claims, code samples, and step-by-step instructions.</li>
            <li><strong>Editorial Review</strong> — Content is reviewed for clarity, grammar, structure, and adherence to our style guide.</li>
            <li><strong>Publication &amp; Monitoring</strong> — After publication, we monitor for reader feedback and update content as needed.</li>
          </ol>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Use of AI Tools</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            We believe in transparency about AI usage in content creation:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li>AI tools may be used to assist with research, drafting, and translation.</li>
            <li>All AI-assisted content is thoroughly reviewed and edited by human team members.</li>
            <li>Technical accuracy is always verified through hands-on testing, not AI output alone.</li>
            <li>We do not publish unedited AI-generated content.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Corrections and Updates</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Accuracy is our top priority. When errors are identified:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li>We correct errors promptly upon discovery.</li>
            <li>Significant corrections are noted within the article.</li>
            <li>The &quot;Last updated&quot; date is updated to reflect changes.</li>
            <li>Community members can report errors through <a href="https://github.com/moonye6/openclaw101/issues" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">GitHub Issues</a> or by <Link href="/contact" className="text-blue-600 hover:underline">contacting us</Link>.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Content Review Schedule</h2>
          <p className="text-gray-700 dark:text-gray-300">
            We review our content on a regular basis to ensure it remains accurate:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mt-4">
            <li><strong>Core Guides</strong> — Reviewed and updated with each major OpenClaw release.</li>
            <li><strong>Tutorials</strong> — Reviewed quarterly or when significant changes are reported.</li>
            <li><strong>Blog Posts</strong> — Reviewed annually; time-sensitive posts are archived if no longer relevant.</li>
            <li><strong>Skill Directory</strong> — Updated as new skills are added to ClawHub.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Advertising Policy</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            OpenClaw 101 uses advertising to support the free availability of our content:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li>Advertisements are clearly distinguishable from editorial content.</li>
            <li>Advertising does not influence our editorial decisions or content recommendations.</li>
            <li>We do not accept sponsored content or paid reviews without clear disclosure.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Feedback</h2>
          <p className="text-gray-700 dark:text-gray-300">
            We welcome feedback on our content quality and editorial practices. If you believe any content on OpenClaw 101 does not meet these standards, please let us know through our <Link href="/contact" className="text-blue-600 hover:underline">contact page</Link>.
          </p>
        </section>
      </div>

      <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-wrap gap-4">
        <Link href="/" className="text-blue-600 hover:underline">
          ← Back to Home
        </Link>
        <Link href="/about" className="text-blue-600 hover:underline">
          About Us
        </Link>
        <Link href="/contact" className="text-blue-600 hover:underline">
          Contact Us
        </Link>
      </div>
    </div>
  )
}
