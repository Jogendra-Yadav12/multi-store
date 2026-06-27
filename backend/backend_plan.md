# 🛒 Aetheris Luxe — Complete Laravel Backend Development Plan
# Stack: Laravel 12 + Sanctum + Spatie + PostgreSQL (NeonDB)
# Rule: Show code first → User approves → Then write to file

---

## ⚙️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Laravel 12 (PHP 8.2) |
| Auth | Laravel Sanctum (API Token) |
| Authorization | Spatie Laravel Permission |
| Database | PostgreSQL via NeonDB (Serverless) |
| Queue | Laravel Queue (Database driver) |
| Storage | Laravel Storage (S3 or Local) |
| Payment | Razorpay PHP SDK |
| Response | Unified JSON envelope |

---

## 📁 Final Folder Structure

```
backend/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Auth/
│   │   │   │   └── AuthController.php
│   │   │   ├── Buyer/
│   │   │   │   ├── AddressController.php
│   │   │   │   ├── WishlistController.php
│   │   │   │   ├── WalletController.php
│   │   │   │   ├── CartController.php
│   │   │   │   ├── CheckoutController.php
│   │   │   │   ├── OrderController.php
│   │   │   │   └── NotificationController.php
│   │   │   ├── Seller/
│   │   │   │   ├── DashboardController.php
│   │   │   │   ├── KycController.php
│   │   │   │   ├── ProductController.php
│   │   │   │   ├── OrderController.php
│   │   │   │   ├── EarningController.php
│   │   │   │   ├── PayoutController.php
│   │   │   │   └── SubscriptionController.php
│   │   │   ├── Admin/
│   │   │   │   ├── DashboardController.php
│   │   │   │   ├── SellerController.php
│   │   │   │   ├── KycController.php
│   │   │   │   ├── CategoryController.php
│   │   │   │   ├── AttributeController.php
│   │   │   │   ├── ProductController.php
│   │   │   │   ├── OrderController.php
│   │   │   │   ├── SubscriptionPlanController.php
│   │   │   │   ├── PayoutController.php
│   │   │   │   ├── PaymentMethodController.php
│   │   │   │   ├── ShippingController.php
│   │   │   │   ├── CouponController.php
│   │   │   │   └── SettingsController.php
│   │   │   └── Public/
│   │   │       ├── CategoryController.php
│   │   │       ├── ProductController.php
│   │   │       ├── SearchController.php
│   │   │       └── StoreController.php
│   │   ├── Middleware/
│   │   │   └── SellerApproved.php
│   │   └── Requests/   (Form Request validators per controller)
│   ├── Models/
│   │   ├── User.php
│   │   ├── SellerProfile.php
│   │   ├── SellerKyc.php
│   │   ├── UserAddress.php
│   │   ├── UserWishlist.php
│   │   ├── UserWallet.php
│   │   ├── WalletTransaction.php
│   │   ├── Category.php
│   │   ├── AttributeGroup.php
│   │   ├── Attribute.php
│   │   ├── AttributeValue.php
│   │   ├── Product.php
│   │   ├── ProductImage.php
│   │   ├── ProductAttributeValue.php
│   │   ├── ProductVariant.php
│   │   ├── ProductVariantAttribute.php
│   │   ├── PaymentMethod.php
│   │   ├── ShippingMethod.php
│   │   ├── ShippingZone.php
│   │   ├── ShippingRate.php
│   │   ├── Coupon.php
│   │   ├── SubscriptionPlan.php
│   │   ├── SellerSubscription.php
│   │   ├── Lead.php
│   │   ├── Cart.php
│   │   ├── CartItem.php
│   │   ├── Order.php
│   │   ├── OrderItem.php
│   │   ├── OrderPayment.php
│   │   ├── OrderShipment.php
│   │   ├── OrderShipmentItem.php
│   │   ├── OrderTracking.php
│   │   ├── ReturnRequest.php
│   │   ├── ReturnShipment.php
│   │   ├── Refund.php
│   │   ├── SellerEarning.php
│   │   ├── SellerPayout.php
│   │   ├── CommissionRule.php
│   │   ├── Conversation.php
│   │   ├── Message.php
│   │   └── Notification.php
│   ├── Traits/
│   │   └── ApiResponseTrait.php
│   ├── Policies/
│   │   ├── ProductPolicy.php
│   │   └── OrderPolicy.php
│   └── Jobs/
│       ├── SendOrderConfirmationMail.php
│       ├── GenerateInvoicePdf.php
│       ├── ProcessRazorpayRefund.php
│       └── SendPlanExpiryAlert.php
├── database/
│   ├── migrations/   (see Phase 1-4 below)
│   └── seeders/
│       ├── DatabaseSeeder.php
│       └── RoleAndPermissionSeeder.php
└── routes/
    └── api.php
```

