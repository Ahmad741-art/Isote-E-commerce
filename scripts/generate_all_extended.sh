#!/usr/bin/env bash
# generate_all_extended.sh
# Usage: from repository root:
#   chmod +x scripts/generate_all_extended.sh
#   ./scripts/generate_all_extended.sh
#
# This generator will:
# - create CI workflow and Dependabot config
# - add Backend Dockerfile, docker-compose, backup script, tests, Sentry helper
# - attempt to patch Backend/server.js and Backend/package.json for testability
# - scaffold an extended Frontend (Vite + React) with:
#     - product listing, filters, search, pagination
#     - product page with variants and reviews
#     - cart, checkout (Stripe)
#     - auth (login/register), auth context, token persistence
#     - wishlist
#     - account/orders page
#     - admin area (dashboard, product management form) with protected admin routes
# - add Frontend Dockerfile
# - create docs/PRODUCTION_CHECKLIST.md
#
# The script is idempotent and will NOT overwrite existing files unless --force is supplied.
# Use: ./scripts/generate_all_extended.sh [--force]

set -euo pipefail
FORCE=false
if [ "${1:-}" = "--force" ]; then
  FORCE=true
fi

write_file() {
  local path="$1"; shift
  if [ -f "$path" ] && [ "$FORCE" = "false" ]; then
    echo "Skipping existing $path"
    return
  fi
  mkdir -p "$(dirname "$path")"
  printf '%s\n' "$*" > "$path"
  echo "Wrote $path"
}

echo "Starting extended generation (force=$FORCE)..."

# --- CI workflow (with Mongo service) ---
write_file ".github/workflows/ci.yml" '
name: CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  backend:
    name: Backend Tests & Lint
    runs-on: ubuntu-latest
    services:
      mongo:
        image: mongo:6.0
        ports:
          - 27017:27017
    steps:
      - name: Checkout repo
        uses: actions/checkout@v4

      - name: Use Node.js 18.x
        uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: "npm"

      - name: Install backend dependencies
        working-directory: Backend
        run: npm ci

      - name: Start backend (background)
        working-directory: Backend
        run: |
          nohup npm run dev &>/tmp/backend.log & sleep 2

      - name: Run backend tests
        working-directory: Backend
        env:
          NODE_ENV: test
          MONGODB_URI: mongodb://localhost:27017/isote_test
        run: npm test

      - name: Run backend lint (if configured)
        working-directory: Backend
        run: |
          if [ -f Backend/.eslintrc* ] || npm pkg get eslint >/dev/null 2>&1; then
            npm run lint || true
          else
            echo "No eslint config detected. Skipping lint."
          fi

  frontend:
    name: Frontend Tests & Build
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repo
        uses: actions/checkout@v4

      - name: Use Node.js 18.x
        uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: "npm"

      - name: Install frontend dependencies
        working-directory: Frontend
        run: npm ci

      - name: Run frontend tests
        working-directory: Frontend
        env:
          CI: true
        run: npm test --if-present

      - name: Build frontend (optional)
        working-directory: Frontend
        run: npm run build --if-present
'

# --- Dependabot ---
write_file ".github/dependabot.yml" '
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 5
  - package-ecosystem: "npm"
    directory: "/Backend"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 5
  - package-ecosystem: "npm"
    directory: "/Frontend"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 5
'

# --- Backend Dockerfile ---
write_file "Backend/Dockerfile" '
# Backend Dockerfile for production
FROM node:18-alpine

WORKDIR /usr/src/app

COPY Backend/package*.json ./
RUN npm ci --only=production

COPY Backend/ ./

RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

EXPOSE 5000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:5000/health || exit 1

CMD ["node", "server.js"]
'

# --- docker-compose ---
write_file "docker-compose.yml" '
version: "3.8"

