# 🎨 Brave Pink Hero Green Edit

**Transform Your Photos Online** - Create stunning visual art with our free green and pink filter.

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-bravepinkherogreen.art-ff69b4)](https://bravepinkherogreen.art)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Made with JavaScript](https://img.shields.io/badge/Made%20with-JavaScript-yellow.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

Transform your photos with the iconic Brave Pink Hero Green dual-tone filter - a powerful online photo editing tool that creates stunning duotone effects.

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

**🔗 Online Version: [bravepinkherogreen.art](https://bravepinkherogreen.art)**

### Use Online (Recommended)
1. Visit [bravepinkherogreen.art](https://bravepinkherogreen.art)
2. Upload your photo by clicking the upload area or dragging and dropping
3. Watch the filter apply automatically in real-time
4. Adjust intensity and colors to your liking
5. Download your transformed image

### Local Development
1. Clone this repository
2. Open `index.html` in your web browser
3. No build process required - it's pure client-side JavaScript!

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

## 🌐 Live Demo & Website

**🔗 Official Website: [bravepinkherogreen.art](https://bravepinkherogreen.art)**

Experience the full application with:
- Interactive photo editor with real-time preview
- Gallery of example transformations
- Complete color code reference guide
- Multi-language support (English & Bahasa Indonesia)
- Mobile-optimized interface

### Additional Resources
- **🎨 Color Codes**: [Color Reference Guide](https://bravepinkherogreen.art/color-code.html)
- **🇮🇩 Indonesian Version**: [Bahasa Indonesia](https://bravepinkherogreen.art/id/)
- **💬 Contact**: [Send Feedback](https://bravepinkherogreen.art/#contact)

## 🤝 Contributing

We welcome contributions! Whether it's:
- 🐛 Bug reports and fixes
- 💡 Feature suggestions  
- 🌍 New language translations
- 💻 Code improvements
- 📖 Documentation updates

Feel free to open an issue or submit a pull request.

## ⭐ Show Your Support

If you find this project helpful:
- ⭐ Star this repository
- 🔗 Share [bravepinkherogreen.art](https://bravepinkherogreen.art) with others
- 🐛 Report any issues you find
- 💡 Suggest new features

---

**🎨 Transform your photos today at [bravepinkherogreen.art](https://bravepinkherogreen.art)**

*Made with 💖 by the Brave Pink Hero Green team*