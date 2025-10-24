git clone https://github.com/Vasu10134/Book-Finder.git
   cd Book-Finder
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   bun install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080`

## 📖 How It Works

### **Search Functionality**
1. **Type a book title** in the search bar
2. **Get instant results** from Open Library database
3. **Browse through books** with cover images and details
4. **Load more results** with pagination
5. **View book details** including author, publication year, and more

### **API Integration**
- **Open Library Search API** - Free, comprehensive book database
- **Real-time search** with debounced input
- **Error handling** with retry mechanisms
- **Caching** for improved performance

### **User Experience**
- **Loading states** with beautiful animations
- **Error handling** with user-friendly messages
- **Empty states** with helpful guidance
- **Responsive design** for all screen sizes

## 📁 Project Structure