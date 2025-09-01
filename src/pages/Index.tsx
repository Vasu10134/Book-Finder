import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import BookList from "@/components/BookList";
import Loader from "@/components/Loader";
import ErrorMessage from "@/components/ErrorMessage";
import EmptyState from "@/components/EmptyState";

interface Book {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
}

const Index = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?title=${encodeURIComponent(query)}&limit=20`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }

      const data = await response.json();
      setBooks(data.docs || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong while searching for books.');
      setBooks([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setBooks([]);
    setError(null);
    setHasSearched(false);
  };

  const handleRetry = () => {
    setError(null);
    // You could store the last query and retry it here
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-hero shadow-hero">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              📚 Book Finder
            </h1>
            <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
              Discover your next great read from millions of books in the Open Library
            </p>
          </div>

          <SearchBar
            onSearch={handleSearch}
            onClear={handleClear}
            isLoading={isLoading}
            hasResults={books.length > 0 || hasSearched}
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {isLoading && <Loader />}
        
        {error && (
          <ErrorMessage message={error} onRetry={handleRetry} />
        )}
        
        {!isLoading && !error && hasSearched && books.length === 0 && (
          <EmptyState />
        )}
        
        {!isLoading && !error && books.length > 0 && (
          <BookList books={books} />
        )}
        
        {!hasSearched && !isLoading && (
          <div className="text-center py-16">
            <div className="max-w-2xl mx-auto">
              <div className="w-24 h-24 bg-book-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                📖
              </div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Ready to find your next book?
              </h2>
              <p className="text-muted-foreground">
                Search through millions of books and discover new titles, authors, and genres. 
                Start by typing a book title in the search box above.
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-secondary border-t border-border">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-muted-foreground">
            <p>
              Powered by{" "}
              <a
                href="https://openlibrary.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-book-primary hover:underline"
              >
                Open Library
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;