services:
  mongo:
    image: mongo:6.0
    container_name: isote-mongo
    restart: unless-stopped
    volumes:
      - mongo-data:/data/db
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: example

  backend:
    build:
      context: .
      dockerfile: Backend/Dockerfile
    container_name: isote-backend
    restart: unless-stopped
    depends_on:
      - mongo
    ports:
      - "5000:5000"
    environment:
      NODE_ENV: development
      PORT: 5000
      MONGODB_URI: mongodb://mongo:27017/isote-ecommerce
    volumes:
      - ./Backend:/usr/src/app
    command: npm run dev

  frontend:
    build:
      context: .
      dockerfile: Frontend/Dockerfile
    container_name: isote-frontend
    restart: unless-stopped
    ports:
      - "3000:3000"
    depends_on:
      - backend
    environment:
      VITE_API_BASE_URL: http://backend:5000
    volumes:
      - ./Frontend:/app
      - /app/node_modules

  mongo-express:
    image: mongo-express:1.0
    container_name: isote-mongo-express
    restart: unless-stopped
    depends_on:
      - mongo
    ports:
      - "8081:8081"
    environment:
      ME_CONFIG_MONGODB_SERVER: mongo
      ME_CONFIG_BASICAUTH_USERNAME: admin
      ME_CONFIG_BASICAUTH_PASSWORD: password

volumes:
  mongo-data:
'

# --- backup script ---
write_file "scripts/mongo-backup.sh" '
#!/usr/bin/env bash
set -euo pipefail

TIMESTAMP=$(date +"%Y%m%dT%H%M%S")
BACKUP_DIR="${BACKUP_DIR:-./backups}"
MONGO_URI="${MONGO_URI:-}"

if [ -z "$MONGO_URI" ]; then
  echo "MONGO_URI is required. Example:"
  echo "MONGO_URI='\''mongodb://localhost:27017/isote-ecommerce'\'' ./scripts/mongo-backup.sh"
  exit 2
fi

mkdir -p "$BACKUP_DIR"
OUT="$BACKUP_DIR/mongo-backup-$TIMESTAMP"
echo "Creating mongodump to $OUT"
mongodump --uri="$MONGO_URI" --out="$OUT"

KEEP=${KEEP:-7}
echo "Rotating backups, keeping last $KEEP"
ls -1dt "$BACKUP_DIR"/mongo-backup-* | tail -n +$((KEEP+1)) | xargs -r rm -rf

echo "Backup completed: $OUT"
'
chmod +x scripts/mongo-backup.sh

# --- Backend tests / jest config ---
write_file "Backend/tests/auth.test.js" '
/**
 * Basic integration tests for auth endpoints.
 * Ensure Backend/server.js exports "app" (module.exports = app).
 */

const request = require("supertest");
const mongoose = require("mongoose");

let app;
try {
  app = require("../server");
} catch (err) {
  throw new Error("Could not require ../server. Ensure server.js exports the Express app (module.exports = app).");
}

describe("Auth endpoints", () => {
  beforeAll(async () => {
    jest.setTimeout(15000);
  });

  afterAll(async () => {
    if (mongoose.connection.readyState === 1) {
      await mongoose.disconnect();
    }
  });

  it("registers and logs in a user", async () => {
    const user = {
      name: "Test User",
      email: `test+${Date.now()}@example.com`,
      password: "TestPass123!"
    };

    const reg = await request(app).post("/api/auth/register").send(user);
    expect(reg.body).toHaveProperty("success", true);

    const login = await request(app).post("/api/auth/login").send({ email: user.email, password: user.password });
    expect(login.body).toHaveProperty("success", true);
    expect(login.body).toHaveProperty("token");
  });
});
'

write_file "Backend/jest.config.js" '
module.exports = {
  testEnvironment: "node",
  testMatch: ["**/tests/**/*.test.js"],
  verbose: true,
  testTimeout: 30000,
};
'

# --- Sentry helper ---
write_file "Backend/config/sentry.js" '
const Sentry = require("@sentry/node");

function initSentry() {
  if (process.env.SENTRY_DSN) {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      environment: process.env.NODE_ENV || "development",
      tracesSampleRate: 0.1,
    });
    console.info("Sentry initialized");
  } else {
    console.info("SENTRY_DSN not set - Sentry disabled");
  }
}

module.exports = { initSentry, Sentry };
'

write_file "Backend/INTEGRATE_SENTRY.md" '
How to integrate Sentry into Backend/server.js

1. Install:
   npm install @sentry/node

2. At the top of server.js:
   const { initSentry, Sentry } = require("./config/sentry");
   initSentry();

3. Add request/tracing handlers around routes if SENTRY_DSN is set:
   if (process.env.SENTRY_DSN) {
     app.use(Sentry.Handlers.requestHandler());
     app.use(Sentry.Handlers.tracingHandler());
   }

