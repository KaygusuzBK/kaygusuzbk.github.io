# Portfolio Website - kaygusuzbk.github.io

Modern, minimal portfolio website built with Next.js, React, TypeScript, and Tailwind CSS.

🌐 **Live Site:** [https://kaygusuzbk.github.io](https://kaygusuzbk.github.io)

## ✨ Features

- 🎨 **Modern Design** - Clean, minimal black & white theme with smooth animations
- 🌓 **Theme Toggle** - Light/Dark mode with system preference detection
- 📱 **Responsive** - Fully responsive design with mobile-optimized dock navigation
- 🚀 **Performance** - Optimized with Next.js static export for GitHub Pages
- 🎭 **Animations** - Scroll-triggered animations using Framer Motion
- 📂 **GitHub Integration** - Automatically fetches and displays GitHub projects
- 📄 **Project Details** - Dynamic project detail pages with full information
- 💼 **CV Download** - Direct PDF download link for resume

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion
- **UI Components:** shadcn/ui (Radix UI)
- **Icons:** Lucide React
- **Deployment:** GitHub Pages

## 📦 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone https://github.com/kaygusuzbk/kaygusuzbk.github.io.git
cd kaygusuzbk.github.io
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Create `.env.local` file (optional, for GitHub API rate limits):
```env
NEXT_PUBLIC_GITHUB_USERNAME=kaygusuzbk
NEXT_PUBLIC_GITHUB_TOKEN=your_github_token_here
```

**Note:** For GitHub Pages deployment, use `NEXT_PUBLIC_` prefix for environment variables that need to be accessible in the browser.

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚀 Deployment to GitHub Pages

This project is configured for GitHub Pages deployment using static export.

### Manual Deployment

1. Build the static site:
```bash
npm run build
```

2. The `out` folder will contain all static files.

3. Push the `out` folder contents to the `gh-pages` branch, or use GitHub Actions (recommended).

### Automatic Deployment with GitHub Actions

The project includes a GitHub Actions workflow that automatically builds and deploys on every push to `main` branch.

1. Make sure your repository is named `kaygusuzbk.github.io` (or update the workflow file)
2. Push to `main` branch
3. GitHub Actions will automatically build and deploy to GitHub Pages

### GitHub Pages Settings

1. Go to your repository Settings → Pages
2. Source: Deploy from a branch
3. Branch: `gh-pages` (or the branch you're using)
4. Folder: `/ (root)`

## 📁 Project Structure

```
├── app/
│   ├── api/
│   │   └── github/
│   │       └── repos/
│   │           └── route.ts      # GitHub API route
│   ├── components/
│   │   ├── ui/                    # shadcn/ui components
│   │   └── MobileDock.tsx         # Mobile navigation dock
│   ├── projects/
│   │   └── [slug]/
│   │       └── page.tsx           # Dynamic project detail pages
│   ├── globals.css                # Global styles
│   ├── layout.tsx                 # Root layout
│   └── page.tsx                   # Home page
├── lib/
│   └── utils.ts                   # Utility functions
├── public/
│   └── BerkanKaygusuz.pdf         # CV/Resume
└── .github/
    └── workflows/
        └── deploy.yml              # GitHub Actions workflow
```

## 🎨 Customization

### Update Personal Information

Edit `app/page.tsx` to update:
- Name and title
- Location
- Bio/description
- Skills and capabilities
- Contact email

### Change Theme Colors

The theme uses Tailwind CSS classes. Update colors in component files:
- Light mode: `bg-white`, `text-black`
- Dark mode: `bg-black`, `text-white`

### Add/Remove Projects

Projects are automatically fetched from GitHub. To filter or customize:
- Edit `app/api/github/repos/route.ts`
- Modify the filtering logic in `app/page.tsx`

## 📝 Environment Variables

Create `.env.local` for optional configuration:

```env
NEXT_PUBLIC_GITHUB_USERNAME=kaygusuzbk    # Your GitHub username (public, accessible in browser)
NEXT_PUBLIC_GITHUB_TOKEN=your_token_here  # Optional: GitHub token for higher rate limits (public)
```

**Important:** For static export (GitHub Pages), all environment variables must use the `NEXT_PUBLIC_` prefix to be accessible in the browser.

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production (static export)
- `npm run start` - Start production server (not used for GitHub Pages)
- `npm run lint` - Run ESLint

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)

---

Built with ❤️ by [Berkan Kaygusuz](https://github.com/kaygusuzbk)
