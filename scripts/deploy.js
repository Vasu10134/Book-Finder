#!/usr/bin/env node

/**
 * Deployment Helper Script
 * 
 * Usage:
 *   node scripts/deploy.js [platform]
 * 
 * Platforms:
 *   github  - Build for GitHub Pages
 *   netlify - Build for Netlify
 *   vercel  - Build for Vercel
 *   custom  - Build with custom base path
 */

const { execSync } = require('child_process');
const path = require('path');

const platforms = {
  github: {
    basePath: '/Book-Finder/',
    command: 'npm run build:github',
    description: 'GitHub Pages'
  },
  netlify: {
    basePath: '/',
    command: 'npm run build:netlify',
    description: 'Netlify'
  },
  vercel: {
    basePath: '/',
    command: 'npm run build',
    description: 'Vercel'
  },
  custom: {
    basePath: process.env.BASE_PATH || '/',
    command: 'npm run build',
    description: 'Custom platform'
  }
};

function log(message, type = 'info') {
  const colors = {
    info: '\x1b[36m',    // Cyan
    success: '\x1b[32m', // Green
    error: '\x1b[31m',   // Red
    warning: '\x1b[33m'  // Yellow
  };
  
  console.log(`${colors[type]}${message}\x1b[0m`);
}

function runCommand(command, description) {
  try {
    log(`🔄 ${description}...`, 'info');
    execSync(command, { stdio: 'inherit' });
    log(`✅ ${description} completed successfully!`, 'success');
    return true;
  } catch (error) {
    log(`❌ ${description} failed!`, 'error');
    log(error.message, 'error');
    return false;
  }
}

function main() {
  const platform = process.argv[2] || 'custom';
  
  if (!platforms[platform]) {
    log('❌ Invalid platform specified!', 'error');
    log('Available platforms:', 'info');
    Object.keys(platforms).forEach(p => {
      log(`  - ${p}: ${platforms[p].description}`, 'info');
    });
    process.exit(1);
  }

  const config = platforms[platform];
  
  log('🚀 Book Finder Deployment Helper', 'info');
  log(`📦 Platform: ${config.description}`, 'info');
  log(`🔗 Base Path: ${config.basePath}`, 'info');
  log('');

  // Set environment variable for custom base path
  if (platform === 'custom') {
    process.env.BASE_PATH = config.basePath;
  }

  // Run the build command
  const success = runCommand(config.command, 'Building application');
  
  if (success) {
    log('');
    log('🎉 Build completed successfully!', 'success');
    log('📁 Output directory: dist/', 'info');
    log('');
    
    if (platform === 'github') {
      log('📋 Next steps for GitHub Pages:', 'info');
      log('1. Push your changes to GitHub', 'info');
      log('2. Enable GitHub Pages in repository settings', 'info');
      log('3. Set source to "GitHub Actions"', 'info');
    } else if (platform === 'netlify') {
      log('📋 Next steps for Netlify:', 'info');
      log('1. Drag and drop the dist/ folder to Netlify', 'info');
      log('2. Or connect your repository for automatic deployment', 'info');
    } else if (platform === 'vercel') {
      log('📋 Next steps for Vercel:', 'info');
      log('1. Import your repository to Vercel', 'info');
      log('2. Set framework preset to Vite', 'info');
      log('3. Deploy automatically', 'info');
    }
  } else {
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { platforms, runCommand };
