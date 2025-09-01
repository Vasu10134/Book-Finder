const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-book-secondary border-t-book-primary rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-b-book-accent rounded-full animate-spin animation-delay-150"></div>
      </div>
      <p className="mt-4 text-muted-foreground animate-pulse">
        Searching for books...
      </p>
    </div>
  );
};

export default Loader;