4. Add Sentry error handler after your error middleware:
   if (process.env.SENTRY_DSN) {
     app.use(Sentry.Handlers.errorHandler());
   }

5. In your errorHandler middleware:
   const { Sentry } = require("./config/sentry");
   Sentry.captureException(err);
'

# --- docs/PRODUCTION_CHECKLIST.md ---
write_file "docs/PRODUCTION_CHECKLIST.md" '
# Production Checklist — Isoté E‑commerce (extended)

Immediate generated assets:
- CI workflow, Dependabot config
- Backend Dockerfile, docker-compose
- scripts/mongo-backup.sh
- Backend tests, jest config
- Backend Sentry helper
- Extended Frontend scaffold (Vite + React)
- Frontend Dockerfile

Manual steps:
1. In Backend:
   - npm install --save-dev jest supertest cross-env nodemon
   - Ensure server.js exports app and uses guarded listen:
     if (require.main === module) { app.listen(PORT) }
     module.exports = app
2. In Frontend:
   - cd Frontend && npm install
   - Create Frontend/.env with:
       VITE_API_BASE_URL=http://localhost:5000
       VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
   - npm run dev
3. Add production secrets to hosting / GitHub Secrets (SENTRY_DSN, STRIPE keys, DB credentials)
4. Run tests: cd Backend && npm test
5. Start locally with docker-compose up --build

Recommended next:
- Harden security, enable Dependabot PRs, add E2E tests, production backups to S3, and finalize legal pages.
'

# --- Attempt to patch Backend/server.js and package.json ---
if [ -f Backend/server.js ]; then
  echo "Patching Backend/server.js to export app (backup at Backend/server.js.bak)..."
  cp Backend/server.js Backend/server.js.bak
  if ! grep -q "module.exports = app" Backend/server.js; then
    cat >> Backend/server.js <<'EOF'

/**
 * Guarded listen & export for tests
 */
const PORT = process.env.PORT || 5000;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  });
}
module.exports = app;
EOF
    echo "Appended guarded listen & export to Backend/server.js"
  else
    echo "Backend/server.js already exports app. Skipping."
  fi
else
  echo "Backend/server.js not found - skipping patch. Make sure to export Express app manually."
fi

if [ -f Backend/package.json ]; then
  echo "Patching Backend/package.json scripts & devDependencies..."
  node -e 'const fs=require("fs");const p="./Backend/package.json";const pkg=JSON.parse(fs.readFileSync(p));pkg.scripts=pkg.scripts||{};pkg.scripts.dev=pkg.scripts.dev||"nodemon server.js";pkg.scripts.start=pkg.scripts.start||"node server.js";pkg.scripts.test=pkg.scripts.test||"cross-env NODE_ENV=test jest --runInBand";pkg.devDependencies=pkg.devDependencies||{};pkg.devDependencies.jest=pkg.devDependencies.jest||"^29.0.0";pkg.devDependencies.supertest=pkg.devDependencies.supertest||"^6.0.0";pkg.devDependencies["cross-env"]=pkg.devDependencies["cross-env"]||"^7.0.0";pkg.devDependencies.nodemon=pkg.devDependencies.nodemon||"^2.0.0";fs.writeFileSync(p,JSON.stringify(pkg,null,2));console.log("Updated Backend/package.json");'
else
  echo "Backend/package.json not found - skipping patch."
fi

# --- Frontend scaffold (extended features) ---
echo "Scaffolding extended Frontend in Frontend/ ..."
mkdir -p Frontend/src/{components,context,services,pages/Auth,pages/Admin,pages/Product,pages/Account} Frontend/public

# Frontend package.json
write_file "Frontend/package.json" '
{
  "name": "isote-frontend",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "echo \"No tests yet\" && exit 0",
    "lint": "echo \"No linter configured\""
  },
  "dependencies": {
    "axios": "^1.4.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.14.1",
    "@stripe/stripe-js": "^2.0.0",
    "@stripe/react-stripe-js": "^1.14.0"
  },
  "devDependencies": {
    "vite": "^5.2.0",
    "@vitejs/plugin-react": "^4.0.0"
  }
}
'

# Frontend Dockerfile
write_file "Frontend/Dockerfile" '
FROM node:18-alpine
WORKDIR /app
COPY Frontend/package*.json ./
RUN npm ci
COPY Frontend/ ./
EXPOSE 3000
CMD ["npm", "run", "dev"]
'

