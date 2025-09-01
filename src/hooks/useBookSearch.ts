import { useState, useCallback } from 'react';
import { Book, OpenLibraryResponse } from '@/types/book';

const ITEMS_PER_PAGE = 20;

export const useBookSearch = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [hasMorePages, setHasMorePages] = useState(false);
  const [currentQuery, setCurrentQuery] = useState('');

  const searchBooks = useCallback(async (query: string, page: number = 1, append: boolean = false) => {
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        title: query.trim(),
        page: page.toString(),
        limit: ITEMS_PER_PAGE.toString(),
      });

      const response = await fetch(`https://openlibrary.org/search.json?${params}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }

      const data: OpenLibraryResponse = await response.json();
      
      if (page === 1) {
        setBooks(data.docs || []);
        setCurrentPage(1);
      } else if (append) {
        setBooks(prev => [...prev, ...(data.docs || [])]);
        setCurrentPage(page);
      }

      setTotalResults(data.numFound);
      setHasMorePages(data.start + data.docs.length < data.numFound);
      setCurrentQuery(query.trim());
      setHasSearched(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong while searching for books.');
      if (page === 1) {
        setBooks([]);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadMoreBooks = useCallback(() => {
    if (hasMorePages && currentQuery && !isLoading) {
      searchBooks(currentQuery, currentPage + 1, true);
    }
  }, [hasMorePages, currentQuery, currentPage, isLoading, searchBooks]);

  const clearSearch = useCallback(() => {
    setBooks([]);
    setError(null);
    setHasSearched(false);
    setCurrentPage(1);
    setTotalResults(0);
    setHasMorePages(false);
    setCurrentQuery('');
  }, []);

  const retrySearch = useCallback(() => {
    if (currentQuery) {
      searchBooks(currentQuery, 1, false);
    }
  }, [currentQuery, searchBooks]);

  return {
    books,
    isLoading,
    error,
    hasSearched,
    currentPage,
    totalResults,
    hasMorePages,
    currentQuery,
    searchBooks,
    loadMoreBooks,
    clearSearch,
    retrySearch,
  };
};
