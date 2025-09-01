export default function SnippetLoadingPage() {
  return (
    <div className="flex items-center justify-center h-full px-10 py-24">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mr-3"></div>
      <span className="text-lg font-medium text-gray-300">Loading snippet...</span>
    </div>
  );
}
