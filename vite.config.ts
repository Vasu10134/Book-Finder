import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Get base path from environment variable or use default
const BASE_PATH = process.env.BASE_PATH || "/";

export default defineConfig(({ mode }) => ({
  base: BASE_PATH,
  server: {
    host: "::",
    port: 8080,
    strictPort: false,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    sourcemap: mode === "development",
  },
}));
