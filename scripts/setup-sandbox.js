#!/usr/bin/env node

/**
 * Sandbox Setup Script
 * 
 * This script helps set up the Book Finder app in CodeSandbox or StackBlitz
 * by copying the necessary configuration files and updating settings.
 */

const fs = require('fs');
const path = require('path');

function log(message, type = 'info') {
  const colors = {
    info: '\x1b[36m',    // Cyan
    success: '\x1b[32m', // Green
    error: '\x1b[31m',   // Red
    warning: '\x1b[33m'  // Yellow
  };
  
  console.log(`${colors[type]}${message}\x1b[0m`);
}

function copyFile(source, destination) {
  try {
    if (fs.existsSync(source)) {
      fs.copyFileSync(source, destination);
      log(`✅ Copied ${source} to ${destination}`, 'success');
      return true;
    } else {
      log(`⚠️  Source file not found: ${source}`, 'warning');
      return false;
    }
  } catch (error) {
    log(`❌ Failed to copy ${source}: ${error.message}`, 'error');
    return false;
  }
}

function updatePackageJson() {
  try {
    const packagePath = path.join(process.cwd(), 'package.json');
    
    if (!fs.existsSync(packagePath)) {
      log('❌ package.json not found in current directory', 'error');
      return false;
    }
    
    const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    
    // Update scripts for sandbox
    packageJson.scripts = {
      ...packageJson.scripts,
      "dev": "vite --config vite.sandbox.config.ts",
      "start": "vite --config vite.sandbox.config.ts",
      "build": "vite build --config vite.sandbox.config.ts"
    };
    
    // Write updated package.json
    fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));
    log('✅ Updated package.json for sandbox environment', 'success');
    return true;
  } catch (error) {
    log(`❌ Failed to update package.json: ${error.message}`, 'error');
    return false;
  }
}

function createSandboxConfig() {
  const configContent = `import { defineConfig } from "vite";
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
    rollupOptions: {
      output: {
        manualChunks: undefined,
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
  ssr: {
    noExternal: ['@radix-ui/*', 'lucide-react']
  }
});
`;

  try {
    fs.writeFileSync('vite.sandbox.config.ts', configContent);
    log('✅ Created vite.sandbox.config.ts', 'success');
    return true;
  } catch (error) {
    log(`❌ Failed to create vite.sandbox.config.ts: ${error.message}`, 'error');
    return false;
  }
}

function main() {
  log('🏖️  Book Finder Sandbox Setup', 'info');
  log('Setting up configuration for CodeSandbox/StackBlitz...', 'info');
  log('');

  let success = true;

  // Copy configuration files
  const filesToCopy = [
    ['tailwind.config.ts', 'tailwind.config.ts'],
    ['postcss.config.js', 'postcss.config.js'],
    ['tsconfig.json', 'tsconfig.json'],
    ['index.html', 'index.html']
  ];

  filesToCopy.forEach(([source, dest]) => {
    if (!copyFile(source, dest)) {
      success = false;
    }
  });

  // Create sandbox config
  if (!createSandboxConfig()) {
    success = false;
  }

  // Update package.json
  if (!updatePackageJson()) {
    success = false;
  }

  log('');
  
  if (success) {
    log('🎉 Sandbox setup completed successfully!', 'success');
    log('');
    log('📋 Next steps:', 'info');
    log('1. Install dependencies: npm install', 'info');
    log('2. Start development: npm run dev', 'info');
    log('3. Open the preview in your sandbox', 'info');
  } else {
    log('❌ Some setup steps failed. Please check the errors above.', 'error');
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { copyFile, updatePackageJson, createSandboxConfig };