---

## 📋 PHASE 1 — Foundation & Auth (Weeks 1–3)

### Commands to Run
```bash
php artisan key:generate
php artisan install:api
composer require spatie/laravel-permission
php artisan vendor:publish --provider="Spatie\Permission\PermissionServiceProvider"
```

### Migrations
```
0001_01_01_000000_create_users_table.php         ← MODIFY (add columns)
YYYY_create_permission_tables.php                ← AUTO from Spatie publish
YYYY_create_seller_profiles_table.php            ← NEW
YYYY_create_seller_kyc_table.php                 ← NEW
YYYY_create_user_addresses_table.php             ← NEW
YYYY_create_user_wishlist_table.php              ← NEW
YYYY_create_user_wallet_table.php                ← NEW
YYYY_create_wallet_transactions_table.php        ← NEW
```

### Users Table — New Columns
```
role            varchar     default 'buyer'   → 'admin','seller','buyer'
status          varchar     default 'active'  → 'active','banned','pending','suspended'
phone           varchar     nullable
avatar          varchar     nullable
last_login_at   timestamp   nullable
```

### Seller Profiles Table
```
id, user_id(FK), store_name, store_slug(unique), store_logo, store_banner,
store_description, contact_email, contact_phone, address(jsonb),
bank_details(text encrypted), gst_number, status, rejection_reason,
approved_at, deleted_at, timestamps
```

### Seller KYC Table
```
id, seller_id(FK), status, full_legal_name, pan_number(encrypted),
pan_image, aadhaar_number(encrypted), aadhaar_front, aadhaar_back,
gst_number, bank_account_number(encrypted), bank_ifsc(encrypted),
bank_account_name, cancelled_cheque, selfie_with_id,
rejection_reason, reviewed_by(FK), submitted_at, reviewed_at, timestamps
```

### Auth API Endpoints
```
POST   /api/auth/register          → Register buyer or seller
POST   /api/auth/login             → Login, returns Sanctum token
POST   /api/auth/logout            → Revoke token
GET    /api/auth/me                → Authenticated user info
PUT    /api/auth/profile           → Update profile
POST   /api/auth/password/change   → Change password
```

### Middleware Groups
```
Public         → No auth required
Buyer          → auth:sanctum + role:buyer
Seller         → auth:sanctum + role:seller + seller.approved
Admin          → auth:sanctum + role:admin
```

### Seeders
```
Roles:  admin, seller, buyer
Admin user: admin@gmail.com / Admin@123
```

### Files to Create in Phase 1
```
app/Traits/ApiResponseTrait.php
app/Http/Middleware/SellerApproved.php
app/Http/Controllers/Auth/AuthController.php
app/Http/Requests/Auth/RegisterRequest.php
app/Http/Requests/Auth/LoginRequest.php
app/Models/User.php                  ← MODIFY
app/Models/SellerProfile.php
app/Models/SellerKyc.php
app/Models/UserAddress.php
app/Models/UserWishlist.php
app/Models/UserWallet.php
app/Models/WalletTransaction.php
database/seeders/RoleAndPermissionSeeder.php
routes/api.php                       ← Phase 1 routes only
```

---

## 📋 PHASE 2 — Categories, Attributes & Products (Weeks 4–6)

### Migrations
```
YYYY_create_categories_table.php
YYYY_create_attribute_groups_table.php
YYYY_create_attributes_table.php
YYYY_create_attribute_values_table.php
YYYY_create_products_table.php
YYYY_create_product_images_table.php
YYYY_create_product_attribute_values_table.php
YYYY_create_product_variants_table.php
YYYY_create_product_variant_attributes_table.php
```

