import BookCard from "./BookCard";
import LoadMoreButton from "./LoadMoreButton";
import { Book } from "@/types/book";

interface BookListProps {
  books: Book[];
  onLoadMore: () => void;
  isLoading: boolean;
  hasMorePages: boolean;
  totalResults: number;
}

const BookList = ({ 
  books, 
  onLoadMore, 
  isLoading, 
  hasMorePages, 
  totalResults 
}: BookListProps) => {
  if (books.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      <div className="mb-6">
        <p className="text-muted-foreground">
          Found {totalResults} {totalResults === 1 ? 'book' : 'books'}
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {books.map((book) => (
          <div key={book.key} className="animate-fade-in">
            <BookCard
              title={book.title}
              authors={book.author_name}
              firstPublishYear={book.first_publish_year}
              coverId={book.cover_i}
            />
          </div>
        ))}
      </div>

      <LoadMoreButton
        onLoadMore={onLoadMore}
        isLoading={isLoading}
        hasMorePages={hasMorePages}
        totalResults={totalResults}
        currentCount={books.length}
      />
    </div>
  );
};

export default BookList;