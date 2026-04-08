import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Contact Us — OpenClaw 101',
  description: 'Get in touch with the OpenClaw 101 team. Report issues, suggest improvements, or ask questions about our guides and tutorials.',
}

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-4">Contact Us</h1>

      <p className="text-gray-600 dark:text-gray-400 mb-8">
        We value your feedback and are happy to help with any questions about OpenClaw or our content.
      </p>

      <div className="prose prose-lg max-w-none dark:prose-invert">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">How to Reach Us</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            The best way to contact us depends on the nature of your inquiry:
          </p>

          <div className="grid gap-6 md:grid-cols-2 mt-6">
            <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
              <h3 className="text-lg font-semibold mb-2">Report a Bug or Issue</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                Found an error in our content, a broken link, or a technical issue with the website?
              </p>
              <a
                href="https://github.com/moonye6/openclaw101/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm font-medium"
              >
                Open a GitHub Issue →
              </a>
            </div>

            <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
              <h3 className="text-lg font-semibold mb-2">Suggest an Improvement</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                Have an idea for a new tutorial, guide, or feature you&apos;d like to see on the site?
              </p>
              <a
                href="https://github.com/moonye6/openclaw101/discussions"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm font-medium"
              >
                Start a Discussion →
              </a>
            </div>

            <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
              <h3 className="text-lg font-semibold mb-2">General Questions</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                Questions about our content, editorial decisions, or anything else?
              </p>
              <a
                href="mailto:contact@openclaw101.vip"
                className="text-blue-600 hover:underline text-sm font-medium"
              >
                Email: contact@openclaw101.vip →
              </a>
            </div>

            <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
              <h3 className="text-lg font-semibold mb-2">Content Corrections</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                Found inaccurate or outdated information? We take accuracy seriously.
              </p>
              <a
                href="https://github.com/moonye6/openclaw101/issues/new?labels=content-correction"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm font-medium"
              >
                Submit a Correction →
              </a>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Community Channels</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            For general discussion about OpenClaw (not specific to this website), you can also join the official community:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <a href="https://discord.com/invite/clawd" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                OpenClaw Discord Server
              </a> — Active community of OpenClaw users and developers
            </li>
            <li>
              <a href="https://reddit.com/r/openclaw" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                r/openclaw on Reddit
              </a> — Discussion forum for OpenClaw topics
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Response Time</h2>
          <p className="text-gray-700 dark:text-gray-300">
            We aim to respond to all inquiries within 2-3 business days. GitHub issues are typically addressed faster as they are visible to the entire community.
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
        <Link href="/privacy" className="text-blue-600 hover:underline">
          Privacy Policy
        </Link>
      </div>
    </div>
  )
}
