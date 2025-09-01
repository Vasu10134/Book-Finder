import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  onClear: () => void;
  isLoading?: boolean;
  hasResults?: boolean;
  resetInput?: boolean;
}

const SearchBar = ({ onSearch, onClear, isLoading, hasResults, resetInput }: SearchBarProps) => {
  const [query, setQuery] = useState("");

  // Reset input when resetInput prop changes (new search)
  useEffect(() => {
    if (resetInput) {
      setQuery("");
    }
  }, [resetInput]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleClear = () => {
    setQuery("");
    onClear();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Search for books by title..."
            value={query}
            onChange={handleInputChange}
            className="pl-10 h-12 bg-card border-border focus:ring-book-primary focus:border-book-primary"
            disabled={isLoading}
          />
        </div>
        <Button 
          type="submit" 
          disabled={!query.trim() || isLoading}
          className="h-12 px-6 bg-gradient-primary hover:opacity-90 shadow-hero transition-all duration-300"
        >
          {isLoading ? (
            <div className="animate-spin h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full" />
          ) : (
            "Search"
          )}
        </Button>
        {hasResults && (
          <Button
            type="button"
            variant="outline"
            onClick={handleClear}
            className="h-12 px-4 border-border hover:bg-secondary"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </form>
    </div>
  );
};

export default SearchBar;