### Categories Table
```
id, parent_id(FK self nullable), name, slug(unique), icon,
image, sort_order, is_active, deleted_at, timestamps
```

### Attributes Table
```
id, attribute_group_id(FK), category_id(FK), name,
type(select/multi-select/text/number/boolean/color),
is_required, is_filterable, is_variant_maker, timestamps
```

### Products Table
```
id, seller_id(FK), category_id(FK), name, slug(unique),
short_description, description, base_price, compare_price,
status(draft/active/rejected/archived), admin_approved,
is_featured, meta_title, meta_description, deleted_at, timestamps
```

### Product Variants Table
```
id, product_id(FK), sku(unique), price, compare_price,
stock_quantity, low_stock_alert, deleted_at, timestamps
```

### API Endpoints — Phase 2
```
--- PUBLIC ---
GET  /api/categories                      → Recursive category tree
GET  /api/categories/{slug}               → Single category
GET  /api/categories/{slug}/attributes    → Dynamic attributes for forms
GET  /api/products                        → Filter: category, price, attributes
GET  /api/products/{slug}                 → Product detail
GET  /api/products/{slug}/reviews         → Reviews

--- SELLER ---
GET    /api/seller/products               → Own products list
POST   /api/seller/products               → Create + variants
PUT    /api/seller/products/{id}          → Update
DELETE /api/seller/products/{id}          → Soft delete

--- ADMIN ---
GET  /api/admin/categories                → List all
POST /api/admin/categories                → Create
PUT  /api/admin/categories/{id}           → Update
DELETE /api/admin/categories/{id}         → Delete

GET  /api/admin/attributes                → List all
POST /api/admin/attributes                → Create
PUT  /api/admin/attributes/{id}           → Update
DELETE /api/admin/attributes/{id}         → Delete

GET  /api/admin/products                  → All products
PUT  /api/admin/products/{id}/status      → Approve/Reject
```

### Files to Create in Phase 2
```
app/Models/Category.php
app/Models/AttributeGroup.php
app/Models/Attribute.php
app/Models/AttributeValue.php
app/Models/Product.php
app/Models/ProductImage.php
app/Models/ProductVariant.php
app/Models/ProductVariantAttribute.php
app/Models/ProductAttributeValue.php
app/Http/Controllers/Public/CategoryController.php
app/Http/Controllers/Public/ProductController.php
app/Http/Controllers/Seller/ProductController.php
app/Http/Controllers/Admin/CategoryController.php
app/Http/Controllers/Admin/AttributeController.php
app/Http/Controllers/Admin/ProductController.php
app/Http/Requests/Seller/CreateProductRequest.php
```

---

## 📋 PHASE 3 — Subscriptions & Commissions (Weeks 7–8)

### Migrations
```
YYYY_create_subscription_plans_table.php
YYYY_create_seller_subscriptions_table.php
YYYY_create_leads_table.php
YYYY_create_commission_rules_table.php
YYYY_create_seller_earnings_table.php
```

### Subscription Plans Table
```
id, name, slug(unique), price, duration_days(nullable=lifetime),
commission_rate, max_products(nullable=unlimited),
can_sell, show_seller_info, features(jsonb), is_active, timestamps
```

### Subscription Plan Seeds (4 default plans)
```
Free:         ₹0,    10 products,  10% commission, can_sell=true,  show_info=false
Showcase:     ₹199,  20 products,  0%  commission, can_sell=false, show_info=false
Monthly Pro:  ₹499,  unlimited,    0%  commission, can_sell=true,  show_info=true
Yearly Pro:   ₹4999, unlimited,    0%  commission, can_sell=true,  show_info=true
```

### API Endpoints — Phase 3
```
--- SELLER ---
GET  /api/seller/subscription        → Current plan + expiry
POST /api/seller/subscribe           → Subscribe/upgrade plan
POST /api/seller/subscription/cancel → Cancel

--- ADMIN ---
GET    /api/admin/subscription-plans       → All plans
POST   /api/admin/subscription-plans       → Create plan
PUT    /api/admin/subscription-plans/{id}  → Update plan
DELETE /api/admin/subscription-plans/{id}  → Deactivate
GET    /api/admin/commissions              → Commission overview
```

