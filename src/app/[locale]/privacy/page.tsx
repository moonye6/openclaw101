import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy | OpenClaw 101',
  description: 'Privacy policy for OpenClaw 101 - Learn how we collect, use, and protect your data.',
}

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      
      <p className="text-gray-600 mb-8">
        Last updated: March 21, 2026
      </p>

      <div className="prose prose-lg max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
          <p className="text-gray-700 mb-4">
            OpenClaw 101 collects information in the following ways:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li><strong>Analytics Data</strong>: We use Google Analytics to collect anonymous usage data, including page views, session duration, and user demographics.</li>
            <li><strong>Advertising Data</strong>: We use Google AdSense to display ads. Google may collect data about your interests and browsing behavior to show relevant ads.</li>
            <li><strong>Cookies</strong>: We use cookies to improve your experience and for analytics and advertising purposes.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Google AdSense and Advertising</h2>
          <p className="text-gray-700 mb-4">
            We use Google AdSense to display advertisements on this website. Google AdSense uses cookies to serve ads based on your prior visits to this or other websites.
          </p>
          <p className="text-gray-700 mb-4">
            Google&apos;s use of advertising cookies enables it and its partners to serve ads based on your visit to our site and/or other sites on the Internet.
          </p>
          <p className="text-gray-700 mb-4">
            You may opt out of personalized advertising by visiting{' '}
            <a 
              href="https://www.google.com/settings/ads" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Google Ads Settings
            </a>.
          </p>
          <h3 className="text-xl font-semibold mb-3 mt-6">Third-Party Vendors</h3>
          <p className="text-gray-700 mb-4">
            We use third-party vendors to display ads on our site:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Google AdSense (Google LLC)</li>
          </ul>
          <p className="text-gray-700 mt-4">
            For more information about how Google uses data, please see:{' '}
            <a 
              href="https://policies.google.com/privacy" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Google Privacy Policy
            </a>.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Cookies and Tracking</h2>
          <p className="text-gray-700 mb-4">
            We use the following types of cookies:
          </p>
          <table className="w-full border-collapse border border-gray-300 mb-4">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">Cookie Type</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Purpose</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Duration</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Essential</td>
                <td className="border border-gray-300 px-4 py-2">Basic site functionality</td>
                <td className="border border-gray-300 px-4 py-2">Session</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Analytics</td>
                <td className="border border-gray-300 px-4 py-2">Usage statistics and performance</td>
                <td className="border border-gray-300 px-4 py-2">2 years</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Advertising</td>
                <td className="border border-gray-300 px-4 py-2">Personalized ads</td>
                <td className="border border-gray-300 px-4 py-2">13 months</td>
              </tr>
            </tbody>
          </table>
          <p className="text-gray-700">
            You can control cookies through your browser settings. For more information, visit{' '}
            <a 
              href="https://www.allaboutcookies.org/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              All About Cookies
            </a>.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Google Analytics</h2>
          <p className="text-gray-700 mb-4">
            We use Google Analytics to understand how visitors interact with our website. Google Analytics collects:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Pages visited and time spent on each page</li>
            <li>Referring website and search terms</li>
            <li>Geographic location (country/city level)</li>
            <li>Device and browser type</li>
          </ul>
          <p className="text-gray-700 mt-4">
            You can opt out of Google Analytics by installing the{' '}
            <a 
              href="https://tools.google.com/dlpage/gaoptout" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Google Analytics Opt-out Browser Add-on
            </a>.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Data Security</h2>
          <p className="text-gray-700 mb-4">
            We implement appropriate security measures to protect your data:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>HTTPS encryption for all communications</li>
            <li>Regular security audits</li>
            <li>Limited access to personal data</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Your Rights</h2>
          <p className="text-gray-700 mb-4">
            You have the following rights regarding your data:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Right to access your personal data</li>
            <li>Right to rectify inaccurate data</li>
            <li>Right to delete your data</li>
            <li>Right to opt out of data collection</li>
            <li>Right to lodge a complaint with a supervisory authority</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Children&apos;s Privacy</h2>
          <p className="text-gray-700">
            This website is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Changes to This Policy</h2>
          <p className="text-gray-700">
            We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the &quot;Last updated&quot; date.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. Contact Us</h2>
          <p className="text-gray-700">
            If you have questions about this privacy policy, please contact us:
          </p>
          <ul className="list-none pl-0 space-y-2 text-gray-700 mt-4">
            <li>GitHub: <a 
              href="https://github.com/moonye6/openclaw101" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              github.com/moonye6/openclaw101
            </a></li>
          </ul>
        </section>
      </div>

      <div className="mt-12 pt-8 border-t border-gray-200">
        <p className="text-gray-600">
          <Link href="/" className="text-blue-600 hover:underline">
            ← Back to Home
          </Link>
        </p>
      </div>
    </div>
  )
}
