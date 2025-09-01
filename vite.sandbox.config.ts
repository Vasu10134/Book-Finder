import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Sandbox-specific configuration for CodeSandbox and StackBlitz
export default defineConfig({
  base: "/",
  server: {
    host: "0.0.0.0",
    port: 3000,
    strictPort: false,
    hmr: {
      port: 3000,
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    sourcemap: true,
    // Simplified build for sandbox environments
    rollupOptions: {
      output: {
        manualChunks: undefined, // Disable code splitting for better compatibility
      },
    },
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@tanstack/react-query',
      'lucide-react',
      'clsx',
      'tailwind-merge'
    ],
  },
  // Ensure all dependencies are pre-bundled
  ssr: {
    noExternal: ['@radix-ui/*', 'lucide-react']
  }
});
