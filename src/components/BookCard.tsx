import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface BookCardProps {
  title: string;
  authors?: string[];
  firstPublishYear?: number;
  coverId?: number;
}

const BookCard = ({ title, authors, firstPublishYear, coverId }: BookCardProps) => {
  const [imageError, setImageError] = useState(false);
  
  const coverUrl = coverId && !imageError 
    ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
    : null;

  const displayAuthors = authors?.slice(0, 3).join(", ") || "Unknown Author";
  const truncatedTitle = title.length > 60 ? `${title.substring(0, 60)}...` : title;

  return (
    <Card className="group hover:shadow-hero transition-all duration-300 hover:-translate-y-1 bg-gradient-card border-border overflow-hidden">
      <CardContent className="p-0">
        <div className="aspect-[3/4] bg-book-neutral flex items-center justify-center overflow-hidden">
          {coverUrl ? (
            <img
              src={coverUrl}
              alt={`Cover of ${title}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={() => setImageError(true)}
              loading="lazy"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-muted-foreground p-4 text-center">
              <div className="w-16 h-16 bg-book-secondary rounded-lg flex items-center justify-center mb-2">
                📚
              </div>
              <span className="text-xs">No cover available</span>
            </div>
          )}
        </div>
        
        <div className="p-4 space-y-2">
          <h3 className="font-semibold text-foreground leading-tight line-clamp-2" title={title}>
            {truncatedTitle}
          </h3>
          
          <p className="text-sm text-muted-foreground line-clamp-1" title={displayAuthors}>
            {displayAuthors}
          </p>
          
          {firstPublishYear && (
            <p className="text-xs text-book-primary font-medium">
              First published: {firstPublishYear}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BookCard;