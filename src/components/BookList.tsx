import BookCard from "./BookCard";

interface Book {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
}

interface BookListProps {
  books: Book[];
}

const BookList = ({ books }: BookListProps) => {
  if (books.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      <div className="mb-6">
        <p className="text-muted-foreground">
          Found {books.length} {books.length === 1 ? 'book' : 'books'}
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
    </div>
  );
};

export default BookList;