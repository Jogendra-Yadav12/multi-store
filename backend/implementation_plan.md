# 🛒 Multi-Vendor E-Commerce Platform — Unified Master Implementation Plan

This document integrates all prior plan details into a single, cohesive blueprint for building the multi-vendor marketplace using **Next.js (Frontend)**, **Laravel (Backend API)**, and **PostgreSQL via NeonDB (Database)**.

---

## 🏗️ Architecture Overview

```
┌──────────────────────────────────────────────────┐
│              NEXT.JS FRONTEND                    │
│  ┌──────────┐  ┌──────────┐  ┌───────────────┐  │
│  │ Buyer UI │  │Seller UI │  │  Admin Panel  │  │
│  └──────────┘  └──────────┘  └───────────────┘  │
└──────────────────────┬───────────────────────────┘
                       │ REST API (JSON)
┌──────────────────────▼───────────────────────────┐
│              LARAVEL BACKEND (API)               │
│  ┌──────────┐  ┌──────────┐  ┌───────────────┐  │
│  │   Auth   │  │ Products │  │  Orders/Pay   │  │
│  └──────────┘  └──────────┘  └───────────────┘  │
└──────────────────────┬───────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────┐
│        POSTGRESQL — NeonDB (Serverless)          │
└──────────────────────────────────────────────────┘
```

---

## 👥 User Roles & Access Summary

| Role | Description |
|------|-------------|
| **Super Admin (You)** | Full control over the marketplace: manage sellers, categories, attributes, payments, shipping, subscription plans, commissions, reports, security logs, and payouts. |
| **Seller** | Registers/logs in, completes KYC, selects a subscription plan, manages store details, lists products (with dynamic category attributes/variants), manages orders/shipments, tracks earnings, and requests payouts. |
| **Buyer** | Browses/searches products, filters by category/attributes, adds to cart, checks out, tracks split orders, manages wallet/wishlist/addresses, and leaves reviews. |

---

## 📋 Seller Subscription Tiers

Admin can create, edit, or deactivate plans dynamically. Below is the standard comparison of the 4 initial tiers:

| Feature | 🆓 Free | 👁️ Showcase | 📅 Monthly Pro | 📆 Yearly Pro |
|---------|---------|------------|---------------|--------------|
| **Price** | ₹0 | ₹199/month | ₹499/month | ₹4,999/year |
| **Products Listed** | 10 max | 20 max | Unlimited | Unlimited |
| **Buyers Can Purchase** | ✅ Yes (`can_sell: true`) | ❌ View Only (`can_sell: false`) | ✅ Yes | ✅ Yes |
| **Commission** | 10% | 0% (no sales) | 0% | 0% |
| **Seller Info in UI** | ❌ Anonymous (`show_seller_info: false`) | ❌ Anonymous (`show_seller_info: false`) | ✅ Shown (`show_seller_info: true`) | ✅ Shown (`show_seller_info: true`) |
| **"Pro" Badge** | ❌ | ❌ | ✅ | ✅ |
| **Priority Listing** | ❌ | ❌ | ✅ | ✅ |
| **Analytics** | Basic | Basic | Full | Full |

### Showcase Plan Contact Exposure
Showcase sellers want catalog exposure without in-app purchase capabilities. Admin can configure one or both contact options:
1. **Option A: Lead Fee**: Buyer pays a small fee (e.g., ₹9) via Razorpay to unlock the seller's contact details (phone, email, WhatsApp). The fee is split (e.g., 50% admin, 50% seller).
2. **Option B: In-App Chat**: Buyer communicates with the seller through the platform's message system without exposing real contact details.

---

## 🗄️ Complete Database Schema (PostgreSQL)

### 1. Users & Authentication
```
users
├── id (bigint, PK)
├── name (varchar)
├── email (varchar, unique)
├── password (varchar)
├── role (varchar) → 'admin' / 'seller' / 'buyer'
├── status (varchar) → 'active' / 'banned' / 'pending' / 'suspended'
├── email_verified_at (timestamp, nullable)
├── avatar (varchar, nullable)
├── phone (varchar, nullable)
├── last_login_at (timestamp, nullable)
└── timestamps
```