# index.html, vite.config.js
write_file "Frontend/index.html" '
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Isoté Shop</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
'

write_file "Frontend/vite.config.js" '
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
  plugins: [react()],
  server: { port: 3000 }
});
'

# main.jsx & App
write_file "Frontend/src/main.jsx" '
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
'

write_file "Frontend/src/App.jsx" '
import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductPage from "./pages/Product/ProductPage";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Wishlist from "./pages/Wishlist";
import Account from "./pages/Account/Account";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminProductForm from "./pages/Admin/AdminProductForm";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import AdminRoute from "./components/AdminRoute";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Navbar />
        <main className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/account" element={<Account />} />
            <Route path="/admin" element={<AdminRoute><AdminDashboard/></AdminRoute>} />
            <Route path="/admin/products/new" element={<AdminRoute><AdminProductForm/></AdminRoute>} />
            <Route path="/admin/products/:id/edit" element={<AdminRoute><AdminProductForm edit /></AdminRoute>} />
          </Routes>
        </main>
      </CartProvider>
    </AuthProvider>
  );
}
'

# components: Navbar, ProductCard, SearchBar, Filters, Pagination, AdminRoute
write_file "Frontend/src/components/Navbar.jsx" '
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const totalItems = cart.reduce((s, i) => s + i.qty, 0);
  const nav = useNavigate();
  return (
    <nav className="nav">
      <Link to="/" className="logo">Isoté</Link>
      <div className="nav-links">
        <Link to="/shop">Shop</Link>
        <Link to="/wishlist">Wishlist</Link>
        <Link to="/cart">Cart ({totalItems})</Link>
        {user ? (
          <>
            <Link to="/account">Account</Link>
            {user.role === "admin" && <Link to="/admin">Admin</Link>}
            <button onClick={() => { logout(); nav("/"); }} className="link-btn">Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}
'

write_file "Frontend/src/components/ProductCard.jsx" '
import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      <Link to={`/product/${product._id}`}>
        <img src={product.images?.[0]?.url || "/placeholder.png"} alt={product.name} />
        <h3>{product.name}</h3>
      </Link>
      <div className="price">${product.price}</div>
    </div>
  );
}
'

write_file "Frontend/src/components/SearchBar.jsx" '
import React, { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [q, setQ] = useState("");
  const submit = (e) => { e.preventDefault(); onSearch(q); };
  return (
    <form onSubmit={submit} style={{ display: "flex", gap: 8 }}>
      <input placeholder="Search products..." value={q} onChange={e=>setQ(e.target.value)} />
      <button className="btn">Search</button>
    </form>
  );
}
'

write_file "Frontend/src/components/Filters.jsx" '
import React from "react";

export default function Filters({ onFilter }) {
  const apply = (e) => {
    e.preventDefault();
    const form = e.target;
    onFilter({
      category: form.category.value,
      min: form.min.value,
      max: form.max.value
    });
  };
  return (
    <form onSubmit={apply} className="filters">
      <select name="category">
        <option value="">All categories</option>
        <option value="men">Men</option>
        <option value="women">Women</option>
      </select>
      <input name="min" placeholder="Min price" />
      <input name="max" placeholder="Max price" />
      <button className="btn">Apply</button>
    </form>
  );
}
'

write_file "Frontend/src/components/Pagination.jsx" '
import React from "react";

export default function Pagination({ page, totalPages, onChange }) {
  return (
    <div className="pagination">
      <button onClick={()=>onChange(page-1)} disabled={page<=1}>Prev</button>
      <span>{page} / {totalPages}</span>
      <button onClick={()=>onChange(page+1)} disabled={page>=totalPages}>Next</button>
    </div>
  );
}
'

write_file "Frontend/src/components/AdminRoute.jsx" '
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminRoute({ children }) {
  const { user } = useAuth();
  if (!user || user.role !== "admin") return <Navigate to="/login" replace />;
  return children;
}
'

