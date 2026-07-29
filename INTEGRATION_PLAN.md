# Aetheris Luxe – Full Dynamic Integration Plan

> **Goal:** Connect every static/mock-data page to the Laravel 12 API.  
> **Order:** Phase 1 → Admin Panel → Phase 2 → Seller Panel → Phase 3 → Buyer/Store Frontend  
> **Base URL (dev):** `http://localhost:8000/api`

---

## ✅ Already Done
- `/admin/login` — wired to `POST /auth/login` with role-check (`role === 'admin'`)
- Admin Login page UI exists at `/admin/login` ✅

---

## 🔧 Shared Infrastructure (Do This First)

| Task | File |
|---|---|
| Axios instance with token interceptor | `src/lib/axios.ts` |
| Global auth store (Zustand) | `src/store/useAuthStore.ts` |
| Route guard middleware | `src/middleware.ts` |
| Reusable LoadingSkeleton component | `src/components/ui/Skeleton.tsx` |
| Toast notifications (Sonner) | `src/app/layout.tsx` |
| API type definitions | `src/types/api.ts` |

---

## 🔴 PHASE 1 — Admin Panel

### Step 1 — Route Guard Middleware
- Protect all `/admin/*` routes → redirect to `/admin/login` if no token or role != admin

### Step 2 — Admin Dashboard (`/admin/dashboard`)
- `GET /admin/stats` → KPI cards (sellers, buyers, orders, revenue)
- `GET /admin/recent-orders?limit=5` → orders table
- Replace mock stat cards and orders with live data + skeletons

### Step 3 — Sellers Directory (`/admin/sellers`)
- `GET /admin/sellers?page=1&status=all&plan=all&search=`
- `PATCH /admin/sellers/{id}/toggle-status` → suspend/activate
- Wire filter tabs, search box (debounced), pagination
- Connect toggle switch + confirmation modal to API

### Step 4 — KYC Verification Queue (build + wire)
- Build from `kyc_verification_queue_aetheris_luxe` Figma
- `GET /admin/kyc?status=pending`
- `POST /admin/kyc/{id}/approve` and `POST /admin/kyc/{id}/reject`

### Step 5 — Platform Settings
- Build from `platform_settings_aetheris_luxe` Figma
- `GET /admin/settings` / `PUT /admin/settings`

### Step 6 — Subscription Plans Config
- Build from `subscription_plans_config_aetheris_luxe` Figma
- `GET /admin/subscription-plans` / `PUT /admin/subscription-plans/{id}`

### Step 7 — Payouts Ledger
- Build from `payouts_ledger_aetheris_luxe` Figma
- `GET /admin/payouts?page=1&status=pending`
- `POST /admin/payouts/{id}/approve`

---

## 🟡 PHASE 2 — Seller Panel

### Step 8 — Seller Auth & Route Guard
- `/seller/login` → `POST /auth/login` role check (`role === 'seller'`)
- `/seller/register` → `POST /auth/seller/register`
- Protect all `/seller/*` routes in middleware
- Store `store_id` in auth store after login

### Step 9 — Seller Dashboard (`/seller/dashboard`)
- `GET /seller/dashboard/stats` → revenue, orders, products, views
- `GET /seller/recent-orders?limit=5`
- Replace mock stats and orders table

### Step 10 — Product Catalog (`/seller/products`)
- `GET /seller/products?page=1&status=all&search=`
- `DELETE /seller/products/{id}`
- Wire search, filter tabs, pagination, delete

### Step 11 — Create/Edit Product
- `GET /admin/categories` → category dropdown
- `GET /admin/attributes` → attribute builder
- `POST /seller/products` → create
- `PUT /seller/products/{id}` → edit
- `POST /upload/images` → image upload

### Step 12 — Seller Orders
- Build from `seller_orders_dispatch` Figma designs (3 variants)
- `GET /seller/orders?page=1&status=all`
- `PATCH /seller/orders/{id}/dispatch`

### Step 13 — Seller Earnings & Payouts
- Build from `seller_earnings_aetheris_luxe` and `seller_payouts_aetheris_luxe`
- `GET /seller/earnings/stats`
- `GET /seller/payouts?page=1` / `POST /seller/payouts/request`

### Step 14 — Seller KYC (`/seller/kyc`)
- `GET /seller/kyc/status`
- `POST /seller/kyc/submit` (multipart with documents)

### Step 15 — Seller Subscription
- Build from `seller_subscription_aetheris_luxe` Figma
- `GET /seller/subscription/current` / `POST /seller/subscription/upgrade`

---

## 🟢 PHASE 3 — Buyer / Store Frontend

### Step 16 — Buyer Auth
- `/login` → `POST /auth/login` with `role === 'buyer'` check
- `/register` → `POST /auth/buyer/register`
- Protect `/profile`, `/orders`, `/cart`, `/wishlist`, `/wallet` in middleware

### Step 17 — Homepage (`/`)
- `GET /homepage/featured-products`
- `GET /homepage/featured-sellers`
- `GET /categories?featured=true`

### Step 18 — Category Browser (`/categories`)
- `GET /products?category=&price_min=&price_max=&brand=&color=&rating=&page=1`
- `GET /categories` → sidebar category list
- Wire all sidebar filters as URL query params
- Connect wishlist toggle → `POST /buyer/wishlist/{product_id}`

### Step 19 — Product Detail (`/products/[id]`)
- `GET /products/{id}`
- `GET /products/{id}/reviews`
- `POST /cart/add` → Add to Cart
- `POST /buyer/wishlist/{id}` → Favorite

### Step 20 — Seller Storefront (`/stores/[id]`)
- `GET /stores/{id}` → store profile
- `GET /stores/{id}/products?page=1&tab=new`
- `POST /buyer/followed-stores/{id}` → Follow Store

### Step 21 — Search (`/search`)
- `GET /search?q=&page=1`
- Build from `search_results_aetheris_luxe` Figma

### Step 22 — Cart (`/cart`)
- `GET /cart`
- `PATCH /cart/{item_id}` → update qty
- `DELETE /cart/{item_id}` → remove
- `POST /cart/coupon` → apply promo code

### Step 23 — Checkout (`/checkout`)
- `GET /buyer/addresses`
- `GET /shipping-methods` / `GET /payment-methods`
- `POST /orders` → place order → redirect to `/order-confirmation`

### Step 24 — Orders History & Detail
- `GET /buyer/orders?page=1`
- `GET /buyer/orders/{id}`

### Step 25 — Profile, Wallet, Wishlist
- `GET /buyer/profile` / `PUT /buyer/profile`
- `GET /buyer/wallet`
- `GET /buyer/wishlist`

---

## 🚀 Execution Order Summary

```
Shared Infra → Phase 1 (Admin) → Phase 2 (Seller) → Phase 3 (Buyer)
Steps:  Infra → 1→7  →  8→15  →  16→25
```