### 2. Seller Store Profiles & KYC
```
seller_profiles
├── id (bigint, PK)
├── user_id (FK → users.id)
├── store_name (varchar)
├── store_slug (varchar, unique)
├── store_logo (varchar, nullable)
├── store_banner (varchar, nullable)
├── store_description (text, nullable)
├── contact_email (varchar, nullable)
├── contact_phone (varchar, nullable)
├── address (jsonb) → {street, city, state, pincode}
├── bank_details (text) → encrypted JSON {account_no, ifsc, account_name}
├── gst_number (varchar, nullable)
├── status (varchar) → 'pending' / 'approved' / 'rejected' / 'suspended'
├── rejection_reason (text, nullable)
├── approved_at (timestamp, nullable)
├── deleted_at (timestamp, nullable)  ← soft deletes
└── timestamps

seller_kyc
├── id (bigint, PK)
├── seller_id (FK → users.id)
├── status (varchar) → 'pending' / 'under_review' / 'approved' / 'rejected'
├── full_legal_name (varchar)
├── pan_number (text) → encrypted at rest
├── pan_image (varchar) → secure URL
├── aadhaar_number (text) → encrypted at rest (last 4 digits shown in UI)
├── aadhaar_front (varchar) → secure URL
├── aadhaar_back (varchar) → secure URL
├── gst_number (varchar, nullable)
├── bank_account_number (text) → encrypted
├── bank_ifsc (text) → encrypted
├── bank_account_name (varchar)
├── cancelled_cheque (varchar) → secure URL
├── selfie_with_id (varchar, nullable)
├── rejection_reason (text, nullable)
├── reviewed_by (FK → users.id, nullable)
├── submitted_at (timestamp)
├── reviewed_at (timestamp, nullable)
└── timestamps
```

### 3. Customer (Buyer) Accounts
```
user_addresses
├── id (bigint, PK)
├── user_id (FK → users.id)
├── label (varchar) → e.g. 'Home', 'Office'
├── full_name (varchar)
├── phone (varchar)
├── address_line_1 (varchar)
├── address_line_2 (varchar, nullable)
├── city (varchar)
├── state (varchar)
├── pincode (varchar)
├── country (varchar) → default 'India'
├── is_default (boolean) → default false
└── timestamps

user_wishlist
├── id (bigint, PK)
├── user_id (FK → users.id)
├── product_id (FK → products.id)
└── created_at (timestamp)

user_wallet
├── id (bigint, PK)
├── user_id (FK → users.id)
├── balance (decimal, 10,2) → default 0.00
└── timestamps

wallet_transactions
├── id (bigint, PK)
├── user_id (FK → users.id)
├── type (varchar) → 'credit' / 'debit'
├── amount (decimal, 10,2)
├── reason (varchar) → 'refund', 'cashback', 'manual_add'
├── reference_id (varchar, nullable)
└── timestamps
```

### 4. Dynamic Categories & Attributes
```
categories
├── id (bigint, PK)
├── parent_id (FK → categories.id, nullable) → NULL = top-level
├── name (varchar)
├── slug (varchar, unique)
├── icon (varchar, nullable)
├── image (varchar, nullable)
├── sort_order (integer) → default 0
├── is_active (boolean) → default true
├── deleted_at (timestamp, nullable)  ← soft deletes
└── timestamps

attribute_groups
├── id (bigint, PK)
├── name (varchar) → e.g. "Gender", "Size", "Electronics Spec"
└── timestamps

attributes
├── id (bigint, PK)
├── attribute_group_id (FK → attribute_groups.id)
├── category_id (FK → categories.id) → links attribute to specific category
├── name (varchar) → e.g. "Size", "RAM"
├── type (varchar) → 'select' / 'multi-select' / 'text' / 'number' / 'boolean' / 'color'
├── is_required (boolean) → default false
├── is_filterable (boolean) → default true
├── is_variant_maker (boolean) → default false → generates SKU variants
└── timestamps

attribute_values
├── id (bigint, PK)
├── attribute_id (FK → attributes.id)
├── value (varchar) → e.g. "S", "M", "16GB", "Red"
└── timestamps
```

