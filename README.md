# Brave Pink Hero Green - Photo Filter App

Transform your photos with the iconic Brave Pink Hero Green dual-tone filter - a symbol of resistance and unity from Indonesia's viral social media movement.

## ✨ Features

- **Dual-Tone Photo Filter**: Apply the signature Brave Pink (#f784c5) and Hero Green (#1b602f) colors
- **Real-time Preview**: Side-by-side comparison of original and filtered images
- **Advanced Controls**:
  - Intensity slider (0-100%)
  - Color inversion toggle
  - Custom color picker
  - Preset variations (Original, Resistance Blue)
- **Privacy First**: 100% client-side processing - photos never leave your device
- **Progressive Web App**: Installable, works offline
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Drag & Drop Upload**: Easy photo upload with drag-and-drop support
- **High-Quality Export**: Download filtered images in full resolution

## 🚀 Getting Started

1. Open `index.html` in your web browser
2. Upload a photo by clicking the upload area or dragging and dropping
3. Adjust filter settings using the controls
4. Download your filtered image

## 📱 PWA Installation

The app can be installed as a Progressive Web App:

1. Visit the app in a supported browser
2. Look for the "Install" or "Add to Home Screen" option
3. Follow the prompts to install

## 🎨 Technical Details

### Colors
- **Brave Pink**: `#f784c5`
- **Hero Green**: `#1b602f`  
- **Resistance Blue**: `#000072` (alternative preset)

### Supported Formats
- JPEG/JPG
- PNG
- WebP
- Maximum file size: 25MB

### Browser Compatibility
- Modern browsers with Canvas API support
- Service Worker support for PWA features
- Web Workers for enhanced performance (optional)

## 🛠️ Development

### Project Structure
```
├── index.html          # Main HTML structure
├── styles.css          # Responsive CSS styling
├── script.js           # Core JavaScript functionality
├── manifest.json       # PWA manifest
├── sw.js              # Service worker for offline support
├── create-icons.html  # Icon generator utility
└── README.md          # Project documentation
```

### Key Features Implementation

**Image Processing**: Canvas-based dual-tone filtering with luminance-based color mapping

**Performance**: 
- Web Workers for heavy image processing (when available)
- RequestAnimationFrame for smooth UI updates
- Efficient canvas operations

**Accessibility**:
- Keyboard shortcuts (Ctrl/Cmd + D for download, Ctrl/Cmd + N for new image)
- Focus states and proper ARIA labels
- Reduced motion support

**PWA Features**:
- Offline functionality
- App installation
- File handling integration
- Background sync capability (for future enhancements)

## 🔧 Customization

To modify the default colors, update the CSS custom properties in `styles.css`:

```css
:root {
    --brave-pink: #f784c5;
    --hero-green: #1b602f;
    --resistance-blue: #000072;
}
```

## 📜 License

This project symbolizes resistance and unity through art. Feel free to use and modify for non-commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

---

*Brave Pink Hero Green - Symbolizing resistance and unity through art* 🎨