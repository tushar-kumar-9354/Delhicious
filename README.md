# 🍕 Delhicious Pizza Corner

[![React Version](https://img.shields.io/badge/react-v19.0-blue.svg)](https://react.dev/)
[![Vite Version](https://img.shields.io/badge/vite-v6.0-purple.svg)](https://vite.dev/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](#)

Welcome to **Delhicious Pizza Corner**, a premium, high-performance single-page web application built for a 100% vegetarian pizza outlet located in Chattarpur, New Delhi. This project features state-of-the-art UI elements, fluid layouts, responsive grid behaviors, and a highly interactive media loader.

---

## ✨ Features

### 🟢 100% Vegetarian Compliance
- A fully vegetarian menu consisting of handcrafted pizzas, garlic bread, burgers, mocktails, and combo meals.
- High-quality, appetizing, and relevant food photography representing each item.
- Visual vegetarian tags and indicator icons integrated across navbar items and product cards.

### 🎨 Frosted Glassmorphism UI
- A premium, semi-transparent top navigation bar designed with backdrop blur (`backdrop-filter`) and smooth transitions.
- Interactive floating badges for key selling points (Free Delivery, 100% Veg, Location, Top Rated).
- Sleek animations, hover triggers, and dynamic card scaling effects.

### 🎬 Interactive Media Loader
- A seamless video loading screen (`loading.mp4`) that autoplays automatically on page load.
- **Web Audio API Integration**: Boosts the original loader video audio volume to **200%** using a Web Audio API Gain Node connection.
- **Autoplay Blocker Bypass**: Starts muted automatically if blocked by browser autoplay restrictions, and unmutes seamlessly at 200% volume upon the user's first click or keypress anywhere on the page without restarting the video.

### 📱 Responsive Adaptability
- Mobile-first CSS rules built with CSS Grid and CSS Flexbox.
- **Laptop & Desktop Grid Fixes**: Capped columns at a maximum of **3 columns on laptops (769px - 1440px)** and **4 columns on large desktops (> 1440px)** to give card content enough horizontal breathing space.
- **Incomplete Rows Alignment**: Added auto-fit column tracks and centering constraints (`justify-content: center`) so cards in incomplete rows (e.g. Popular Meals) align cleanly and center dynamically, preventing asymmetrical whitespace blocks.
- **Title Wrapping**: Long item titles wrap gracefully within card bounds by stacking header contents vertically and adjusting line heights.

---

## 🛠️ Technology Stack

- **Core Framework**: React 19 (Hooks, Refs, state management)
- **Bundler & Tooling**: Vite 6 (super-fast hot module reloading & optimized bundling)
- **Styling**: Vanilla CSS (CSS Variables, Flexbox, CSS Grid)
- **Audio Processing**: Web Audio API (for real-time unmuted sound amplification)
- **Icons**: Custom SVG graphics & Emojis

---

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js (version 18+ recommended) and npm installed.

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd Delhicious-main
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally
To launch the local development server:
```bash
npm run dev
```
The server will run on `http://localhost:5173/` (or `http://localhost:5174/` if 5173 is in use).

### Building for Production
To generate an optimized production build inside the `dist` folder:
```bash
npm run build
```

---

## 📂 Project Structure

```
Delhicious-main/
├── dist/                # Production build output
├── public/              # Static assets (videos, images, audio)
│   ├── loading.mp4      # Loader video
│   ├── burger_home.mp4  # Hero header background video
│   └── scooter.mp3      # Scooter engine audio track
├── src/
│   ├── assets/          # Project specific images/icons
│   ├── App.jsx          # Main application component & routes
│   ├── index.css        # Global styles, layout system & responsive rules
│   └── main.jsx         # App entrypoint
├── index.html           # Document head configuration
├── package.json         # Dependencies & scripts
└── vite.config.js       # Vite configuration
```

---

## 🤝 Developer Credits

Delhicious Pizza Corner is developed in partnership with:
- **VintushTech**: Visit [VintushTech](https://vintushtech.cloud/) for a smarter, scalable, and better digital future. Follow VintushTech on [Instagram](https://www.instagram.com/vintushtech/).
"# Delhicious" 
