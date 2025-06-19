# WebXperience Frontend

A modern web experience demo featuring:

- Animated loader
- Light/Dark mode toggle
- Responsive design
- Animated sections (AOS)
- FontAwesome icons

## Getting Started

1. **Clone or download this repository.**
2. **Serve the site with a local server** (for video backgrounds and localStorage to work properly):
   - With Python 3:
     ```sh
     python -m http.server
     ```
   - Or use [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) in VS Code.
3. **Open `http://localhost:8000` (or the port shown) in your browser.**

## Features

- **Theme Toggle:**
  - Click the moon/sun button in the top right to switch between light and dark mode.
  - The selected theme is saved in your browser (localStorage).
- **Animated Loader:**
  - Displays on page load with a countdown and split animation.
- **Responsive Layout:**
  - Works on desktop and mobile.
- **AOS (Animate On Scroll):**
  - Smooth section animations as you scroll.
- **FontAwesome:**
  - Used for icons throughout the site.

## Troubleshooting

- **Theme toggle not working?**
  - Make sure you are serving the site with a local server, not opening the HTML file directly.
  - Check the browser console for errors.
  - Ensure only one `<script src="main.js" defer></script>` is present at the end of `index.html`.
  - If you manually set `data-theme` in the console and it works, the CSS is correct and the issue is with JavaScript event attachment.
  - Try refreshing the page after clearing your browser cache.

## Customization

- Edit `styles.css` for theme colors and layout.
- Edit `main.js` for loader, theme logic, and section animations.
- Edit `index.html` for content and structure.

---

© 2024 WebXperience. All rights reserved.
