import Link from 'next/link';

export default function RootNotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 bg-[#0B0F19]">
      <div className="text-center max-w-md">
        <div className="text-8xl font-bold text-white/20 mb-4">404</div>
        <h1 className="text-2xl font-bold text-white mb-2">Page Not Found</h1>
        <p className="text-[#9CA3AF] mb-8">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 bg-brand text-white rounded-lg hover:bg-brand/90 transition-colors font-medium"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
