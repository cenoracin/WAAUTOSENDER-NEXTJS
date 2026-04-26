export default function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-light flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-300 border-t-primary mb-4"></div>
        </div>
        <p className="text-gray-600 font-semibold">Loading...</p>
      </div>
    </div>
  )
}
