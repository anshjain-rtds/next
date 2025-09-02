export default function PostLoadingPage() {
  return (
    <div className="container mx-auto px-10 py-24 max-w-4xl">
      <div className="animate-pulse">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="h-8 bg-muted rounded w-48 mb-2"></div>
            <div className="h-4 bg-muted rounded w-32"></div>
          </div>
          <div className="flex gap-2">
            <div className="h-8 w-20 bg-muted rounded"></div>
            <div className="h-8 w-20 bg-muted rounded"></div>
          </div>
        </div>
        
        <div className="bg-card rounded-xl shadow-lg border border-border overflow-hidden mb-6">
          <div className="border-b border-border bg-muted/50 px-6 py-4">
            <div className="h-6 bg-muted rounded w-3/4"></div>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              <div className="h-4 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded w-5/6"></div>
              <div className="h-4 bg-muted rounded w-4/6"></div>
            </div>
          </div>
        </div>
        
        <div className="bg-card rounded-xl shadow-lg p-6 border border-border mb-6">
          <div className="h-6 bg-muted rounded w-32 mb-4"></div>
          <div className="space-y-4">
            <div className="h-20 bg-muted/50 rounded-lg"></div>
          </div>
        </div>
        
        <div className="bg-card rounded-xl shadow-lg p-6 border border-border">
          <div className="h-6 bg-muted rounded w-32 mb-4"></div>
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="h-24 bg-muted/50 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}