# context: AuthContext & CartContext
write_file "Frontend/src/context/AuthContext.jsx" '
import React, { createContext, useContext, useEffect, useState } from "react";
import API from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      API.get("/api/auth/me").then(r => setUser(r.data.data || r.data)).catch(() => { localStorage.removeItem("token"); });
    }
  }, []);
  const login = (token, userData) => {
    localStorage.setItem("token", token);
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setUser(userData);
  };
  const logout = () => {
    localStorage.removeItem("token");
    delete API.defaults.headers.common["Authorization"];
    setUser(null);
  };
  return <AuthContext.Provider value={{ user, setUser, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() { return useContext(AuthContext); }
'

write_file "Frontend/src/context/CartContext.jsx" '
import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const addToCart = (product, qty = 1, variant = null) => {
    setCart((c) => {
      const key = variant ? `${product._id}:${variant}` : product._id;
      const found = c.find((i) => i.key === key);
      if (found) {
        return c.map((i) => i.key === key ? { ...i, qty: i.qty + qty } : i);
      }
      return [...c, { key, product: product._id, qty, variant, snapshot: product }];
    });
  };
  const remove = (key) => setCart(c => c.filter(i => i.key !== key));
  const clear = () => setCart([]);
  return <CartContext.Provider value={{ cart, setCart, addToCart, remove, clear }}>{children}</CartContext.Provider>;
}

export function useCart() { return useContext(CartContext); }
'

# services: api.js
write_file "Frontend/src/services/api.js" '
import axios from "axios";
const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000",
  headers: { "Content-Type": "application/json" }
});
export default API;
'

# pages: Home, Shop, ProductPage, Cart, Checkout, Auth, Wishlist, Account, Admin
write_file "Frontend/src/pages/Home.jsx" '
import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <section className="hero">
        <h1>Welcome to Isoté</h1>
        <p>Luxury curated fashion</p>
        <Link to="/shop" className="btn">Shop Now</Link>
      </section>
    </div>
  );
}
'

write_file "Frontend/src/pages/Shop.jsx" '
import React, { useEffect, useState } from "react";
import API from "../services/api";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import Pagination from "../components/Pagination";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const fetch = (params = {}) => {
    API.get("/api/products", { params: { page, limit: 12, ...params } })
      .then(r => {
        setProducts(r.data.data || r.data);
        setTotalPages(r.data.totalPages || 1);
      })
      .catch(e => console.error(e));
  };
  useEffect(() => { fetch(); }, [page]);
  return (
    <div>
      <h2>Shop</h2>
      <SearchBar onSearch={(q) => fetch({ q })} />
      <Filters onFilter={(f) => fetch(f)} />
      <div className="grid">
        {products.map(p => <ProductCard key={p._id} product={p} />)}
      </div>
      <Pagination page={page} totalPages={totalPages} onChange={(p)=>setPage(p)} />
    </div>
  );
}
'

write_file "Frontend/src/pages/Product/ProductPage.jsx" '
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../services/api";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [selectedVariant, setSelectedVariant] = useState(null);
  useEffect(() => {
    API.get(`/api/products/${id}`).then(r => setProduct(r.data.data || r.data)).catch(console.error);
  }, [id]);

  if (!product) return <div>Loading...</div>;
  const add = () => addToCart(product, 1, selectedVariant);
  return (
    <div className="product-page">
      <img src={product.images?.[0]?.url || "/placeholder.png"} alt={product.name} />
      <div>
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <div className="price">${product.price}</div>

        {product.sizes?.length > 0 && (
          <div>
            <label>Size</label>
            <select onChange={(e)=>setSelectedVariant(e.target.value)}>
              <option value="">Select size</option>
              {product.sizes.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        )}

        <button onClick={add} className="btn">Add to cart</button>

        <hr />
        <h3>Reviews</h3>
        <ul>
          {product.reviews?.map(r => <li key={r._id}><strong>{r.userName}</strong>: {r.comment}</li>)}
        </ul>
        {user && <p>Thanks for being logged in — you can leave a review in the future.</p>}
      </div>
    </div>
  );
}
'

write_file "Frontend/src/pages/Cart.jsx" '
import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, remove, clear } = useCart();
  const total = cart.reduce((s, i) => s + (i.snapshot?.price || 0) * i.qty, 0);
  return (
    <div>
      <h2>Your Cart</h2>
      {cart.length === 0 ? <p>Your cart is empty. <Link to="/shop">Shop</Link></p> : (
        <>
          <ul>
            {cart.map(i => (
              <li key={i.key}>
                {i.snapshot?.name} {i.variant ? `(${i.variant})` : ""} x {i.qty} - ${(i.snapshot?.price || 0) * i.qty}
                <button onClick={()=>remove(i.key)}>Remove</button>
              </li>
            ))}
          </ul>
          <div>Total: ${total}</div>
          <Link to="/checkout" className="btn">Checkout</Link>
          <button onClick={clear}>Clear</button>
        </>
      )}
    </div>
  );
}
'

