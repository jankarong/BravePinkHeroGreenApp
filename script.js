class BravePinkHeroGreenFilter {
    constructor() {
        this.defaultColors = {
            pink: '#f784c5',
            green: '#1b602f'
        };

        this.currentImage = null;
        this.canvas = null;
        this.ctx = null;

        this.settings = {
            intensity: 100,
            invert: false,
            pinkColor: this.defaultColors.pink,
            greenColor: this.defaultColors.green,
            preset: 'original'
        };

        this.init();
    }

    init() {
        this.setupElements();
        this.bindEvents();
        this.setupCanvas();
    }

    setupElements() {
        this.elements = {
            uploadArea: document.getElementById('uploadArea'),
            fileInput: document.getElementById('fileInput'),
            controlsSection: document.getElementById('controlsSection'),
            previewSection: document.getElementById('previewSection'),
            originalImage: document.getElementById('originalImage'),
            filteredCanvas: document.getElementById('filteredCanvas'),
            originalLoading: document.getElementById('originalLoading'),
            filteredLoading: document.getElementById('filteredLoading'),
            intensitySlider: document.getElementById('intensitySlider'),
            intensityValue: document.getElementById('intensityValue'),
            invertColors: document.getElementById('invertColors'),
            pinkColor: document.getElementById('pinkColor'),
            greenColor: document.getElementById('greenColor'),
            downloadBtn: document.getElementById('downloadBtn'),
            newImageBtn: document.getElementById('newImageBtn'),
            presetBtns: document.querySelectorAll('.preset-btn')
        };
    }

    bindEvents() {
        // Upload events
        this.elements.uploadArea.addEventListener('click', () => {
            this.elements.fileInput.click();
        });

        this.elements.fileInput.addEventListener('change', (e) => {
            this.handleFileSelect(e.target.files[0]);
        });

        // Drag and drop
        this.elements.uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            this.elements.uploadArea.classList.add('drag-over');
        });

        this.elements.uploadArea.addEventListener('dragleave', () => {
            this.elements.uploadArea.classList.remove('drag-over');
        });

        this.elements.uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            this.elements.uploadArea.classList.remove('drag-over');
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                this.handleFileSelect(files[0]);
            }
        });

        // Control events
        this.elements.intensitySlider.addEventListener('input', (e) => {
            this.settings.intensity = parseInt(e.target.value);
            this.elements.intensityValue.textContent = `${this.settings.intensity}%`;
            this.applyFilter();
        });

        this.elements.invertColors.addEventListener('change', (e) => {
            this.settings.invert = e.target.checked;
            this.applyFilter();
        });

        this.elements.pinkColor.addEventListener('input', (e) => {
            this.settings.pinkColor = e.target.value;
            this.applyFilter();
        });

        this.elements.greenColor.addEventListener('input', (e) => {
            this.settings.greenColor = e.target.value;
            this.applyFilter();
        });

        // Preset buttons
        this.elements.presetBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.handlePresetChange(btn.dataset.preset);
            });
        });

        // Action buttons
        this.elements.downloadBtn.addEventListener('click', () => {
            this.downloadImage();
        });

        this.elements.newImageBtn.addEventListener('click', () => {
            this.resetApp();
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch (e.key) {
                    case 'd':
                        e.preventDefault();
                        if (this.currentImage) this.downloadImage();
                        break;
                    case 'n':
                        e.preventDefault();
                        this.resetApp();
                        break;
                    case 'i':
                        e.preventDefault();
                        this.elements.invertColors.checked = !this.elements.invertColors.checked;
                        this.settings.invert = this.elements.invertColors.checked;
                        this.applyFilter();
                        break;
                }
            }
        });
    }

    setupCanvas() {
        this.canvas = this.elements.filteredCanvas;
        this.ctx = this.canvas.getContext('2d');
    }

    handleFileSelect(file) {
        if (!file) return;

        // Validate file type
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        if (!validTypes.includes(file.type)) {
            this.showError('Please select a valid image file (JPEG, PNG, or WebP)');
            return;
        }

        // Validate file size (25MB)
        const maxSize = 25 * 1024 * 1024;
        if (file.size > maxSize) {
            this.showError('File size must be less than 25MB');
            return;
        }

        this.loadImage(file);
    }

    loadImage(file) {
        this.showLoading(this.elements.originalLoading);

        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                this.currentImage = img;
                this.displayOriginalImage(img);
                this.showControls();
                this.applyFilter();
                this.hideLoading(this.elements.originalLoading);
            };
            img.onerror = () => {
                this.showError('Failed to load image');
                this.hideLoading(this.elements.originalLoading);
            };
            img.src = e.target.result;
        };
        reader.onerror = () => {
            this.showError('Failed to read file');
            this.hideLoading(this.elements.originalLoading);
        };
        reader.readAsDataURL(file);
    }

    displayOriginalImage(img) {
        this.elements.originalImage.src = img.src;
        this.elements.originalImage.style.display = 'block';

        // Setup canvas dimensions - preserve aspect ratio
        const maxWidth = 800;
        const maxHeight = 600;
        const originalWidth = img.naturalWidth || img.width;
        const originalHeight = img.naturalHeight || img.height;
        
        // Calculate aspect ratio
        const aspectRatio = originalWidth / originalHeight;
        let canvasWidth = originalWidth;
        let canvasHeight = originalHeight;

        // Scale down if needed while maintaining aspect ratio
        if (originalWidth > maxWidth || originalHeight > maxHeight) {
            const widthRatio = maxWidth / originalWidth;
            const heightRatio = maxHeight / originalHeight;
            const ratio = Math.min(widthRatio, heightRatio);
            
            canvasWidth = Math.round(originalWidth * ratio);
            canvasHeight = Math.round(originalHeight * ratio);
        }

        // Set canvas dimensions
        this.canvas.width = canvasWidth;
        this.canvas.height = canvasHeight;
        this.canvas.style.width = `${canvasWidth}px`;
        this.canvas.style.height = `${canvasHeight}px`;
        
        // Store original dimensions for processing
        this.originalDimensions = {
            width: originalWidth,
            height: originalHeight,
            aspectRatio: aspectRatio
        };
    }

    showControls() {
        this.elements.controlsSection.style.display = 'block';
        this.elements.previewSection.style.display = 'block';
        this.elements.controlsSection.classList.add('fade-in');
        this.elements.previewSection.classList.add('fade-in');
    }

    applyFilter() {
        if (!this.currentImage) return;

        this.showLoading(this.elements.filteredLoading);

        // Use requestAnimationFrame to ensure smooth UI
        requestAnimationFrame(() => {
            this.processImage();
            this.hideLoading(this.elements.filteredLoading);
        });
    }

    processImage() {
        const { width, height } = this.canvas;

        // Clear canvas first
        this.ctx.clearRect(0, 0, width, height);
        
        // Draw original image to canvas maintaining aspect ratio
        this.ctx.drawImage(this.currentImage, 0, 0, width, height);

        // Get image data
        const imageData = this.ctx.getImageData(0, 0, width, height);
        const data = imageData.data;

        // Convert colors to RGB
        const pinkRGB = this.hexToRgb(this.settings.pinkColor);
        const greenRGB = this.hexToRgb(this.settings.greenColor);

        // Apply dual-tone effect
        for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];

            // Calculate luminance
            const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

            // Determine which color to use based on luminance and invert setting
            let targetColor;
            if (this.settings.invert) {
                targetColor = luminance > 0.5 ? greenRGB : pinkRGB;
            } else {
                targetColor = luminance > 0.5 ? pinkRGB : greenRGB;
            }

            // Apply intensity - blend between original and pure target color
            const intensity = this.settings.intensity / 100;

            if (intensity === 0) {
                // Keep original colors when intensity is 0
                continue;
            } else {
                // Apply pure target colors, intensity controls opacity/blend
                data[i] = Math.round(r * (1 - intensity) + targetColor.r * intensity);
                data[i + 1] = Math.round(g * (1 - intensity) + targetColor.g * intensity);
                data[i + 2] = Math.round(b * (1 - intensity) + targetColor.b * intensity);
            }
        }

        // Put modified image data back to canvas
        this.ctx.putImageData(imageData, 0, 0);
    }

    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : { r: 0, g: 0, b: 0 };
    }

    handlePresetChange(preset) {
        // Update active button
        this.elements.presetBtns.forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');

        this.settings.preset = preset;

        switch (preset) {
            case 'original':
                this.settings.pinkColor = this.defaultColors.pink;
                this.settings.greenColor = this.defaultColors.green;
                break;
        }

        // Update color pickers
        this.elements.pinkColor.value = this.settings.pinkColor;
        this.elements.greenColor.value = this.settings.greenColor;

        this.applyFilter();
    }

    downloadImage() {
        if (!this.canvas) return;

        // Create download link
        const link = document.createElement('a');
        link.download = `brave-pink-hero-green-${Date.now()}.png`;
        link.href = this.canvas.toDataURL('image/png');

        // Trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Show success message
        this.showSuccess('Image downloaded successfully!');
    }

    resetApp() {
        this.currentImage = null;
        this.elements.controlsSection.style.display = 'none';
        this.elements.previewSection.style.display = 'none';
        this.elements.originalImage.src = '';
        this.elements.fileInput.value = '';

        // Reset settings
        this.settings = {
            intensity: 100,
            invert: false,
            pinkColor: this.defaultColors.pink,
            greenColor: this.defaultColors.green,
            preset: 'original'
        };

        // Reset UI
        this.elements.intensitySlider.value = 100;
        this.elements.intensityValue.textContent = '100%';
        this.elements.invertColors.checked = false;
        this.elements.pinkColor.value = this.defaultColors.pink;
        this.elements.greenColor.value = this.defaultColors.green;

        // Reset preset buttons
        this.elements.presetBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.preset === 'original') {
                btn.classList.add('active');
            }
        });
    }

    showLoading(element) {
        if (element) element.style.display = 'flex';
    }

    hideLoading(element) {
        if (element) element.style.display = 'none';
    }

    showError(message) {
        this.showNotification(message, 'error');
    }

    showSuccess(message) {
        this.showNotification(message, 'success');
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        // Style notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '1rem 1.5rem',
            borderRadius: '12px',
            color: 'white',
            fontWeight: '500',
            zIndex: '1000',
            transform: 'translateX(400px)',
            transition: 'transform 0.3s ease',
            maxWidth: '300px'
        });

        if (type === 'error') {
            notification.style.background = '#ef4444';
        } else if (type === 'success') {
            notification.style.background = '#10b981';
        } else {
            notification.style.background = '#3b82f6';
        }

        document.body.appendChild(notification);

        // Animate in
        requestAnimationFrame(() => {
            notification.style.transform = 'translateX(0)';
        });

        // Auto remove
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Performance optimization: Image processing with Web Workers (if supported)
class ImageProcessor {
    constructor() {
        this.supportsWebWorkers = typeof Worker !== 'undefined';
    }

