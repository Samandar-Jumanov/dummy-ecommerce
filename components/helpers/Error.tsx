export default function ErrorPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <div className="mt-8 animate-bounce mb-6">
        <h1 className="text-5xl font-bold text-red-600 mb-4">Error!</h1>
        </div>

        <p className="text-lg text-gray-700 mb-8">
          An unexpected error occurred. Please try again later.
        </p>

      </div>
    </div>
  );
}