write_file "Frontend/src/pages/Checkout.jsx" '
import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import API from "../services/api";
import { useCart } from "../context/CartContext";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "");

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const { cart, clear } = useCart();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await API.post("/api/checkout/create-payment-intent", {
      items: cart.map(i => ({ productId: i.product, quantity: i.qty }))
    });
    const clientSecret = res.data.clientSecret || res.data.client_secret;
    if (!clientSecret) { alert("Payment intent creation failed"); setLoading(false); return; }
    const card = elements.getElement(CardElement);
    const result = await stripe.confirmCardPayment(clientSecret, { payment_method: { card } });
    setLoading(false);
    if (result.error) alert(result.error.message);
    else if (result.paymentIntent && result.paymentIntent.status === "succeeded") {
      alert("Payment succeeded!");
      clear();
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button className="btn" disabled={!stripe || loading}>{loading ? "Processing..." : "Pay"}</button>
    </form>
  );
}

export default function Checkout() {
  const publishable = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
  if (!publishable) return <div>Please set VITE_STRIPE_PUBLISHABLE_KEY in Frontend/.env</div>;
  return (
    <Elements stripe={stripePromise}>
      <h2>Checkout</h2>
      <CheckoutForm />
    </Elements>
  );
}
'

write_file "Frontend/src/pages/Auth/Login.jsx" '
import React, { useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();
  const { login } = useAuth();
  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/api/auth/login", { email, password });
      if (res.data.token) {
        const token = res.data.token;
        const user = res.data.user || res.data.data;
        login(token, user);
        nav("/");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };
  return (
    <form onSubmit={submit}>
      <h2>Login</h2>
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      <button className="btn">Login</button>
    </form>
  );
}
'

write_file "Frontend/src/pages/Auth/Register.jsx" '
import React, { useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();
  const submit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/api/auth/register", { name, email, password });
      alert("Registered. Please login.");
      nav("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };
  return (
    <form onSubmit={submit}>
      <h2>Register</h2>
      <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      <button className="btn">Register</button>
    </form>
  );
}
'

write_file "Frontend/src/pages/Wishlist.jsx" '
import React, { useState, useEffect } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

export default function Wishlist() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    API.get("/api/auth/wishlist").then(r => setItems(r.data.data || r.data)).catch(() => setItems([]));
  }, []);
  return (
    <div>
      <h2>Your Wishlist</h2>
      {items.length === 0 ? <p>No items in wishlist.</p> : (
        <ul>
          {items.map(i => <li key={i._id}><Link to={`/product/${i._id}`}>{i.name}</Link></li>)}
        </ul>
      )}
    </div>
  );
}
'

write_file "Frontend/src/pages/Account/Account.jsx" '
import React, { useEffect, useState } from "react";
import API from "../../services/api";

export default function Account() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    API.get("/api/orders").then(r => setOrders(r.data.data || r.data)).catch(console.error);
  }, []);
  return (
    <div>
      <h2>Your Account</h2>
      <h3>Orders</h3>
      <ul>
        {orders.map(o => <li key={o._id}>#{o._id} - {o.status} - ${o.total}</li>)}
      </ul>
    </div>
  );
}
'

write_file "Frontend/src/pages/Admin/AdminDashboard.jsx" '
import React, { useEffect, useState } from "react";
import API from "../../services/api";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const [stats, setStats] = useState({});
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    API.get("/api/admin/dashboard").then(r => setStats(r.data)).catch(()=>{});
    API.get("/api/admin/orders").then(r => setOrders(r.data.data || r.data)).catch(()=>{});
  }, []);
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div>Sales: ${stats.totalSales || 0}</div>
      <h3>Recent Orders</h3>
      <ul>
        {orders.map(o => <li key={o._id}>#{o._id} - {o.status}</li>)}
      </ul>
      <Link to="/admin/products/new" className="btn">Create Product</Link>
    </div>
  );
}
'

