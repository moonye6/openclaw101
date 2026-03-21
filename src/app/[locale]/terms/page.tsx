import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service | OpenClaw 101',
  description: 'Terms of service for OpenClaw 101 - Learn about the rules and guidelines for using our website.',
}

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
      
      <p className="text-gray-600 mb-8">
        Last updated: March 21, 2026
      </p>

      <div className="prose prose-lg max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
          <p className="text-gray-700 mb-4">
            By accessing and using OpenClaw 101 (&quot;the Website&quot;), you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Website.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
          <p className="text-gray-700 mb-4">
            OpenClaw 101 is an educational website that provides tutorials, guides, and resources about OpenClaw, an AI agent platform. The Website offers:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>7-day learning path for OpenClaw</li>
            <li>Tutorial links and resources</li>
            <li>Skill recommendations and categories</li>
            <li>Blog posts about AI agents and OpenClaw</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Use License</h2>
          <p className="text-gray-700 mb-4">
            Permission is granted to temporarily view the materials on OpenClaw 101 for personal, non-commercial use only. This is the grant of a license, not a transfer of title, and under this license you may not:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Modify or copy the materials</li>
            <li>Use the materials for any commercial purpose</li>
            <li>Attempt to decompile or reverse engineer any software on the Website</li>
            <li>Remove any copyright or proprietary notations</li>
            <li>Transfer the materials to another person or &quot;mirror&quot; the materials on any other server</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. User Responsibilities</h2>
          <p className="text-gray-700 mb-4">
            When using the Website, you agree to:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Use the Website only for lawful purposes</li>
            <li>Not attempt to gain unauthorized access to any portion of the Website</li>
            <li>Not use automated systems to access the Website in a manner that sends more requests than a human can reasonably produce</li>
            <li>Not interfere with or disrupt the Website or servers or networks connected to the Website</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Third-Party Links</h2>
          <p className="text-gray-700 mb-4">
            The Website contains links to third-party websites. These links are provided for your convenience only. We have no control over the contents of those sites and accept no responsibility for them or for any loss or damage that may arise from your use of them.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Disclaimer</h2>
          <p className="text-gray-700 mb-4">
            The materials on OpenClaw 101 are provided on an &apos;as is&apos; basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property.
          </p>
          <p className="text-gray-700">
            We do not warrant that the Website will be available at all times, that it will be error-free, or that defects will be corrected.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Limitations</h2>
          <p className="text-gray-700 mb-4">
            In no event shall OpenClaw 101 or its operators be liable for any damages arising out of the use or inability to use the materials on the Website, even if we have been notified of the possibility of such damage.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Accuracy of Materials</h2>
          <p className="text-gray-700 mb-4">
            The materials appearing on the Website could include technical, typographical, or photographic errors. We do not warrant that any of the materials are accurate, complete, or current. We may make changes to the materials at any time without notice.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. Revisions</h2>
          <p className="text-gray-700 mb-4">
            The materials on the Website may be out of date, and we make no commitment to update such materials. We may revise these Terms of Service at any time without notice. By using the Website, you agree to be bound by the current version of these Terms of Service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">10. Intellectual Property</h2>
          <p className="text-gray-700 mb-4">
            The Website and its original content, features, and functionality are owned by OpenClaw 101 and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
          </p>
          <p className="text-gray-700">
            OpenClaw® is a trademark. All rights reserved.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">11. Privacy</h2>
          <p className="text-gray-700">
            Your use of the Website is also governed by our{' '}
            <Link href="/privacy" className="text-blue-600 hover:underline">
              Privacy Policy
            </Link>. Please review our Privacy Policy, which also governs the Website and informs users of our data collection practices.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">12. Governing Law</h2>
          <p className="text-gray-700 mb-4">
            These Terms of Service shall be governed by and construed in accordance with the laws of the jurisdiction in which the Website operators are located, without regard to its conflict of law provisions.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">13. Contact Us</h2>
          <p className="text-gray-700">
            If you have any questions about these Terms of Service, please contact us:
          </p>
          <ul className="list-none pl-0 space-y-2 text-gray-700 mt-4">
            <li>Email: legal@openclaw101.com</li>
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
