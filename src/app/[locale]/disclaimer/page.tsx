import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Disclaimer — OpenClaw 101',
  description: 'Disclaimer for OpenClaw 101. Understand the limitations of our content and our relationship with the OpenClaw project.',
}

export default function DisclaimerPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-4">Disclaimer</h1>

      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Last updated: April 8, 2026
      </p>

      <div className="prose prose-lg max-w-none dark:prose-invert">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. General Information</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            The information provided on OpenClaw 101 (&quot;the Website&quot;) is for general informational and educational purposes only. All content on this site is published in good faith and is intended to help users learn about and use the OpenClaw AI agent framework.
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            While we strive to keep the information accurate and up-to-date, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the information, products, services, or related graphics contained on the Website.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Not Official Documentation</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            OpenClaw 101 is an <strong>independent, community-driven educational resource</strong>. We are not affiliated with, endorsed by, or officially connected to the OpenClaw project or its maintainers.
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            For official documentation, release notes, and support, please visit the{' '}
            <a href="https://docs.openclaw.ai" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              official OpenClaw documentation
            </a>.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Technical Content Accuracy</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Technology evolves rapidly. The tutorials, guides, and technical information on this Website may become outdated as new versions of OpenClaw and related software are released. We recommend:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li>Checking the &quot;Last updated&quot; date on each article</li>
            <li>Verifying instructions against the latest official documentation</li>
            <li>Testing commands and configurations in a safe environment before applying them to production systems</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Third-Party Skills and Tools</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            We may mention or recommend third-party tools, skills, and services throughout our content. We do not endorse or guarantee the safety, quality, or functionality of any third-party software. Always:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li>Review source code before installing community skills</li>
            <li>Use verified and trusted publishers when possible</li>
            <li>Understand the permissions and access levels granted to installed tools</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Use at Your Own Risk</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Any reliance you place on the information provided on this Website is strictly at your own risk. We shall not be liable for any loss or damage, including but not limited to indirect or consequential loss or damage, arising from the use of this Website or any information contained herein.
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            Running AI agents, executing scripts, and automating tasks involves inherent risks. Always review generated code and automated actions carefully, especially when granting AI agents access to your file system, network, or external services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. External Links</h2>
          <p className="text-gray-700 dark:text-gray-300">
            This Website contains links to external websites that are not maintained by us. We have no control over the content, privacy policies, or practices of any third-party sites and accept no responsibility for them. Following external links is at your own discretion.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. AI-Generated Content</h2>
          <p className="text-gray-700 dark:text-gray-300">
            Some content on this Website may be assisted by AI tools during the writing process. However, all published content is reviewed, fact-checked, and edited by our human editorial team before publication. We are committed to providing accurate, helpful, and original information.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Changes to This Disclaimer</h2>
          <p className="text-gray-700 dark:text-gray-300">
            We may update this Disclaimer from time to time. Changes will be posted on this page with an updated date. Continued use of the Website after changes are posted constitutes acceptance of the revised Disclaimer.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. Contact</h2>
          <p className="text-gray-700 dark:text-gray-300">
            If you have questions about this Disclaimer, please{' '}
            <Link href="/contact" className="text-blue-600 hover:underline">
              contact us
            </Link>.
          </p>
        </section>
      </div>

      <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-wrap gap-4">
        <Link href="/" className="text-blue-600 hover:underline">
          ← Back to Home
        </Link>
        <Link href="/privacy" className="text-blue-600 hover:underline">
          Privacy Policy
        </Link>
        <Link href="/terms" className="text-blue-600 hover:underline">
          Terms of Service
        </Link>
      </div>
    </div>
  )
}