### Files to Create in Phase 3
```
app/Models/SubscriptionPlan.php
app/Models/SellerSubscription.php
app/Models/Lead.php
app/Models/CommissionRule.php
app/Models/SellerEarning.php
app/Http/Controllers/Seller/SubscriptionController.php
app/Http/Controllers/Admin/SubscriptionPlanController.php
database/seeders/SubscriptionPlanSeeder.php
```

---

## 📋 PHASE 4 — Cart, Orders & Payments (Weeks 9–11)

### Migrations
```
YYYY_create_payment_methods_table.php
YYYY_create_shipping_methods_table.php
YYYY_create_shipping_zones_table.php
YYYY_create_shipping_rates_table.php
YYYY_create_coupons_table.php
YYYY_create_carts_table.php
YYYY_create_cart_items_table.php
YYYY_create_orders_table.php
YYYY_create_order_items_table.php
YYYY_create_order_payments_table.php
YYYY_create_order_shipments_table.php
YYYY_create_order_shipment_items_table.php
YYYY_create_order_tracking_table.php
YYYY_create_return_requests_table.php
YYYY_create_return_shipments_table.php
YYYY_create_refunds_table.php
YYYY_create_seller_payouts_table.php
YYYY_create_conversations_table.php
YYYY_create_messages_table.php
YYYY_create_notifications_table.php
```

### Order Items Table (key commission columns)
```
id, order_id(FK), seller_id(FK), product_id(FK), variant_id(FK nullable),
product_name(snapshot), variant_info(jsonb), product_image,
quantity, unit_price, total_price,
commission_rate(snapshot), commission_amount, seller_earning,
status, timestamps
```

### Key Business Logic — Checkout Service
```
1. Validate cart items
2. For each item → check seller can_sell=true (block Showcase sellers)
3. lockForUpdate() on product_variant → check stock
4. Calculate commission per item from seller's active plan
5. Create Order + OrderItems + OrderPayment in one DB transaction
6. Dispatch queue job: SendOrderConfirmationMail
7. Dispatch queue job: GenerateInvoicePdf
```

### API Endpoints — Phase 4
```
--- PUBLIC ---
GET  /api/search                     → Search with filters

--- BUYER ---
GET    /api/cart                           → View cart
POST   /api/cart/add                       → Add item
PUT    /api/cart/items/{id}                → Update qty
DELETE /api/cart/items/{id}                → Remove item

POST /api/checkout                         → Place order (atomic transaction)

GET    /api/orders                         → Order history
GET    /api/orders/{order_number}          → Order detail
POST   /api/orders/{id}/cancel             → Cancel
POST   /api/orders/{id}/review             → Leave review (verified purchase)
POST   /api/orders/{id}/return             → Initiate return

GET    /api/account/addresses              → List
POST   /api/account/addresses              → Add
PUT    /api/account/addresses/{id}         → Edit
DELETE /api/account/addresses/{id}         → Remove

GET    /api/account/wishlist               → List
POST   /api/account/wishlist/{product_id}  → Add
DELETE /api/account/wishlist/{product_id}  → Remove

GET    /api/account/wallet                 → Balance + transactions
GET    /api/account/notifications          → List
PUT    /api/account/notifications/{id}/read → Mark read

--- SELLER ---
GET  /api/seller/dashboard             → Stats, plan info
GET  /api/seller/orders                → Own orders
PUT  /api/seller/orders/{id}/ship      → Mark shipped + tracking
GET  /api/seller/earnings              → Earnings ledger
GET  /api/seller/payouts               → Payout history
POST /api/seller/payouts/request       → Request payout
POST /api/seller/kyc                   → Submit KYC documents
GET  /api/seller/kyc                   → KYC status

--- ADMIN ---
GET  /api/admin/dashboard              → Global metrics
GET  /api/admin/sellers                → All sellers
PUT  /api/admin/sellers/{id}/approve   → Approve store
PUT  /api/admin/sellers/{id}/ban       → Ban store
GET  /api/admin/kyc                    → Pending KYC queue
PUT  /api/admin/kyc/{id}/approve       → Approve KYC
PUT  /api/admin/kyc/{id}/reject        → Reject KYC + reason

GET  /api/admin/orders                 → All orders
PUT  /api/admin/orders/{id}/status     → Update status
GET  /api/admin/payouts                → All payout requests
PUT  /api/admin/payouts/{id}/complete  → Confirm transfer

CRUD /api/admin/payment-methods        → Gateway config
CRUD /api/admin/shipping-methods       → Shipping zones + rates
CRUD /api/admin/coupons                → Promotions
GET  /api/admin/reports                → Revenue reports
```

