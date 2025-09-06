# Gallery Images

To add your own images to the gallery:

1. Place your images in this folder (`images/gallery/`)
2. Name them: `image1.jpg`, `image2.jpg`, `image3.jpg`, `image4.jpg`
3. Update the HTML file to use local images instead of the placeholder URLs

## Recommended image specifications:
- **Size**: 800x400 pixels (or similar 2:1 aspect ratio)
- **Format**: JPG, PNG, or WebP
- **File size**: Under 500KB for optimal loading speed

## To switch from placeholder to local images:
In `index.html`, replace:
```html
<img src="https://picsum.photos/800/400?random=1" alt="Artistic Photo 1">
```

With:
```html
<img src="images/gallery/image1.jpg" alt="Artistic Photo 1">
```

Do this for all 4 images (image1.jpg through image4.jpg).

## Example file structure:
```
images/
└── gallery/
    ├── image1.jpg
    ├── image2.jpg  
    ├── image3.jpg
    └── image4.jpg
```