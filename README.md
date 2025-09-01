# 📚 Book Finder

A modern React + TypeScript + Tailwind CSS application for discovering books using the Open Library Search API.

## ✨ Features

- **🔍 Book Search**: Search for books by title using the Open Library API
- **📱 Responsive Design**: Beautiful, mobile-first UI built with Tailwind CSS
- **⚡ Real-time Results**: Instant search results with loading states
- **📄 Pagination**: Load more books with a "Load More" button
- **🖼️ Book Covers**: Display book covers from Open Library (with fallback placeholders)
- **📊 Book Details**: Show title, authors, and publication year
- **🔄 Error Handling**: Graceful error handling with retry functionality
- **🎨 Modern UI**: Built with shadcn/ui components and custom design system

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Book-Finder
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🏗️ Architecture

### Components

- **`SearchBar`**: Handles user input and search submission
- **`BookList`**: Displays books in a responsive grid with pagination
- **`BookCard`**: Individual book display with cover image and details
- **`Loader`**: Loading spinner during API calls
- **`ErrorMessage`**: Error display with retry functionality
- **`EmptyState`**: No results found state
- **`LoadMoreButton`**: Pagination button for loading additional results

### Hooks

- **`useBookSearch`**: Custom hook managing book search state and API calls

### API Integration

The app integrates with the [Open Library Search API](https://openlibrary.org/developers/api):

- **Endpoint**: `https://openlibrary.org/search.json?title={query}&page={page}&limit={limit}`
- **Cover Images**: `https://covers.openlibrary.org/b/id/{cover_i}-M.jpg`
- **Pagination**: Supports page-based loading with 20 items per page

### State Management

- Uses React hooks (`useState`, `useCallback`) for local state
- Manages search results, loading states, errors, and pagination
- Resets state appropriately when new searches are initiated

## 🎨 Design System

Built with a custom design system using Tailwind CSS:

- **Colors**: HSL-based color palette with light/dark mode support
- **Gradients**: Custom gradient definitions for buttons and cards
- **Shadows**: Consistent shadow system for depth
- **Animations**: Smooth transitions and fade-in effects
- **Typography**: Responsive text sizing and spacing

## 📱 Responsive Features

- Mobile-first design approach
- Responsive grid layout (1-4 columns based on screen size)
- Touch-friendly interface elements
- Optimized for all device sizes

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **State Management**: React Hooks
- **API**: Fetch API with Open Library

## 📄 API Response Structure

```typescript
interface OpenLibraryResponse {
  numFound: number;      // Total number of results
  start: number;         // Starting index of current page
  docs: Book[];          // Array of book objects
}

interface Book {
  key: string;           // Unique book identifier
  title: string;         // Book title
  author_name?: string[]; // Array of author names
  first_publish_year?: number; // Publication year
  cover_i?: number;      // Cover image ID
}
```

## 🚀 Deployment

The app can be deployed to any static hosting service:

1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting service

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Open Library](https://openlibrary.org/) for providing the free book search API
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
