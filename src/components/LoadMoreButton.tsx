import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface LoadMoreButtonProps {
  onLoadMore: () => void;
  isLoading: boolean;
  hasMorePages: boolean;
  totalResults: number;
  currentCount: number;
}

const LoadMoreButton = ({ 
  onLoadMore, 
  isLoading, 
  hasMorePages, 
  totalResults, 
  currentCount 
}: LoadMoreButtonProps) => {
  if (!hasMorePages) return null;

  const remainingBooks = totalResults - currentCount;

  return (
    <div className="flex flex-col items-center py-8">
      <div className="text-center mb-4">
        <p className="text-muted-foreground">
          Showing {currentCount} of {totalResults} books
        </p>
        <p className="text-sm text-muted-foreground">
          {remainingBooks} more books available
        </p>
      </div>
      
      <Button
        onClick={onLoadMore}
        disabled={isLoading}
        className="bg-gradient-primary hover:opacity-90 shadow-hero transition-all duration-300 px-8 py-3"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Loading...
          </>
        ) : (
          `Load ${Math.min(20, remainingBooks)} More Books`
        )}
      </Button>
    </div>
  );
};

export default LoadMoreButton;