write_file "Frontend/src/pages/Admin/AdminProductForm.jsx" '
import React, { useEffect, useState } from "react";
import API from "../../services/api";
import { useNavigate, useParams } from "react-router-dom";

export default function AdminProductForm({ edit=false }) {
  const { id } = useParams();
  const [product, setProduct] = useState({ name:"", description:"", price:0, sizes:[], images:[] });
  const nav = useNavigate();
  useEffect(() => {
    if (edit && id) API.get(`/api/products/${id}`).then(r=>setProduct(r.data.data||r.data));
  }, [edit,id]);
  const submit = async (e) => {
    e.preventDefault();
    try {
      if (edit) await API.put(`/api/products/${id}`, product);
      else await API.post("/api/products", product);
      nav("/admin");
    } catch (err) { alert("Save failed"); }
  };
  return (
    <form onSubmit={submit}>
      <h2>{edit ? "Edit" : "Create"} Product</h2>
      <input placeholder="Name" value={product.name} onChange={e=>setProduct({...product, name:e.target.value})} />
      <textarea placeholder="Description" value={product.description} onChange={e=>setProduct({...product, description:e.target.value})} />
      <input type="number" placeholder="Price" value={product.price} onChange={e=>setProduct({...product, price:parseFloat(e.target.value||0)})} />
      <input placeholder="Sizes (comma separated)" value={product.sizes?.join(",")} onChange={e=>setProduct({...product, sizes:e.target.value.split(",").map(s=>s.trim())})} />
      <button className="btn">{edit ? "Save" : "Create"}</button>
    </form>
  );
}
'

# styles
write_file "Frontend/src/styles.css" '
:root { --accent:#111827; --muted:#6b7280; }
body { font-family: Inter, system-ui, Arial; margin:0; color:#111; background:#fafafa; }
.container { padding: 20px; max-width: 1100px; margin: 0 auto; }
.nav { display:flex; justify-content:space-between; padding:10px 20px; background:#fff; box-shadow:0 1px 0 rgba(0,0,0,0.04); }
.logo { font-weight:700; }
.nav-links a, .nav-links .link-btn { margin-left: 12px; }
.hero { padding:40px 0; text-align:center; }
.grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(220px,1fr)); gap:16px; }
.product-card { border:1px solid #eee; padding:12px; border-radius:6px; text-align:center; background:#fff; }
.product-card img { width:100%; height:200px; object-fit:cover; border-radius:6px 6px 0 0; }
.product-page { display:flex; gap:20px; align-items:flex-start; }
.price { font-weight:700; margin-top:8px; }
.btn { background:var(--accent); color:#fff; padding:8px 12px; border-radius:6px; text-decoration:none; border:none; cursor:pointer; }
input, textarea, select { display:block; padding:8px; margin:8px 0; width:100%; max-width:420px; }
.filters { display:flex; gap:8px; align-items:center; margin:12px 0; }
.pagination { margin-top:16px; display:flex; gap:8px; align-items:center; }
'

# public assets placeholder
write_file "Frontend/public/placeholder.png" ''
# (empty placeholder file - you can replace with a real image)

# Frontend README
write_file "Frontend/README.md" '
Frontend (Vite + React) extended scaffold.

Environment:
  Create Frontend/.env with:
    VITE_API_BASE_URL=http://localhost:5000
    VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...

Install:
  cd Frontend
  npm install
  npm run dev

Notes:
- The scaffold expects backend API routes as documented in project README.
- Admin routes require a user with role "admin".
'

echo
echo "Extended generation complete."
echo
echo "Next steps (run from repo root):"
echo "  1. Review changes: git status"
echo "  2. Install Backend dev deps: cd Backend && npm install --save-dev jest supertest cross-env nodemon"
echo "  3. Install Frontend deps: cd Frontend && npm install"
echo "  4. Create Frontend/.env with VITE_API_BASE_URL and VITE_STRIPE_PUBLISHABLE_KEY"
echo "  5. Run Backend tests: cd Backend && npm test"
echo "  6. Start locally with docker-compose: docker-compose up --build"
echo
echo "If you want, I can next:"
echo " - generate a git patch or open a PR with these changes (say 'open a PR'),"
echo " - add GitHub Actions MongoDB memory-server or service tuning,"
echo " - add Cypress E2E tests for critical flows,"
echo " - or customize admin UX/validation."
echo
echo "Done."