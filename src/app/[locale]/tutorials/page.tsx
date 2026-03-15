import { Metadata } from 'next';
import { TutorialList } from '@/components/tutorials/TutorialList';

export const metadata: Metadata = {
  title: 'Tutorials - OpenClaw 101',
  description: 'Browse 409+ tutorials for OpenClaw AI assistant. Official docs, cloud deployment guides, getting started tutorials, and deep dives.',
};

export default function TutorialsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-white text-center">
            OpenClaw Tutorials
          </h1>
          <p className="mt-4 text-lg text-blue-100 text-center max-w-2xl mx-auto">
            409+ curated tutorials from official docs, cloud platforms, and community contributors
          </p>
          <div className="mt-8 flex justify-center gap-8 text-white">
            <div className="text-center">
              <div className="text-3xl font-bold">409+</div>
              <div className="text-sm text-blue-200">Tutorials</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">58</div>
              <div className="text-sm text-blue-200">Chinese</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">351</div>
              <div className="text-sm text-blue-200">English</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">9</div>
              <div className="text-sm text-blue-200">Categories</div>
            </div>
          </div>
        </div>
      </section>

      {/* Tutorial List */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <TutorialList />
        </div>
      </section>
    </div>
  );
}