    async processImageData(imageData, settings) {
        if (this.supportsWebWorkers && window.Worker) {
            return this.processWithWorker(imageData, settings);
        } else {
            return this.processOnMainThread(imageData, settings);
        }
    }

    processWithWorker(imageData, settings) {
        return new Promise((resolve, reject) => {
            const workerCode = `
                self.onmessage = function(e) {
                    const { imageData, settings } = e.data;
                    const data = imageData.data;
                    
                    function hexToRgb(hex) {
                        const result = /^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(hex);
                        return result ? {
                            r: parseInt(result[1], 16),
                            g: parseInt(result[2], 16),
                            b: parseInt(result[3], 16)
                        } : { r: 0, g: 0, b: 0 };
                    }
                    
                    const pinkRGB = hexToRgb(settings.pinkColor);
                    const greenRGB = hexToRgb(settings.greenColor);
                    
                    for (let i = 0; i < data.length; i += 4) {
                        const r = data[i];
                        const g = data[i + 1];
                        const b = data[i + 2];
                        
                        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
                        
                        let targetColor;
                        if (settings.invert) {
                            targetColor = luminance > 0.5 ? greenRGB : pinkRGB;
                        } else {
                            targetColor = luminance > 0.5 ? pinkRGB : greenRGB;
                        }
                        
                        const intensity = settings.intensity / 100;
                        
                        data[i] = r + (targetColor.r - r) * intensity;
                        data[i + 1] = g + (targetColor.g - g) * intensity;
                        data[i + 2] = b + (targetColor.b - b) * intensity;
                    }
                    
                    self.postMessage({ imageData });
                };
            `;

            const blob = new Blob([workerCode], { type: 'application/javascript' });
            const worker = new Worker(URL.createObjectURL(blob));

            worker.onmessage = (e) => {
                resolve(e.data.imageData);
                worker.terminate();
                URL.revokeObjectURL(blob);
            };

            worker.onerror = (error) => {
                reject(error);
                worker.terminate();
                URL.revokeObjectURL(blob);
            };

            worker.postMessage({ imageData, settings });
        });
    }

