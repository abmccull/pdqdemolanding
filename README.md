# PDQ Demo Landing Page

A modern, responsive landing page built with React, TypeScript, and Vite.

## Features

- ⚡ Fast development with Vite
- 🎨 Beautiful, modern UI with gradient designs
- 📱 Fully responsive for all devices
- ♿ Accessible components
- 🎯 Type-safe with TypeScript
- 🚀 Optimized production builds

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/abmccull/pdqdemolanding.git
cd pdqdemolanding
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

## Project Structure

```
pdqdemolanding/
├── src/
│   ├── components/
│   │   ├── Hero.tsx          # Hero section component
│   │   ├── Hero.css
│   │   ├── Features.tsx      # Features grid component
│   │   ├── Features.css
│   │   ├── CallToAction.tsx  # CTA section with email form
│   │   ├── CallToAction.css
│   │   ├── Footer.tsx        # Footer component
│   │   └── Footer.css
│   ├── App.tsx              # Main app component
│   ├── App.css
│   ├── main.tsx             # Application entry point
│   └── index.css            # Global styles
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Customization

### Colors

Edit the CSS variables in `src/index.css` to customize the color scheme:

```css
:root {
  --primary-color: #6366f1;
  --primary-dark: #4f46e5;
  --secondary-color: #8b5cf6;
  /* ... more colors */
}
```

### Content

Update the content in the component files:
- Hero section: `src/components/Hero.tsx`
- Features: `src/components/Features.tsx`
- Call to Action: `src/components/CallToAction.tsx`
- Footer: `src/components/Footer.tsx`

## Deployment

### Build for Production

```bash
npm run build
```

The build output will be in the `dist/` directory.

### Deploy to GitHub Pages

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Add to `package.json`:
```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

3. Update `vite.config.ts`:
```typescript
export default defineConfig({
  plugins: [react()],
  base: '/pdqdemolanding/'
})
```

4. Deploy:
```bash
npm run deploy
```

## Technologies Used

- [React](https://react.dev/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Vite](https://vitejs.dev/) - Build tool
- [CSS3](https://developer.mozilla.org/en-US/docs/Web/CSS) - Styling

## License

MIT License - feel free to use this project for your own purposes.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

