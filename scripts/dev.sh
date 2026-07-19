#!/bin/bash

# Smart Multi-Agent Workflow Development Script
# This script provides common development commands

set -e

show_help() {
    echo "Smart Multi-Agent Workflow Development Script"
    echo ""
    echo "Usage: ./scripts/dev.sh [command]"
    echo ""
    echo "Commands:"
    echo "  start       Start development server"
    echo "  test        Run all tests"
    echo "  test:watch  Run tests in watch mode"
    echo "  test:cov    Run tests with coverage"
    echo "  lint        Run linter"
    echo "  lint:fix    Fix linting issues"
    echo "  typecheck   Run type checking"
    echo "  format      Format code with Prettier"
    echo "  build       Build project"
    echo "  clean       Clean build artifacts"
    echo "  help        Show this help message"
    echo ""
    echo "Examples:"
    echo "  ./scripts/dev.sh start"
    echo "  ./scripts/dev.sh test"
    echo "  ./scripts/dev.sh lint:fix"
}

case "${1:-help}" in
    start)
        echo "Starting development server..."
        npm run dev
        ;;
    test)
        echo "Running tests..."
        npm test
        ;;
    test:watch)
        echo "Running tests in watch mode..."
        npm run test:watch
        ;;
    test:cov)
        echo "Running tests with coverage..."
        npm run test:coverage
        ;;
    lint)
        echo "Running linter..."
        npm run lint
        ;;
    lint:fix)
        echo "Fixing linting issues..."
        npm run lint:fix
        ;;
    typecheck)
        echo "Running type checking..."
        npm run typecheck
        ;;
    format)
        echo "Formatting code..."
        npm run format
        ;;
    build)
        echo "Building project..."
        npm run build
        ;;
    clean)
        echo "Cleaning build artifacts..."
        npm run clean
        ;;
    help|*)
        show_help
        ;;
esac