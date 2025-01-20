# Responsive Shopping Cart - Marmeto

A fully responsive e-commerce shopping cart implementation built with HTML, CSS, and JavaScript. This project features a modern UI, dynamic cart updates, local storage persistence, and a seamless shopping experience across all device sizes.

## 🌟 Features

- 🛒 Dynamic cart management with real-time updates
- 🏪 Separate shop page for product browsing
- 📱 Fully responsive design (mobile, tablet, desktop)
- ✨ Real-time price updates with Indian Rupee formatting
- 🗑️ Remove items with confirmation modal
- 💾 Local storage persistence for cart data
- 🔄 Loading animation during data fetch
- ✅ Quantity control with +/- buttons
- 🛡️ Error handling and user feedback
- 🎨 Modern UI with smooth animations

## 🛠️ Technologies Used

- HTML5
- CSS3 (with CSS Variables)
- JavaScript (ES6+)
- Font Awesome Icons
- Google Fonts (Poppins)
- Local Storage API
- Fetch API

## 📁 Project Structure

```
responsive-cart/
│
├── index.html          # Main cart page
├── shop.html          # Shop/Products page
├── styles.css        # Global styles
├── script.js        # Cart functionality
├── shop.js         # Shop page functionality
├── data.json      # Product data
│
├── images/
│   ├── marmeto_logo.webp
│   ├── mysofa.jpg
│   └── [other images]
│
└── README.md    # Documentation
```


## 💡 Key Features Implementation

### Cart Management
- Add/Remove items from cart
- Update quantities with +/- buttons
- Real-time price calculations
- Confirmation modal for item removal
- Cart count indicator in header

### Shop Page
- Display available products
- Add to cart functionality
- Success message on item addition
- Responsive product grid

### Data Persistence
- Cart data saved in localStorage
- Syncs across pages
- Persists after page refresh

### Responsive Design
- Mobile-first approach
- Breakpoints:
  - Mobile: < 480px
  - Tablet: < 768px
  - Desktop: > 768px
- Flexible grid layouts
- Responsive images

### User Interface
- Clean and modern design
- Smooth transitions
- Loading states
- Error handling
- User feedback messages

## 🎨 Design Elements

### Color Scheme
```css
:root {
    --primary-color: #B88E2F;
    --text-color: #333333;
    --light-gray: #F9F1E7;
    --border-color: #E5E5E5;
}
```

### Typography
- Primary Font: 'Poppins', sans-serif
- Font Weights: 400, 500, 600, 700

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🐛 Known Issues

- Images might need to be updated with more reliable sources
- Mobile menu implementation pending
- Cart total doesn't include shipping/tax calculations

## 🚀 Future Improvements

- Add search functionality
- Implement checkout process
- Add product categories
- Enhance mobile navigation
- Add product filters
- Implement user authentication
- Add wishlist functionality
- Add product reviews

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- Design inspiration from Marmeto
- Font Awesome for icons
- Google Fonts for typography
- Unsplash for product images

## 📝 Version History

- 1.0.0
  - Initial Release
  - Basic cart functionality
  - Responsive design
  - Shop page implementation 