### 5. Products & Variants
```
products
├── id (bigint, PK)
├── seller_id (FK → users.id)
├── category_id (FK → categories.id)
├── name (varchar)
├── slug (varchar, unique)
├── short_description (text, nullable)
├── description (text) → Rich text support
├── base_price (decimal, 10,2)
├── compare_price (decimal, 10,2, nullable) → Original MRP for discount %
├── status (varchar) → 'draft' / 'active' / 'rejected' / 'archived'
├── admin_approved (boolean) → default false
├── is_featured (boolean) → default false
├── meta_title (varchar, nullable)
├── meta_description (text, nullable)
├── deleted_at (timestamp, nullable)  ← soft deletes
└── timestamps

product_images
├── id (bigint, PK)
├── product_id (FK → products.id)
├── image_path (varchar)
├── sort_order (integer) → default 0
├── is_primary (boolean) → default false
└── timestamps

product_attribute_values
├── id (bigint, PK)
├── product_id (FK → products.id)
├── attribute_id (FK → attributes.id)
├── attribute_value_id (FK → attribute_values.id, nullable) → for select types
├── custom_value (text, nullable) → for custom text/number attributes
└── timestamps

product_variants
├── id (bigint, PK)
├── product_id (FK → products.id)
├── sku (varchar, unique)
├── price (decimal, 10,2)
├── compare_price (decimal, 10,2, nullable)
├── stock_quantity (integer) → default 0
├── low_stock_alert (integer, nullable) → low stock threshold
├── deleted_at (timestamp, nullable)  ← soft deletes
└── timestamps

product_variant_attributes
├── id (bigint, PK)
├── variant_id (FK → product_variants.id)
├── attribute_id (FK → attributes.id)
├── attribute_value_id (FK → attribute_values.id)
└── timestamps
```

### 6. Payment, Shipping & Coupons
```
payment_methods
├── id (bigint, PK)
├── name (varchar) → e.g. "Razorpay", "Cash on Delivery"
├── code (varchar, unique) → e.g. "razorpay", "cod"
├── logo (varchar, nullable)
├── description (text, nullable)
├── is_active (boolean) → default true
├── sort_order (integer) → default 0
├── config (text) → encrypted JSON API credentials
└── timestamps

shipping_methods
├── id (bigint, PK)
├── name (varchar) → e.g. "Standard Delivery", "Express"
├── code (varchar, unique)
├── logo (varchar, nullable)
├── description (text, nullable)
├── base_cost (decimal, 10,2)
├── estimated_days (varchar) → e.g. "3-5 business days"
├── is_active (boolean) → default true
├── sort_order (integer) → default 0
├── conditions (jsonb, nullable) → e.g. {free_above: 500}
└── timestamps

shipping_zones
├── id (bigint, PK)
├── name (varchar) → e.g. "Delhi NCR", "Maharashtra"
├── countries (jsonb)
├── states (jsonb)
└── timestamps

shipping_rates
├── id (bigint, PK)
├── method_id (FK → shipping_methods.id)
├── zone_id (FK → shipping_zones.id)
├── rate (decimal, 10,2)
└── timestamps

coupons
├── id (bigint, PK)
├── code (varchar, unique)
├── type (varchar) → 'percentage' / 'fixed'
├── value (decimal, 10,2)
├── min_order_amount (decimal, 10,2) → default 0.00
├── max_uses (integer, nullable)
├── used_count (integer) → default 0
├── seller_id (FK → users.id, nullable) → NULL = admin-wide coupon
├── valid_from (timestamp)
├── valid_until (timestamp)
├── is_active (boolean) → default true
├── deleted_at (timestamp, nullable)  ← soft deletes
└── timestamps
```

