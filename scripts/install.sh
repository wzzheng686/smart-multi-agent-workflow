#!/bin/bash

# Smart Multi-Agent Workflow Installation Script
# This script installs dependencies and sets up the development environment

set -e

echo "=== Smart Multi-Agent Workflow Installation ==="
echo ""

# Check Node.js version
echo "Checking Node.js version..."
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed"
    echo "Please install Node.js 18.0.0 or higher"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "Error: Node.js version 18.0.0 or higher is required"
    echo "Current version: $(node -v)"
    exit 1
fi

echo "Node.js version: $(node -v) ✓"

# Check npm version
echo ""
echo "Checking npm version..."
if ! command -v npm &> /dev/null; then
    echo "Error: npm is not installed"
    exit 1
fi

echo "npm version: $(npm -v) ✓"

# Install dependencies
echo ""
echo "Installing dependencies..."
npm install

# Run type check
echo ""
echo "Running type check..."
npm run typecheck

# Run linter
echo ""
echo "Running linter..."
npm run lint

# Run tests
echo ""
echo "Running tests..."
npm test

# Build project
echo ""
echo "Building project..."
npm run build

echo ""
echo "=== Installation Complete ==="
echo ""
echo "Next steps:"
echo "  1. Run 'npm run dev' to start development"
echo "  2. Run 'npm test' to run tests"
echo "  3. Run 'npm run build' to build for production"
echo ""
echo "For more information, see README.md or README_CN.md"