# Isoté Frontend

Luxury e-commerce React application with minimalist design and exceptional user experience.

## 🎨 Design Philosophy

Isoté's frontend is crafted with meticulous attention to detail, drawing inspiration from high-end fashion brands:

- **The Row**: Minimalist elegance, generous whitespace
- **Aesop**: Typography-first design, editorial layouts
- **COS**: Clean product photography, subtle animations

## ✨ Features

- 🏠 **Homepage** - Full-screen hero, featured products, category navigation
- 🛍️ **Shop** - Advanced filtering, sorting, responsive grid layout
- 📱 **Product Pages** - Large imagery, size selection, add to cart
- 🛒 **Cart Sidebar** - Slide-in cart with live updates
- 💳 **Checkout** - Multi-step checkout with Stripe
- 👤 **Account** - Order history, saved addresses, profile management
- 📱 **Fully Responsive** - Mobile-first, works on all devices

## 🛠️ Tech Stack

- React 18.2.0
- React Router DOM 6.20.1
- Axios for API calls
- Stripe React for payments
- Framer Motion for animations
- React Hot Toast for notifications

## 📁 Structure

```
src/
├── components/           # Reusable UI components
│   ├── Navigation/      # Header navigation
│   ├── Footer/          # Footer component
│   ├── Cart/            # Cart sidebar
│   ├── ProductCard/     # Product display card
│   └── ...
│
├── pages/               # Page components
│   ├── Homepage/        # Landing page
│   ├── Shop/            # Product listing
│   ├── ProductPage/     # Product detail
│   ├── Checkout/        # Checkout flow
│   ├── Account/         # User dashboard
│   └── Auth/            # Login/Register
│
├── contexts/            # React Context providers
│   ├── AuthContext.js   # Authentication state
│   └── CartContext.js   # Shopping cart state
│
├── services/            # API integration
│   └── api.js           # API client & endpoints
│
├── utils/               # Helper functions
│   ├── constants.js     # App constants
│   └── formatPrice.js   # Utility functions
│
├── App.js               # Main app component
├── App.css              # Global styles
├── index.js             # Entry point
└── index.css            # CSS reset & variables
```

## 🎨 Styling Approach

### CSS Variables
```css
:root {
  /* Colors */
  --color-black: #000000;
  --color-white: #FFFFFF;
  --color-cream: #FAF9F6;
  --color-stone: #E8E6E1;
  --color-charcoal: #333333;
  --color-grey: #999999;
  
  /* Typography */
  --font-display: 'Cormorant Garamond', serif;
  --font-body: 'Inter', sans-serif;
  
  /* Transitions */
  --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Component Styling
Each component has its own CSS file for maintainability. Naming convention follows BEM methodology where appropriate.

### Responsive Design
Mobile-first approach with breakpoints:
- Mobile: < 480px
- Tablet: 768px
- Desktop: 1024px
- Large: 1400px

## 🚀 Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env`:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_your_key
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 📦 Key Components

### Navigation
Sticky header with logo, navigation links, and cart icon. Responsive mobile menu.

### ProductCard
Reusable product display with image, name, price, and sale badges.

### CartSidebar
Slide-in cart panel with item management and checkout button.

### Filters
Advanced filtering for products (category, price range, gender).

## 🔄 State Management

### AuthContext
Manages user authentication state globally:
```javascript
const { user, isAuthenticated, login, logout } = useAuth();
```

### CartContext
Handles shopping cart state and operations:
```javascript
const { cart, addToCart, removeFromCart, getCartCount } = useCart();
```

## 🌐 API Integration

All API calls are centralized in `services/api.js`:

```javascript
import { productsAPI, cartAPI, authAPI } from './services/api';

// Fetch products
const { data } = await productsAPI.getAll(params);

// Add to cart
await cartAPI.add({ productId, quantity, size });
```

## 🎭 Animations

Using Framer Motion for smooth animations:
- Page transitions
- Cart sidebar slide-in
- Product hover effects
- Micro-interactions

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm test -- --watch

# Generate coverage report
npm test -- --coverage
```

## 📱 PWA Features

The app includes PWA capabilities:
- Offline functionality
- Add to home screen
- Service worker for caching
- Fast load times

## 🔐 Security

- JWT tokens stored in httpOnly cookies
- XSS protection through React's built-in sanitization
- CSRF tokens for state-changing operations
- Input validation on all forms

## 🎯 Performance Optimization

- Code splitting with React.lazy
- Image lazy loading
- Debounced search inputs
- Memoized components
- Optimized bundle size

## 📊 Analytics

Integration points for analytics:
- Page views
- Product views
- Add to cart events
- Purchase completions

## 🚢 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify
```bash
# Build command
npm run build

# Publish directory
build
```

### Environment Variables
Set these in your deployment platform:
- `REACT_APP_API_URL`
- `REACT_APP_STRIPE_PUBLISHABLE_KEY`

## 🐛 Debugging

React Developer Tools for debugging:
- Component hierarchy
- Props inspection
- Context values
- Performance profiling

## 📝 Code Style

- ESLint for linting
- Prettier for formatting
- Consistent naming conventions
- Comments for complex logic

## 🔄 Updates

Keep dependencies updated:
```bash
npm outdated
npm update
```

## 🤝 Contributing

1. Follow the existing code style
2. Write meaningful commit messages
3. Add tests for new features
4. Update documentation

## 📞 Support

For frontend-specific issues, please check:
1. Browser console for errors
2. Network tab for API issues
3. React DevTools for component issues

---

Built with care by Ahmad