### 7. Subscriptions & Showcase Leads
```
subscription_plans
├── id (bigint, PK)
├── name (varchar) → "Free", "Showcase", "Monthly Pro", "Yearly Pro"
├── slug (varchar, unique)
├── price (decimal, 10,2)
├── duration_days (integer, nullable) → NULL = lifetime
├── commission_rate (decimal, 5,2) → e.g. 10.00 / 0.00
├── max_products (integer, nullable) → max limit, NULL = unlimited
├── can_sell (boolean) → default true (false for Showcase)
├── show_seller_info (boolean) → default false (true for Pros)
├── features (jsonb, nullable) → features payload
├── is_active (boolean) → default true
└── timestamps

seller_subscriptions
├── id (bigint, PK)
├── seller_id (FK → users.id)
├── plan_id (FK → subscription_plans.id)
├── started_at (timestamp)
├── expires_at (timestamp, nullable) → NULL for Free
├── status (varchar) → 'active' / 'expired' / 'cancelled'
├── auto_renew (boolean) → default true
├── payment_ref (varchar, nullable)
└── timestamps

leads
├── id (bigint, PK)
├── showcase_seller_id (FK → users.id)
├── buyer_id (FK → users.id)
├── product_id (FK → products.id, nullable)
├── fee_amount (decimal, 10,2)
├── payment_ref (varchar) → transaction ID
├── contact_revealed_at (timestamp)
├── seller_lead_share (decimal, 5,2)
├── admin_lead_share (decimal, 5,2)
└── timestamps
```

### 8. Cart, Orders & Split Shipments
Because one order can contain products from different sellers, each seller ships independently and gets a split shipment entry, while the master order tracks overall payment and billing.
```
carts
├── id (bigint, PK)
├── user_id (FK → users.id, nullable) → NULL for guest carts
├── session_id (varchar, nullable) → for guest carts
└── timestamps

cart_items
├── id (bigint, PK)
├── cart_id (FK → carts.id)
├── product_id (FK → products.id)
├── variant_id (FK → product_variants.id, nullable)
├── quantity (integer) → default 1
└── timestamps

orders
├── id (bigint, PK)
├── order_number (varchar, unique) → e.g. ORD-2026-000001
├── buyer_id (FK → users.id)
├── overall_status (varchar) → 'pending'/'confirmed'/'partially_shipped'/'delivered'/'cancelled'
├── payment_method_id (FK → payment_methods.id)
├── payment_status (varchar) → 'pending' / 'paid' / 'failed' / 'refunded'
├── shipping_method_id (FK → shipping_methods.id)
├── shipping_address (jsonb) → snapshot {name, phone, address, city, pincode}
├── billing_address (jsonb, nullable)
├── subtotal (decimal, 10,2)
├── shipping_cost (decimal, 10,2)
├── discount_amount (decimal, 10,2) → default 0.00
├── coupon_code (varchar, nullable)
├── tax_amount (decimal, 10,2) → default 0.00
├── total (decimal, 10,2)
├── notes (text, nullable)
├── cancelled_reason (text, nullable)
├── refund_reason (text, nullable)
└── timestamps

order_items
├── id (bigint, PK)
├── order_id (FK → orders.id)
├── seller_id (FK → users.id)
├── product_id (FK → products.id)
├── variant_id (FK → product_variants.id, nullable)
├── product_name (varchar) → Snapshot name
├── variant_info (jsonb, nullable) → Snapshot variant specifications
├── product_image (varchar, nullable)
├── quantity (integer)
├── unit_price (decimal, 10,2)
├── total_price (decimal, 10,2) → qty × unit_price
├── commission_rate (decimal, 5,2) → Snapshot rate from seller's subscription at order time
├── commission_amount (decimal, 10,2) → admin's cut
├── seller_earning (decimal, 10,2) → seller's cut
├── status (varchar) → 'pending'/'confirmed'/'shipped'/'delivered'/'cancelled'
└── timestamps

order_payments
├── id (bigint, PK)
├── order_id (FK → orders.id)
├── payment_method_id (FK → payment_methods.id)
├── transaction_id (varchar) → gateway transaction reference
├── amount (decimal, 10,2)
├── status (varchar) → 'pending' / 'success' / 'failed' / 'refunded'
├── gateway_response (jsonb, nullable)
└── timestamps

order_shipments
├── id (bigint, PK)
├── order_id (FK → orders.id)
├── seller_id (FK → users.id)
├── status (varchar) → 'pending'/'packed'/'shipped'/'out_for_delivery'/'delivered'/'failed'
├── courier_name (varchar, nullable)
├── tracking_number (varchar, nullable)
├── tracking_url (varchar, nullable)
├── label_url (varchar, nullable)
├── estimated_delivery_date (date, nullable)
├── shipped_at (timestamp, nullable)
├── delivered_at (timestamp, nullable)
└── timestamps

order_shipment_items
├── id (bigint, PK)
├── shipment_id (FK → order_shipments.id)
├── order_item_id (FK → order_items.id)
├── quantity_shipped (integer)
└── timestamps

order_tracking
├── id (bigint, PK)
├── order_id (FK → orders.id)
├── order_item_id (FK → order_items.id, nullable) → item/shipment specific event
├── status (varchar)
├── message (text) → e.g. "Dispatched from Mumbai hub"
├── location (varchar, nullable)
├── updated_by (varchar) → 'admin' / 'seller' / 'system'
└── created_at (timestamp)
```

