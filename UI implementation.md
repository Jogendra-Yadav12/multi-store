# Aetheris Luxe - UI Implementation Plan

This document outlines the step-by-step strategy for translating the exported Figma designs (Aetheris Luxe UI) into the active Next.js frontend, maintaining strict separation of concerns for the three user roles (Buyer, Seller, Admin) while leveraging the provided Tailwind design tokens.

## Phase 1: Design System & Core Configuration
**Goal:** Establish the foundation so all new components automatically adopt the Aetheris Luxe aesthetic.

1. **Tailwind Configuration:** 
   - Extract the custom `colors`, `spacing`, and `fontFamily` configurations from the `<script id="tailwind-config">` present in the Figma HTML exports.
   - Inject these tokens into `frontend/tailwind.config.ts`.
   - Update `src/app/globals.css` to import the "Plus Jakarta Sans" Google font.

2. **Global Layout Updates:**
   - Update `layout.tsx` to set the default body background (`bg-background`) and font (`font-display`).
   - Create highly reusable UI primitive components (Cards, Buttons, Inputs) using the new `primary-container` and `surface-container` token classes.

## Phase 2: Role-Based Authentication Routing (The Gateways)
**Goal:** Implement strict, distinct login screens for each user type to prevent confusion and enforce access control.

1. **Buyer Login (`/login`)**
   - Implement the `login_aetheris_luxe` split-screen design.
   - Strip the vendor tab to keep it exclusively for buyers.
   - **Logic:** Calls `/auth/login`. If the returned role is not `buyer`, reject the login and display an error.

2. **Seller Login (`/seller/login`)**
   - Duplicate the aesthetic but alter the copy to target Vendors.
   - **Logic:** Calls `/auth/login`. If the returned role is not `seller`, reject the login. Upon success, redirect to `/seller/dashboard`.

3. **Admin Login (`/admin/login`)**
   - Create a specialized, highly secure-looking login variant for Super Admins.
   - **Logic:** Calls `/auth/login`. If the returned role is not `admin`, reject the login. Upon success, redirect to `/admin/dashboard`.

## Phase 3: The Buyer Experience (Marketplace)
**Goal:** Implement the public-facing e-commerce storefront.

1. **Homepage (`/`)**
   - Implement `marketplace_homepage_aetheris_luxe`.
   - Build the premium hero section, trending products grid, and category browser.

2. **Product Browsing & Checkout**
   - Implement `product_detail_aetheris_luxe_1`.
   - Implement `shopping_cart_aetheris_luxe`.
   - Implement `checkout_aetheris_luxe` with address management and payment integrations.

## Phase 4: The Seller Experience (Boutique Management)
**Goal:** Implement the complex, data-heavy dashboards for vendors.

1. **Seller Layout & Dashboard (`/seller/dashboard`)**
   - Implement `seller_dashboard_aetheris_luxe` and `main_dashboard_aetheris_luxe`.
   - Update the existing Sidebar to match the Figma styling exactly.
   
2. **Product Management (`/seller/products`)**
   - Implement `seller_product_catalog_aetheris_luxe`.
   - Implement `create_product_aetheris_luxe`.
   
3. **Order Fulfillment & Earnings (`/seller/orders`, `/seller/wallet`)**
   - Implement `seller_orders_dispatch_aetheris_luxe`.
   - Implement `seller_earnings_aetheris_luxe` and `seller_payouts_aetheris_luxe`.

## Phase 5: The Admin Experience (Platform Governance)
**Goal:** Implement the Super Admin command center.

1. **Admin Layout & Overview (`/admin/dashboard`)**
   - Implement `admin_dashboard_aetheris_luxe` with platform-wide metrics.
   
2. **Approvals & Governance**
   - Implement `kyc_verification_queue_aetheris_luxe`.
   - Implement `categories_manager_aetheris_luxe` and `attributes_manager_aetheris_luxe`.
   - Implement `subscription_plans_config_aetheris_luxe`.

---
*By executing this plan strictly phase by phase, we will guarantee that the final Next.js application visually matches the premium Aetheris Luxe Figma designs, while strictly adhering to the Laravel API constraints and Next.js role-based routing.*
