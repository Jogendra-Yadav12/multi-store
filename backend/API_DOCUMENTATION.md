# Multi-Store Backend — API Documentation

**Base URL (Production):** `https://multi-store-r9rk.onrender.com`  
**Base URL (Local):** `http://127.0.0.1:8000`  
**Content-Type:** `application/json`  
**Auth:** Bearer Token (via Laravel Sanctum)

---

## Standard Response Format

All APIs return responses in this format:

```json
{
    "success": true | false,
    "message": "Human readable message",
    "data": { } | [ ] | null,
    "errors": null | { "field": ["error"] }
}
```

---

## 📋 API Index

| # | Endpoint | Method | Auth | Phase |
|---|----------|--------|------|-------|
| 1 | `/api/health` | GET | None | 1 |
| 2 | `/api/auth/login` | POST | None | 1 |
| 3 | `/api/auth/me` | GET | 🔒 Token | 1 |
| 4 | `/api/auth/logout` | POST | 🔒 Token | 1 |
| 5 | `/api/seller/register` | POST | None | 2 |
| 6 | `/api/plans` | GET | None | 2 |
| 7 | `/api/seller/store` | POST | 🔒 Seller | 2 |
| 8 | `/api/seller/store` | GET | 🔒 Seller | 2 |
| 9 | `/api/seller/store` | PUT | 🔒 Seller | 2 |
| 10 | `/api/seller/subscribe` | POST | 🔒 Seller | 2 |
| 11 | `/api/admin/plans` | GET | 🔒 Admin | 2 |
| 12 | `/api/admin/plans` | POST | 🔒 Admin | 2 |
| 13 | `/api/admin/plans/{id}` | GET | 🔒 Admin | 2 |
| 14 | `/api/admin/plans/{id}` | PUT | 🔒 Admin | 2 |
| 15 | `/api/admin/plans/{id}` | DELETE | 🔒 Admin | 2 |

---

## 🟢 Phase 1 — Authentication

### 1. Health Check

```
GET /api/health
Auth: None
```

**Response 200:**
```json
{
    "status": "ok",
    "timestamp": "2026-06-28T08:00:00Z"
}
```

---

### 2. Login (Admin / Seller / Buyer)

```
POST /api/auth/login
Auth: None
```

**Request Body:**
```json
{
    "email": "admin@gmail.com",
    "password": "Admin@123"
}
```

**Response 200:**
```json
{
    "success": true,
    "message": "Login successful",
    "data": {
        "access_token": "1|abc123xyz...",
        "token_type": "Bearer",
        "user": {
            "id": 1,
            "name": "Super Admin",
            "email": "admin@gmail.com",
            "role": "admin",
            "avatar": null
        },
        "permissions": []
    }
}
```

**Response 401:** Invalid credentials  
**Response 403:** Account suspended/banned  
**Response 422:** Validation error

---

### 3. Get Current User Profile

```
GET /api/auth/me
Auth: Bearer {{token}}
```

**Response 200:**
```json
{
    "success": true,
    "message": "User fetched successfully",
    "data": {
        "user": {
            "id": 1,
            "name": "Super Admin",
            "email": "admin@gmail.com",
            "role": "admin"
        },
        "permissions": []
    }
}
```

**Response 401:** No/invalid token

---

### 4. Logout

```
POST /api/auth/logout
Auth: Bearer {{token}}
```

**Response 200:**
```json
{
    "success": true,
    "message": "Logged out successfully",
    "data": []
}
```

---

## 🏪 Phase 2 — Seller Registration & Store Management

### 5. Seller Registration

```
POST /api/seller/register
Auth: None
```

**Request Body:**
```json
{
    "name": "Test Seller",
    "email": "seller@gmail.com",
    "password": "Seller@123",
    "password_confirmation": "Seller@123",
    "phone": "9876543210"
}
```

**Response 201:**
```json
{
    "success": true,
    "message": "Seller registered successfully!",
    "data": {
        "access_token": "3|xyz789...",
        "token_type": "Bearer",
        "user": {
            "id": 2,
            "name": "Test Seller",
            "email": "seller@gmail.com",
            "role": "seller",
            "phone": "9876543210"
        }
    }
}
```

**Response 422:** Email already taken / Validation error

> **Note:** Registration auto-logs in the seller. Use the returned `access_token` directly for all seller APIs.

---

### 6. View Subscription Plans (Public)

```
GET /api/plans
Auth: None
```

**Response 200:**
```json
{
    "success": true,
    "message": "Plans fetched successfully",
    "data": [
        {
            "id": 1,
            "name": "Free",
            "slug": "free",
            "price": "0.00",
            "duration": "lifetime",
            "commission_rate": "10.00",
            "product_limit": 10,
            "is_featured": false,
            "features": ["10 products", "Basic store page", "10% commission"]
        },
        {
            "id": 2,
            "name": "Showcase",
            "price": "499.00",
            "commission_rate": "8.00",
            "product_limit": 50
        },
        {
            "id": 3,
            "name": "Monthly Pro",
            "price": "999.00",
            "commission_rate": "5.00",
            "product_limit": 500
        },
        {
            "id": 4,
            "name": "Yearly Pro",
            "price": "7999.00",
            "commission_rate": "3.00",
            "product_limit": 999999
        }
    ]
}
```