### 9. Return Requests & Refunds
```
return_requests
├── id (bigint, PK)
├── order_id (FK → orders.id)
├── order_item_id (FK → order_items.id)
├── buyer_id (FK → users.id)
├── seller_id (FK → users.id)
├── reason (varchar) → 'wrong_item'/'damaged'/'not_as_described'/'changed_mind'
├── description (text, nullable)
├── images (jsonb, nullable) → array of proof photos
├── status (varchar) → 'requested' / 'approved' / 'rejected' / 'item_received' / 'refunded'
├── admin_note (text, nullable)
├── resolution (varchar, nullable) → 'refund' / 'replacement' / 'store_credit'
├── requested_at (timestamp)
└── resolved_at (timestamp, nullable)

return_shipments
├── id (bigint, PK)
├── return_request_id (FK → return_requests.id)
├── courier_name (varchar)
├── tracking_number (varchar)
├── tracking_url (varchar, nullable)
├── shipped_at (timestamp)
└── received_at (timestamp, nullable)

refunds
├── id (bigint, PK)
├── order_id (FK → orders.id)
├── return_request_id (FK → return_requests.id, nullable) → NULL = direct refund (order cancel)
├── buyer_id (FK → users.id)
├── seller_id (FK → users.id)
├── amount (decimal, 10,2)
├── method (varchar) → 'original_payment' / 'store_credit' / 'manual_bank_transfer'
├── gateway_refund_id (varchar, nullable)
├── status (varchar) → 'pending' / 'processing' / 'completed' / 'failed'
├── reason (text, nullable)
├── initiated_by (varchar) → 'buyer' / 'seller' / 'admin'
├── initiated_at (timestamp)
└── completed_at (timestamp, nullable)
```

### 10. Earnings, Payouts & Messaging
```
seller_earnings
├── id (bigint, PK)
├── seller_id (FK → users.id)
├── order_item_id (FK → order_items.id)
├── gross_amount (decimal, 10,2)
├── commission_rate (decimal, 5,2)
├── commission_amount (decimal, 10,2)
├── net_earning (decimal, 10,2)
├── status (varchar) → 'pending' / 'cleared' / 'paid'
└── timestamps

seller_payouts
├── id (bigint, PK)
├── seller_id (FK → users.id)
├── amount_requested (decimal, 10,2)
├── amount_paid (decimal, 10,2, nullable)
├── method (varchar) → 'bank_transfer' / 'UPI' / 'PayPal'
├── bank_details_snapshot (jsonb) → Snapshot of bank settings used
├── status (varchar) → 'requested' / 'processing' / 'completed' / 'rejected'
├── rejection_reason (text, nullable)
├── reference_number (varchar, nullable) → Transaction ID
├── requested_at (timestamp)
└── paid_at (timestamp, nullable)

commission_rules
├── id (bigint, PK)
├── seller_id (FK → users.id, nullable) → NULL = global override
├── category_id (FK → categories.id, nullable) → NULL = category override
├── rate (decimal, 5,2) → override commission rate %
├── priority (integer) → default 0
├── is_active (boolean) → default true
└── timestamps

conversations
├── id (bigint, PK)
├── buyer_id (FK → users.id)
├── seller_id (FK → users.id)
├── product_id (FK → products.id, nullable)
├── status (varchar) → 'open' / 'closed' / 'archived'
└── timestamps

messages
├── id (bigint, PK)
├── conversation_id (FK → conversations.id)
├── sender_id (FK → users.id)
├── body (text)
├── attachments (jsonb, nullable) → array of URLs
├── is_read (boolean) → default false
└── timestamps

notifications
├── id (bigint, PK)
├── user_id (FK → users.id)
├── type (varchar) → 'order_placed', 'shipped', 'payout', 'plan_expiry', etc.
├── title (varchar)
├── message (text)
├── data (jsonb, nullable) → optional metadata payload
├── is_read (boolean) → default false
└── created_at (timestamp)
```

