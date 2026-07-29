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

## Step-by-Step Testing Guide (Admin)

To test the multi-store backend properly via Postman, you must create data in a specific sequence because Products rely on Categories and Attributes.

### Step 1: Create a Category
A product must belong to a category.

* **Method:** `POST`
* **URL:** `/api/admin/categories`
* **Body:**
```json
{
    "name": "Electronics",
    "slug": "electronics",
    "description": "Gadgets, devices, and accessories.",
    "is_active": true
}
```
*(Assume this returns `id: 1`)*

### Step 2: Create an Attribute Group
Attributes (like Color, Size) belong to a group.

* **Method:** `POST`
* **URL:** `/api/admin/attributes/groups`
* **Body:**
```json
{
    "name": "Color"
}
```
*(Assume this returns `id: 1`)*

### Step 3: Create an Attribute & Values
Now, assign the Attribute to the Category and Group, and define its values.

* **Method:** `POST`
* **URL:** `/api/admin/attributes`
* **Body:**
```json
{
    "attribute_group_id": 1,
    "category_id": 1,
    "name": "Device Color",
    "type": "select",
    "is_required": true,
    "is_filterable": true,
    "is_variant_maker": true,
    "values": ["Red", "Blue", "Black"]
}
```
*(Assume the attribute gets `id: 1` and the values get `id: 1`, `2`, `3`)*

### Step 4: Add a Product!
Now you can create a product referencing the Category and the Attribute Values you just made.

* **Method:** `POST`
* **URL:** `/api/admin/products`
* **Body:**
```json
{
    "seller_id": 2,
    "category_id": 1,
    "name": "Smartphone X",
    "slug": "smartphone-x",
    "short_description": "Latest smartphone.",
    "description": "Full description of the phone...",
    "base_price": 999.99,
    "images": [
        "https://example.com/phone.jpg"
    ],
    "variants": [
        {
            "sku": "PHONE-RED-01",
            "price": 999.99,
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

---

## Other Admin APIs

### Product Management
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/admin/products` | List all products (can filter with `?status=pending`) |
| `GET` | `/api/admin/products/{id}` | Get single product details |
| `PUT` | `/api/admin/products/{id}` | Update a product |
| `DELETE` | `/api/admin/products/{id}` | Delete a product |
| `PUT` | `/api/admin/products/{id}/approve` | Approve a pending product |
### Category Management
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/admin/categories` | Create new category |
| `PUT` | `/api/admin/categories/{id}` | Update category |
| `DELETE` | `/api/admin/categories/{id}` | Delete category |

**Example PUT Category Body:**
```json
{
    "name": "Updated Electronics",
    "slug": "updated-electronics",
    "is_active": false
}
```

### KYC & Seller Compliance
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/admin/kyc` | List all pending KYC requests |
| `PUT` | `/api/admin/kyc/{id}/approve` | Approve seller KYC |
| `PUT` | `/api/admin/kyc/{id}/reject` | Reject seller KYC |

**Example Reject KYC Body:**
```json
{
    "rejection_reason": "Business registration document is expired or illegible."
}
```

### Commission Rules
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/admin/commissions` | List all commission rules |
| `POST` | `/api/admin/commissions` | Create commission rule |

**Example POST Commission Body:**
```json
{
    "category_id": null,
    "rate": 10.50,
    "is_active": true
}
```

### Attribute Management
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/admin/attributes/groups` | Create an attribute group |
| `DELETE` | `/api/admin/attributes/groups/{id}`| Delete attribute group |
| `POST` | `/api/admin/attributes` | Add a value to a group |
| `PUT` | `/api/admin/attributes/{id}` | Update an attribute value |
| `DELETE` | `/api/admin/attributes/{id}` | Delete an attribute value |

**Example PUT Attribute Value Body:**
```json
{
    "value": "Crimson Red",
    "color_code": "#DC143C"
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
