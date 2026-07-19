# Smart Multi-Agent Workflow Development Script (PowerShell)
# This script provides common development commands

param(
    [Parameter(Position=0)]
    [ValidateSet("start", "test", "test:watch", "test:cov", "lint", "lint:fix", "typecheck", "format", "build", "clean", "help")]
    [string]$Command = "help"
)

function Show-Help {
    Write-Host "Smart Multi-Agent Workflow Development Script" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Usage: .\scripts\dev.ps1 [command]" -ForegroundColor White
    Write-Host ""
    Write-Host "Commands:" -ForegroundColor Yellow
    Write-Host "  start       Start development server"
    Write-Host "  test        Run all tests"
    Write-Host "  test:watch  Run tests in watch mode"
    Write-Host "  test:cov    Run tests with coverage"
    Write-Host "  lint        Run linter"
    Write-Host "  lint:fix    Fix linting issues"
    Write-Host "  typecheck   Run type checking"
    Write-Host "  format      Format code with Prettier"
    Write-Host "  build       Build project"
    Write-Host "  clean       Clean build artifacts"
    Write-Host "  help        Show this help message"
    Write-Host ""
    Write-Host "Examples:" -ForegroundColor Yellow
    Write-Host "  .\scripts\dev.ps1 start"
    Write-Host "  .\scripts\dev.ps1 test"
    Write-Host "  .\scripts\dev.ps1 lint:fix"
}

switch ($Command) {
    "start" {
        Write-Host "Starting development server..." -ForegroundColor Yellow
        npm run dev
    }
    "test" {
        Write-Host "Running tests..." -ForegroundColor Yellow
        npm test
    }
    "test:watch" {
        Write-Host "Running tests in watch mode..." -ForegroundColor Yellow
        npm run test:watch
    }
    "test:cov" {
        Write-Host "Running tests with coverage..." -ForegroundColor Yellow
        npm run test:coverage
    }
    "lint" {
        Write-Host "Running linter..." -ForegroundColor Yellow
        npm run lint
    }
    "lint:fix" {
        Write-Host "Fixing linting issues..." -ForegroundColor Yellow
        npm run lint:fix
    }
    "typecheck" {
        Write-Host "Running type checking..." -ForegroundColor Yellow
        npm run typecheck
    }
    "format" {
        Write-Host "Formatting code..." -ForegroundColor Yellow
        npm run format
    }
    "build" {
        Write-Host "Building project..." -ForegroundColor Yellow
        npm run build
    }
    "clean" {
        Write-Host "Cleaning build artifacts..." -ForegroundColor Yellow
        npm run clean
    }
    default {
        Show-Help
    }
}