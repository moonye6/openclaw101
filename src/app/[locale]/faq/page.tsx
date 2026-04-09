import { Metadata } from 'next'
import { FAQSection } from '@/components/seo/FAQSection'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions — OpenClaw 101',
  description: 'Find answers to the most common questions about OpenClaw: what it is, how to use it, pricing, supported platforms, security, and more.',
  alternates: {
    canonical: 'https://openclaw101.vip/faq',
  },
}

export default function FAQPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 pt-12 pb-4">
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
          Last updated: April 8, 2026
        </p>
      </div>
      <FAQSection />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <div className="mt-8 p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-center">
          <p className="text-gray-700 dark:text-gray-300 mb-2">
            Still have questions? We&apos;re happy to help.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <a
              href="https://github.com/moonye6/openclaw101/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline text-sm font-medium"
            >
              Ask on GitHub →
            </a>
            <a
              href="mailto:contact@openclaw101.vip"
              className="text-blue-600 hover:underline text-sm font-medium"
            >
              Email Us →
            </a>
            <a
              href="https://discord.com/invite/clawd"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline text-sm font-medium"
            >
              Join Discord →
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