    processOnMainThread(imageData, settings) {
        return new Promise((resolve) => {
            // Process on main thread (same logic as in BravePinkHeroGreenFilter.processImage)
            resolve(imageData);
        });
    }
}

// Navigation functionality
class Navigation {
    constructor() {
        this.navToggle = document.getElementById('navToggle');
        this.navMenu = document.getElementById('navMenu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        // Mobile menu toggle
        this.navToggle.addEventListener('click', () => {
            this.toggleMobileMenu();
        });

        // Close mobile menu when clicking on a link
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.navToggle.contains(e.target) && !this.navMenu.contains(e.target)) {
                this.closeMobileMenu();
            }
        });

        // Handle scroll for navbar transparency
        window.addEventListener('scroll', () => {
            this.handleNavbarScroll();
        });
    }

    toggleMobileMenu() {
        this.navToggle.classList.toggle('active');
        this.navMenu.classList.toggle('active');
    }

    closeMobileMenu() {
        this.navToggle.classList.remove('active');
        this.navMenu.classList.remove('active');
    }

    handleNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        }
    }
}

// Gallery functionality
class Gallery {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.gallery-slide');
        this.dots = document.querySelectorAll('.dot');
        this.prevBtn = document.getElementById('galleryPrev');
        this.nextBtn = document.getElementById('galleryNext');
        this.autoPlayInterval = null;
        this.autoPlayDelay = 5000; // 5 seconds
        this.init();
    }

    init() {
        this.bindEvents();
        this.startAutoPlay();
    }

    bindEvents() {
        // Navigation buttons
        this.prevBtn.addEventListener('click', () => {
            this.goToSlide(this.currentSlide - 1);
            this.resetAutoPlay();
        });

        this.nextBtn.addEventListener('click', () => {
            this.goToSlide(this.currentSlide + 1);
            this.resetAutoPlay();
        });

        // Dots navigation
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.goToSlide(index);
                this.resetAutoPlay();
            });
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.goToSlide(this.currentSlide - 1);
                this.resetAutoPlay();
            } else if (e.key === 'ArrowRight') {
                this.goToSlide(this.currentSlide + 1);
                this.resetAutoPlay();
            }
        });

        // Pause autoplay on hover
        const galleryContainer = document.querySelector('.gallery-container');
        galleryContainer.addEventListener('mouseenter', () => {
            this.stopAutoPlay();
        });

        galleryContainer.addEventListener('mouseleave', () => {
            this.startAutoPlay();
        });
    }

    goToSlide(slideIndex) {
        // Handle wrap-around
        if (slideIndex >= this.slides.length) {
            slideIndex = 0;
        } else if (slideIndex < 0) {
            slideIndex = this.slides.length - 1;
        }

        // Remove active classes
        this.slides[this.currentSlide].classList.remove('active');
        this.dots[this.currentSlide].classList.remove('active');

        // Add active classes to new slide
        this.currentSlide = slideIndex;
        this.slides[this.currentSlide].classList.add('active');
        this.dots[this.currentSlide].classList.add('active');
    }

    nextSlide() {
        this.goToSlide(this.currentSlide + 1);
    }

    startAutoPlay() {
        this.stopAutoPlay(); // Clear any existing interval
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoPlayDelay);
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }

    resetAutoPlay() {
        this.stopAutoPlay();
        this.startAutoPlay();
    }
}

