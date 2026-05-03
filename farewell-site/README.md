# 🎬 Forever In Our Hearts — Cinematic Farewell Website

A premium, cinematic farewell memory website built with React (Vite), Tailwind CSS, and GSAP.

---

## ✨ Features

- **Cinematic Preloader** — Fullscreen animated loader with progress counter
- **Hero Section** — Autoplay video background with GSAP title animation
- **Memory Text** — Emotional line-by-line scroll reveal with blur transitions
- **Photo Gallery** — Responsive masonry grid with lightbox modal
- **Video Gallery** — YouTube embed modal with hover lift effects
- **Tributes** — Team cards with grayscale-to-color image hover
- **Quotes Carousel** — Auto-rotating quotes with smooth transitions
- **Music Player** — Background ambience toggle with pulse rings
- **Custom Cursor** — Gold dot cursor with follower circle
- **Glass Navbar** — Sticky with scroll-aware transparency
- **Smooth Scrolling** — Lenis smooth scroll integrated with GSAP ScrollTrigger

---

## 🧱 Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── Preloader.jsx
│   ├── Navbar.jsx
│   ├── MusicPlayer.jsx
│   ├── Lightbox.jsx
│   ├── VideoModal.jsx
│   └── SkeletonGrid.jsx
├── sections/          # Page sections
│   ├── HeroSection.jsx
│   ├── MemoriesSection.jsx
│   ├── GallerySection.jsx
│   ├── VideoSection.jsx
│   ├── TributesSection.jsx
│   ├── QuotesSection.jsx
│   └── FooterSection.jsx
├── hooks/             # Custom hooks
│   ├── useLenis.js    # Smooth scroll
│   └── useCursor.js   # Custom cursor
├── data/
│   └── content.json   # ← Edit all content here
├── App.jsx
├── main.jsx
└── index.css
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Install & Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 🎨 Customizing Content

All website content is in **`src/data/content.json`**. Edit it to personalize:

```json
{
  "site": {
    "title": "Your Title Here",
    "batch": "Class of 2024",
    "institution": "Your School"
  },
  "photos": [
    { "src": "your-image-url.jpg", "caption": "Caption", "category": "tag" }
  ],
  "videos": [
    { "youtubeId": "VIDEO_ID", "title": "Title", "thumbnail": "thumb.jpg" }
  ],
  "team": [...],
  "quotes": [...],
  "music": { "url": "your-audio.mp3" }
}
```

### Adding Your Own Photos
Replace the Unsplash URLs with your own image paths. Place images in `public/images/` and reference as `/images/photo.jpg`.

---

## 🌐 Deploying to Vercel

### Method 1: Vercel CLI

```bash
npm i -g vercel
vercel
```

### Method 2: Vercel Dashboard

1. Push your project to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your repository
4. Framework: **Vite**
5. Build command: `npm run build`
6. Output directory: `dist`
7. Click **Deploy**

---

## 🎭 Design System

| Token | Value |
|-------|-------|
| Primary | `#000000` |
| Accent | `#d4af37` (Gold) |
| Text | `#ffffff` |
| Glass | `rgba(255,255,255,0.04)` |
| Font Display | Playfair Display |
| Font Body | Cormorant Garamond |
| Font Mono | DM Mono |

---

## 📦 Dependencies

| Package | Purpose |
|---------|---------|
| `gsap` | Animations & ScrollTrigger |
| `lenis` | Smooth scrolling |
| `react` | UI framework |
| `tailwindcss` | Utility CSS |

---

Built with ❤️ — a farewell worth remembering.