---

## ⚡ Enterprise-Grade Enhancements

### 1. Concurrency & Race Condition Prevention
To prevent overselling of high-demand items during sales, the checkout API will perform stock checking and deduction inside database transactions using PostgreSQL pessimistic locking (`lockForUpdate()`):
- When checking stock, Laravel will execute `ProductVariant::where('id', $variant_id)->lockForUpdate()->first()`.
- This blocks other operations from modifying that variant's stock until the current checkout transaction commits or rolls back.

### 2. Soft Deletes for Historical Integrity
To prevent database orphan errors and preserve sales records when sellers delete products, categories, or coupons:
- Use Laravel's `SoftDeletes` trait on `categories`, `products`, `product_variants`, `coupons`, and `seller_profiles` tables (`deleted_at` timestamp).
- Order items will reference the soft-deleted product details seamlessly.

### 3. Background Job Queues
To keep APIs fast and responsive, time-consuming operations will be dispatched to Laravel Queues (database queue driver or Redis):
- Send Order Confirmation Emails (e.g. `SendOrderPlacedMail`)
- Generate PDF Invoices
- Dispatch Plan Expiration Alert Notifications
- Call payment gateway Refund APIs asynchronously

### 4. Standardized JSON API Response Format
All backend API controllers will return a unified JSON envelope:
- **Success Response:**
  ```json
  {
    "success": true,
    "message": "Resource retrieved successfully",
    "data": { ... },
    "errors": null
  }
  ```
- **Error Response (Validation / Auth / Exception):**
  ```json
  {
    "success": false,
    "message": "Validation failed",
    "data": null,
    "errors": {
      "field_name": ["The field is required."]
    }
  }
  ```

---

## 🔑 Security & RBAC Configuration

Strict Role-Based Access Control using **Spatie Laravel Permission** along with Sanctum middleware and ownership policies.

### Middleware Groups
- **Public APIs**: No auth required (e.g. products, categories).
- **Buyer APIs**: `middleware: ['auth:sanctum', 'role:buyer']`
- **Seller APIs**: `middleware: ['auth:sanctum', 'role:seller', 'seller.approved']` (checks that KYC status is approved or store is active).
- **Admin APIs**: `middleware: ['auth:sanctum', 'role:admin']`

### Security Mitigations
- **Data Encryption**: `seller_profiles.bank_details`, `seller_kyc.pan_number`, `seller_kyc.aadhaar_number`, and `payment_methods.config` are encrypted using Laravel's native crypt utilities.
- **IDOR Protection**: Policies verify that the authenticated seller ID matches the resource's `seller_id` on every product update, order shipment update, return handling request, and earnings review.
- **Rate Limiting**:
  - Auth routes: 5 requests/min.
  - General API: 60 requests/min.
  - Checkout API: 10 requests/min.
  - Showcase Lead API: 3 requests/min.

---

## 🔌 API Endpoints (Laravel Backend)

