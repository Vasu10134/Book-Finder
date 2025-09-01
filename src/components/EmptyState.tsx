import { BookOpen } from "lucide-react";

interface EmptyStateProps {
  message?: string;
  showIcon?: boolean;
}

const EmptyState = ({ 
  message = "No books found for your search.", 
  showIcon = true 
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      {showIcon && (
        <div className="w-20 h-20 bg-book-secondary rounded-full flex items-center justify-center mb-6">
          <BookOpen className="w-10 h-10 text-book-primary" />
        </div>
      )}
      
      <h3 className="text-xl font-semibold text-foreground mb-2">
        No Results Found
      </h3>
      
      <p className="text-muted-foreground max-w-md">
        {message}
      </p>
      
      <p className="text-sm text-muted-foreground mt-2">
        Try searching with different keywords or check your spelling.
      </p>
    </div>
  );
};

export default EmptyState;