### Queue Jobs (Background Tasks)
```
SendOrderConfirmationMail    → Email buyer after checkout
GenerateInvoicePdf           → PDF invoice generation
ProcessRazorpayRefund        → Async refund via Razorpay API
SendPlanExpiryAlert          → Seller plan expiry warning
```

---

## 🔒 Security & Rate Limiting

### Middleware Stack
```
Public   → throttle:60,1
Buyer    → auth:sanctum, role:buyer, throttle:60,1
Seller   → auth:sanctum, role:seller, seller.approved, throttle:60,1
Admin    → auth:sanctum, role:admin, throttle:60,1
Checkout → auth:sanctum, role:buyer, throttle:10,1
Leads    → auth:sanctum, role:buyer, throttle:3,1
Auth     → throttle:5,1
```

### Data Encryption (Laravel Crypt)
```
seller_profiles.bank_details
seller_kyc.pan_number
seller_kyc.aadhaar_number
seller_kyc.bank_account_number
seller_kyc.bank_ifsc
payment_methods.config
```

### IDOR Protection (Policies)
```
ProductPolicy   → seller can only edit own products
OrderPolicy     → seller can only ship own order items
PayoutPolicy    → seller can only request own payouts
```

---

## 📊 API Response Format (All Controllers)

### Success
```json
{
  "success": true,
  "message": "Resource retrieved successfully",
  "data": {},
  "errors": null
}
```

### Error
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

## ✅ Development Order (File by File)

### Phase 1 Order
1. ApiResponseTrait
2. Modify users migration
3. SellerProfile migration + Model
4. SellerKyc migration + Model
5. Address/Wallet/Wishlist migrations + Models
6. SellerApproved middleware
7. RoleAndPermissionSeeder
8. AuthController + Requests
9. api.php (Phase 1 routes)

### Phase 2 Order
1. Category migration + Model
2. AttributeGroup + Attribute + AttributeValue migrations + Models
3. Product + ProductVariant migrations + Models
4. Public CategoryController
5. Public ProductController
6. Seller ProductController
7. Admin CategoryController + AttributeController + ProductController

### Phase 3 Order
1. SubscriptionPlan migration + Model + Seeder
2. SellerSubscription migration + Model
3. Lead + CommissionRule + SellerEarning migrations + Models
4. Seller SubscriptionController
5. Admin SubscriptionPlanController

### Phase 4 Order
1. PaymentMethod + ShippingMethod migrations + Models
2. Coupon migration + Model
3. Cart + CartItem migrations + Models
4. Order + OrderItem + OrderPayment migrations + Models
5. OrderShipment + OrderTracking migrations + Models
6. Return + Refund migrations + Models
7. SellerPayout + SellerEarning migrations + Models
8. Conversation + Message + Notification migrations + Models
9. CheckoutService (core business logic)
10. All Buyer/Seller/Admin controllers
11. Queue Jobs
12. Admin CRUD controllers

---

## 🗓️ Timeline Summary

| Phase | Work | Duration |
|---|---|---|
| Phase 1 | Auth, Users, KYC, Wallet | Weeks 1–3 |
| Phase 2 | Categories, Attributes, Products | Weeks 4–6 |
| Phase 3 | Subscriptions, Commissions | Weeks 7–8 |
| Phase 4 | Cart, Orders, Payments, Payouts | Weeks 9–11 |
| Phase 5 | Reviews, Coupons, Search, Notifications | Weeks 12–13 |
| Phase 6 | Security audit, Rate limiting, Tests | Weeks 14–15 |
