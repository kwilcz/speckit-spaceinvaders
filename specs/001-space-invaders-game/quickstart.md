# Quickstart Guide

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Git for version control

## Project Setup

1. **Clone the repository** (if not already done):
   ```bash
   git clone <repository-url>
   cd speckit-spaceinvaders
   ```

2. **Checkout the feature branch**:
   ```bash
   git checkout 001-space-invaders-game
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Start development server**:
   ```bash
   npm run dev
   ```
   Open http://localhost:5173 in your browser.

## Development Workflow

- **Code changes**: Edit files in `src/` directory
- **Assets**: Place images in `public/assets/`
- **Testing**: Open the app and playtest manually
- **Build**: Run `npm run build` to create production bundle

## Deployment

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Deploy to GitHub Pages**:
   ```bash
   npm run deploy
   ```
   This uses gh-pages to push the `dist/` folder to the `gh-pages` branch.

3. **Verify deployment**: Visit the GitHub Pages URL for your repository.

## Game Controls

- **Arrow Keys** or **A/D**: Move ship left/right
- **Spacebar** or **Up Arrow**: Shoot projectiles
- **Game starts automatically** after start screen
- **Restart** available on game over screen

## Troubleshooting

- **Build fails**: Ensure Node.js version is 18+
- **Assets not loading**: Check paths in `public/assets/`
- **Performance issues**: Monitor browser dev tools for frame drops
- **Deployment issues**: Ensure `gh-pages` package is installed and repository has GitHub Pages enabled</content>
<parameter name="filePath">/workspaces/speckit-spaceinvaders/specs/001-space-invaders-game/quickstart.md