---

### 7. Create Store

```
POST /api/seller/store
Auth: Bearer {{seller_token}}
Role: seller
```

**Request Body:**
```json
{
    "name": "My Fashion Store",
    "description": "Best fashion at great prices",
    "phone": "9876543210",
    "email": "store@gmail.com",
    "address": "123 MG Road",
    "city": "Bangalore",
    "state": "Karnataka",
    "pincode": "560001"
}
```

**Response 201:**
```json
{
    "success": true,
    "message": "Store created successfully! Awaiting admin approval.",
    "data": {
        "id": 1,
        "user_id": 2,
        "name": "My Fashion Store",
        "slug": "my-fashion-store-abc123",
        "status": "pending"
    }
}
```

**Response 422:** Seller already has a store

---

### 8. Get My Store

```
GET /api/seller/store
Auth: Bearer {{seller_token}}
Role: seller
```

**Response 200:**
```json
{
    "success": true,
    "message": "Store fetched successfully",
    "data": {
        "id": 1,
        "name": "My Fashion Store",
        "slug": "my-fashion-store-abc123",
        "status": "pending",
        "active_subscription": {
            "plan": {
                "name": "Free",
                "commission_rate": "10.00"
            }
        }
    }
}
```

**Response 404:** No store created yet

---

### 9. Update Store

```
PUT /api/seller/store
Auth: Bearer {{seller_token}}
Role: seller
```

**Request Body (all fields optional):**
```json
{
    "name": "Updated Store Name",
    "description": "New description",
    "phone": "9876543210",
    "city": "Mumbai",
    "state": "Maharashtra"
}
```

**Response 200:** Updated store data

---

### 10. Subscribe to a Plan

```
POST /api/seller/subscribe
Auth: Bearer {{seller_token}}
Role: seller
```

**Request Body:**
```json
{
    "plan_id": 3
}
```

**Plan IDs:**
| ID | Plan |
|----|------|
| 1 | Free |
| 2 | Showcase |
| 3 | Monthly Pro |
| 4 | Yearly Pro |

**Response 200:**
```json
{
    "success": true,
    "message": "Subscribed to Monthly Pro plan successfully",
    "data": {
        "subscription": {
            "store_id": 1,
            "plan_id": 3,
            "status": "active",
            "starts_at": "2026-06-28T...",
            "ends_at": "2026-07-28T..."
        },
        "plan": {
            "name": "Monthly Pro",
            "commission_rate": "5.00"
        }
    }
}
```

---

## 🛡️ Phase 2 — Admin Plan Management

### 11. Get All Plans (Admin)

```
GET /api/admin/plans
Auth: Bearer {{admin_token}}
Role: admin
```

**Response 200:** All plans including inactive ones

---

### 12. Create New Plan

```
POST /api/admin/plans
Auth: Bearer {{admin_token}}
Role: admin
```

**Request Body:**
```json
{
    "name": "Enterprise",
    "description": "For large scale sellers",
    "price": 19999.00,
    "duration": "yearly",
    "commission_rate": 1.5,
    "product_limit": 9999,
    "is_featured": true,
    "features": ["Unlimited products", "Dedicated manager"]
}
```

**duration values:** `monthly` | `yearly` | `lifetime`

---

### 13. Get Single Plan

```
GET /api/admin/plans/{id}
Auth: Bearer {{admin_token}}
Role: admin
```

---

### 14. Update Plan

```
PUT /api/admin/plans/{id}
Auth: Bearer {{admin_token}}
Role: admin
```

**Request Body (any fields to update):**
```json
{
    "commission_rate": 7.5,
    "product_limit": 20,
    "price": 599.00
}
```

---

### 15. Deactivate Plan

```
DELETE /api/admin/plans/{id}
Auth: Bearer {{admin_token}}
Role: admin
```

> **Note:** Does NOT hard delete. Sets `is_active = false`. Existing subscribers keep their plan.

**Response 200:**
```json
{
    "success": true,
    "message": "Plan deactivated successfully"
}
```

---

## 🔐 Default Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | `admin@gmail.com` | `Admin@123` |
| Seller | Register via `/api/seller/register` | Your choice |

---

## ⚠️ HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created successfully |
| 401 | Unauthenticated (no/invalid token) |
| 403 | Forbidden (wrong role or banned) |
| 404 | Resource not found |
| 422 | Validation error |
| 500 | Server error |

---

## 🗺️ Upcoming APIs (Next Phases)

### Phase 3 — Categories & Products
- `GET /api/categories` — list categories
- `POST /api/admin/categories` — admin creates category
- `POST /api/seller/products` — seller lists product
- `GET /api/seller/products` — seller's products
- `PUT /api/seller/products/{id}` — update product

### Phase 4 — Buyer & Orders
- `POST /api/buyer/register` — buyer registration
- `POST /api/buyer/orders` — place order
- `GET /api/buyer/orders` — my orders
- `POST /api/buyer/cart` — add to cart

### Phase 5 — Commissions & Payouts
- `GET /api/admin/commissions` — all commissions
- `POST /api/admin/payouts` — trigger payout
- `GET /api/seller/earnings` — seller earnings