// SEO Content Animation Controller
class SEOAnimationController {
    constructor() {
        this.observer = null;
        this.init();
    }

    init() {
        this.createObserver();
        this.observeElements();
    }

    createObserver() {
        const options = {
            root: null,
            rootMargin: '0px 0px -50px 0px',
            threshold: 0.1
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Animate content cards with delay
                    const cards = entry.target.querySelectorAll('.content-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('visible');
                        }, index * 100);
                    });
                }
            });
        }, options);
    }

    observeElements() {
        // Observe all SEO content sections
        const seoSections = document.querySelectorAll('.seo-content-section');
        seoSections.forEach(section => {
            this.observer.observe(section);
        });

        // Initially hide all content cards
        const contentCards = document.querySelectorAll('.content-card');
        contentCards.forEach(card => {
            card.classList.remove('visible');
        });
    }

    destroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BravePinkHeroGreenFilter();
    new Navigation();
    new Gallery();
    new SEOAnimationController();
    
    // Handle navigation brand click to return to home
    const navBrand = document.getElementById('navBrand');
    if (navBrand) {
        navBrand.addEventListener('click', (e) => {
            e.preventDefault();
            // Scroll to top and reset the app
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            // Reset any active states and hide sections if needed
            const controlsSection = document.getElementById('controlsSection');
            const previewSection = document.getElementById('previewSection');
            if (controlsSection) controlsSection.style.display = 'none';
            if (previewSection) previewSection.style.display = 'none';
        });
    }
});

// Register service worker for PWA functionality
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}