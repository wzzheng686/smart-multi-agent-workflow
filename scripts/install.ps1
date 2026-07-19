# Smart Multi-Agent Workflow Installation Script (PowerShell)
# This script installs dependencies and sets up the development environment

$ErrorActionPreference = "Stop"

Write-Host "=== Smart Multi-Agent Workflow Installation ===" -ForegroundColor Cyan
Write-Host ""

# Check Node.js version
Write-Host "Checking Node.js version..." -ForegroundColor Yellow
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "Error: Node.js is not installed" -ForegroundColor Red
    Write-Host "Please install Node.js 18.0.0 or higher"
    exit 1
}

$nodeVersion = (node -v).TrimStart('v').Split('.')[0]
if ([int]$nodeVersion -lt 18) {
    Write-Host "Error: Node.js version 18.0.0 or higher is required" -ForegroundColor Red
    Write-Host "Current version: $(node -v)"
    exit 1
}

Write-Host "Node.js version: $(node -v)" -ForegroundColor Green

# Check npm version
Write-Host ""
Write-Host "Checking npm version..." -ForegroundColor Yellow
if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
    Write-Host "Error: npm is not installed" -ForegroundColor Red
    exit 1
}

Write-Host "npm version: $(npm -v)" -ForegroundColor Green

# Install dependencies
Write-Host ""
Write-Host "Installing dependencies..." -ForegroundColor Yellow
npm install

# Run type check
Write-Host ""
Write-Host "Running type check..." -ForegroundColor Yellow
npm run typecheck

# Run linter
Write-Host ""
Write-Host "Running linter..." -ForegroundColor Yellow
npm run lint

# Run tests
Write-Host ""
Write-Host "Running tests..." -ForegroundColor Yellow
npm test

# Build project
Write-Host ""
Write-Host "Building project..." -ForegroundColor Yellow
npm run build

Write-Host ""
Write-Host "=== Installation Complete ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor White
Write-Host "  1. Run 'npm run dev' to start development"
Write-Host "  2. Run 'npm test' to run tests"
Write-Host "  3. Run 'npm run build' to build for production"
Write-Host ""
Write-Host "For more information, see README.md or README_CN.md"