### Auth & Accounts
- `POST /api/auth/register` (Buyer & Seller)
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`
- `PUT /api/auth/profile`
- `POST /api/auth/password/change`

### Buyer Operations
- `GET /api/account/addresses`
- `POST /api/account/addresses`
- `PUT /api/account/addresses/{id}`
- `DELETE /api/account/addresses/{id}`
- `GET /api/account/wishlist`
- `POST /api/account/wishlist/{product_id}`
- `DELETE /api/account/wishlist/{product_id}`
- `GET /api/account/wallet`
- `GET /api/account/notifications`
- `PUT /api/account/notifications/{id}/read`

### Categories, Search & Products
- `GET /api/categories` (Returns recursive hierarchical tree)
- `GET /api/categories/{slug}`
- `GET /api/categories/{slug}/attributes` (Loads attributes associated with the category to build the seller upload form dynamically)
- `GET /api/products` (Filters by categories, price, rating, attributes)
- `GET /api/products/{slug}` (Includes seller info ONLY IF the seller is Pro)
- `GET /api/products/{slug}/reviews`
- `GET /api/search` (Search query + filters)

### Checkout & Cart
- `GET /api/cart`
- `POST /api/cart/add`
- `PUT /api/cart/items/{id}`
- `DELETE /api/cart/items/{id}`
- `POST /api/checkout` (Calculates item totals, commissions split, and saves order details)
- `GET /api/orders`
- `GET /api/orders/{order_number}`
- `POST /api/orders/{id}/cancel`
- `POST /api/orders/{id}/review` (Verify buyer purchase first)
- `POST /api/orders/{id}/return` (Initiates return request)

### Seller Operations
- `GET /api/seller/dashboard` (Quick totals, stock notifications, current plan info)
- `POST /api/seller/kyc` (Upload pan, aadhaar, bank detail documents)
- `GET /api/seller/kyc` (Check kyc status)
- `GET /api/seller/products`
- `POST /api/seller/products` (Process uploads, dynamically generated variants, and custom attributes)
- `PUT /api/seller/products/{id}`
- `DELETE /api/seller/products/{id}`
- `GET /api/seller/orders`
- `PUT /api/seller/orders/{id}/ship` (Uploads tracking number & courier name, marks as shipped)
- `GET /api/seller/earnings`
- `GET /api/seller/payouts`
- `POST /api/seller/payouts/request`
- `GET /api/seller/subscription` (Subscription details)
- `POST /api/seller/subscribe` (Upgrade plan)
- `POST /api/seller/subscription/cancel`

### Admin Management
- `GET /api/admin/dashboard`
- `GET /api/admin/sellers` (List all stores)
- `PUT /api/admin/sellers/{id}/approve` (Activates store)
- `PUT /api/admin/sellers/{id}/ban`
- `GET /api/admin/kyc` (Review pending document submissions)
- `PUT /api/admin/kyc/{id}/approve`
- `PUT /api/admin/kyc/{id}/reject` (Add reject comments)
- `CRUD /api/admin/categories`
- `CRUD /api/admin/attributes` (Set category link, required, type, values, and variant maker flags)
- `CRUD /api/admin/products` (Moderate listing statuses)
- `CRUD /api/admin/subscription-plans`
- `GET /api/admin/orders`
- `PUT /api/admin/orders/{id}/status`
- `GET /api/admin/commissions`
- `GET /api/admin/payouts`
- `PUT /api/admin/payouts/{id}/complete`
- `CRUD /api/admin/payment-methods`
- `CRUD /api/admin/shipping-methods`
- `CRUD /api/admin/coupons`
- `GET /api/admin/reports` (Revenue split by subscription/commission, category, and store metrics)

---

## 🖥️ Next.js Frontend Routes

### Buyer Pages
- `/` — Home (Hero, category tree, featured grid, discounts)
- `/category/[slug]` — Filter sidebar (dynamic attributes based on current category), product grid, sorting
- `/product/[slug]` — Image gallery, option selector (Size, Color), buy controls (Buy now / Add to cart, OR "Contact Seller" button if Showcase plan)
- `/search` — Custom query filtering
- `/cart` — Cart items list, coupon box, subtotal card
- `/checkout` — Shipping address select, shipping rate estimate, payment selection (COD vs Razorpay)
- `/order/success/[id]` — Order status & invoice summary
- `/account/orders` — History checklist
- `/account/orders/[id]` — Split shipments detail + tracking map timeline
- `/account/wishlist` — Wishlist cards
- `/account/addresses` — Manage default delivery targets
- `/account/wallet` — Transaction log + refund credit
- `/account/profile` — Avatar upload & user settings
- `/store/[slug]` — Pro seller showcase store page

### Seller Dashboard
- `/seller/dashboard` — Earnings cards, recent notifications, plan details
- `/seller/products` — Catalog table with inventory count
- `/seller/products/create` — Dynamic category attribute fetch + variant generation table
- `/seller/orders` — Split orders dispatch panel
- `/seller/earnings` — Balance tracker
- `/seller/payouts` — Request history
- `/seller/subscription` — Plan chooser
- `/seller/settings` — Logo, bank description config

### Admin Panel
- `/admin/dashboard` — Global revenue split metrics, commission charts
- `/admin/sellers` — Application queues + ban flags
- `/admin/kyc` — Document reviews
- `/admin/categories` — Parent-child category configuration
- `/admin/attributes` — Group and link category rules
- `/admin/subscription-plans` — Plan limits config
- `/admin/payouts` — Direct payout confirmation logs
- `/admin/payment-methods` — Config credentials
- `/admin/shipping-methods` — Rates and zones
- `/admin/coupons` — Global promotion codes

---

## 🚀 Development Phases

### Phase 1 — Foundation (Weeks 1-3)
- [ ] Initialize Laravel project and run Sanctum / API integrations.
- [ ] Set up PostgreSQL (NeonDB) compatibility and DB connection configuration.
- [ ] Install Spatie Permission package and initialize Role seeders (`admin`, `seller`, `buyer`).
- [ ] Create core Auth & Profile database tables (`users`, `seller_profiles`, `seller_kyc`).
- [ ] Build Category and Attributes schema tables. Create initial seeds for Categories (Clothes, Electronics, Furniture).
- [ ] Implement Admin Category and Attributes CRUD APIs.

### Phase 2 — Product System (Weeks 4-6)
- [ ] Create Products, Variants, Images, and Custom Attributes schema tables.
- [ ] Implement Product Variant Generator backend algorithm.
- [ ] Set up secure file uploads (S3/Cloudinary or Local Storage).
- [ ] Build Seller onboarding profiles and Admin approval/rejection endpoints.
- [ ] Implement Product verification workflow (Draft → Active approval by Admin).

### Phase 3 — Subscriptions & Commissions (Weeks 7-8)
- [ ] Establish Subscription Plans tables and seed initial plans (Free, Showcase, Monthly Pro, Yearly Pro).
- [ ] Code Seller Subscription Upgrade Checkout process.
- [ ] Write dynamic checkout rules checking `can_sell` and hide/show logic for seller info using `show_seller_info`.
- [ ] Create commission rules and wallet tables. Set up split earnings tracking.
- [ ] Implement automated plan expiry checking using Laravel Schedule / Cron commands.

### Phase 4 — Commerce & Cart (Weeks 9-11)
- [ ] Build persistent Cart (logged in DB) and Guest Cart logic.
- [ ] Develop Checkout page schema, order split-shipment mapping, and transaction payments model.
- [ ] Integrate Razorpay payments and COD options.
- [ ] Build per-seller order shipment tracking systems.
- [ ] Code Customer Return Request and Refund trigger operations.

### Phase 5 — Next.js Frontend Development (Weeks 12-15)
- [ ] Initialize Next.js project.
- [ ] Develop Buyer Home, Category, and Product detail pages.
- [ ] Build Cart, Checkout, and Order tracking panels.
- [ ] Build Seller Dashboard pages (Product upload, Variant table, Shipment dispatch).
- [ ] Build Admin Dashboard panels (Kycs review, Seller approval, plan setup).

### Phase 6 — Polish & Launch (Weeks 16-18)
- [ ] Implement verified purchase review systems.
- [ ] Integrate Coupons discounts.
- [ ] Set up Notification dispatch engines (Email + App alerts).
- [ ] Build Search filter search indexes.
- [ ] Perform security checks (encrypt sensitive fields, enforce throttling, run OWASP tests).
