# Aetheris Luxe - Multi-Store Backend API Documentation

This backend is built on **Laravel 12** with **Sanctum** for token-based authentication.

## Admin Authentication for Postman

Use this to get an `access_token` to test the Admin APIs.

**Method:** `POST`
**URL:** `http://localhost:8000/api/auth/login`
**Headers:** 
- `Accept: application/json`
- `Content-Type: application/json`

**Body (raw JSON):**
```json
{
    "email": "admin@gmail.com",
    "password": "Admin@123"
}
```

*Once you get the token, put it in the Postman **Authorization** tab as a **Bearer Token**.*

---

## 1. Subscription Plans Management

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/admin/plans` | List all subscription plans |
| `GET` | `/api/admin/plans/{id}` | Get a single plan details |
| `POST` | `/api/admin/plans` | Create a new plan |
| `PUT` | `/api/admin/plans/{id}` | Update an existing plan |
| `DELETE` | `/api/admin/plans/{id}` | Delete a plan |

**Example POST/PUT Body:**
```json
{
    "name": "Gold Pro",
    "slug": "gold-pro",
    "description": "Premium seller plan",
    "price": 49.99,
    "duration": "monthly",
    "is_active": true,
    "max_products": 500,
    "commission_rate": 5.00
}
```

---

## 2. Categories

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/admin/categories` | Create new category |
| `PUT` | `/api/admin/categories/{id}` | Update category |
| `DELETE` | `/api/admin/categories/{id}` | Delete category |

**Example POST/PUT Body:**
```json
{
    "name": "Electronics",
    "parent_id": null,
    "description": "Gadgets and devices",
    "is_active": true
}
```

---

## 3. Product Management & Approvals

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/admin/products` | List all products (can filter with `?status=pending`) |
| `GET` | `/api/admin/products/{id}` | Get single product details |
| `POST` | `/api/admin/products` | Admin creates a product for a seller (auto-approved) |
| `PUT` | `/api/admin/products/{id}` | Update a product |
| `DELETE` | `/api/admin/products/{id}` | Delete a product |
| `PUT` | `/api/admin/products/{id}/approve` | Approve a pending product |
| `PUT` | `/api/admin/products/{id}/reject` | Reject a product |

**Example POST Body:**
```json
{
    "seller_id": 2,
    "category_id": 1,
    "name": "Luxury Silk Scarf",
    "slug": "luxury-silk-scarf-1",
    "short_description": "A beautiful silk scarf.",
    "description": "Full description of the product...",
    "base_price": 89.99,
    "images": [
        "https://example.com/image1.jpg"
    ],
    "variants": [
        {
            "sku": "SCARF-RED-01",
            "price": 89.99,
            "stock_quantity": 50,
            "attributes": [
                {
                    "attribute_id": 1,
                    "attribute_value_id": 1
                }
            ]
        }
    ]
}
```

**Example Reject Body:**
```json
{
    "reason": "Images are too low resolution, please upload HD images."
}
```

**Example PUT (Update) Body:**
```json
{
    "name": "Updated Scarf Name",
    "base_price": 79.99,
    "description": "Updated description here"
}
```

---

## 4. KYC & Seller Compliance

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/admin/kyc` | List all pending KYC requests |
| `PUT` | `/api/admin/kyc/{id}/approve` | Approve seller KYC |
| `PUT` | `/api/admin/kyc/{id}/reject` | Reject seller KYC |

**Example Reject Body:**
```json
{
    "rejection_reason": "Business registration document is expired."
}
```

---

## 5. Commission Rules

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/admin/commissions` | List all commission rules |
| `POST` | `/api/admin/commissions` | Create commission rule |

**Example POST Body:**
```json
{
    "category_id": null,
    "rate": 10.50,
    "is_active": true
}
```

---

## 6. Attribute Management (Variants like Size, Color)

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/admin/attributes/groups` | Create an attribute group |
| `DELETE` | `/api/admin/attributes/groups/{id}`| Delete attribute group |
| `POST` | `/api/admin/attributes` | Add a value to a group |
| `PUT` | `/api/admin/attributes/{id}` | Update an attribute value |
| `DELETE` | `/api/admin/attributes/{id}` | Delete an attribute value |

**Example Create Group Body:**
```json
{
    "name": "Color",
    "is_filterable": true
}
```

**Example Create/Update Attribute Value Body:**
```json
{
    "attribute_group_id": 1,
    "value": "Red",
    "color_code": "#FF0000"
}
```

---

## 7. Seller APIs

These endpoints require a seller's token (`Authorization: Bearer <seller_token>`).

### Add Product (Seller)

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/seller/products` | Seller adds a new product (goes to draft/pending approval) |

**Example POST Body:**
```json
{
    "category_id": 1,
    "name": "Luxury Silk Scarf",
    "slug": "luxury-silk-scarf-seller-1",
    "short_description": "A beautiful silk scarf.",
    "description": "Full description of the product...",
    "base_price": 89.99,
    "images": [
        "https://example.com/image1.jpg"
    ],
    "variants": [
        {
            "sku": "SCARF-RED-01",
            "price": 89.99,
            "stock_quantity": 50,
            "attributes": [
                {
                    "attribute_id": 1,
                    "attribute_value_id": 1
                }
            ]
        }
    ]
}
```
