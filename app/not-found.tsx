import { FaQuestionCircle } from 'react-icons/fa';
import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <div className="animate-pulse mb-6">
          <FaQuestionCircle className="text-6xl text-blue-500" />
        </div>

        <h1 className="text-5xl font-bold text-gray-800 mb-4">404 Not Found</h1>

        <p className="text-lg text-gray-600 mb-8">
          The page you are looking for does not  exist or has been moved.
        </p>

        <Link href="/" className="inline-block px-6 py-3 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition-transform transform hover:scale-105">
            Go Back to Home
        </Link>
      </div>
    </div>
  );
}
