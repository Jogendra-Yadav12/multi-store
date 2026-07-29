const fs = require('fs');

const collection = {
    "info": {
        "name": "Aetheris Luxe Multi-Store API (Complete)",
        "description": "Complete API collection for the Aetheris Luxe multi-vendor platform, including Public, Admin, Seller, and Buyer routes.",
        "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
    },
    "variable": [
        { "key": "base_url", "value": "https://multi-store-r9rk.onrender.com/api", "type": "string" },
        { "key": "admin_token", "value": "", "type": "string" },
        { "key": "seller_token", "value": "", "type": "string" },
        { "key": "buyer_token", "value": "", "type": "string" }
    ],
    "item": [
        {
            "name": "1. Authentication",
            "item": [
                {
                    "name": "Admin Login",
                    "request": {
                        "method": "POST",
                        "header": [{ "key": "Accept", "value": "application/json" }],
                        "url": "{{base_url}}/auth/login",
                        "body": { "mode": "raw", "raw": JSON.stringify({"email":"admin@gmail.com","password":"Admin@123"}, null, 4), "options": { "raw": { "language": "json" } } }
                    }
                },
                {
                    "name": "Seller Register",
                    "request": {
                        "method": "POST",
                        "header": [{ "key": "Accept", "value": "application/json" }],
                        "url": "{{base_url}}/seller/register",
                        "body": { "mode": "raw", "raw": JSON.stringify({"name":"New Seller","email":"seller1@example.com","password":"Password123","password_confirmation":"Password123"}, null, 4), "options": { "raw": { "language": "json" } } }
                    }
                },
                {
                    "name": "Seller Login",
                    "request": {
                        "method": "POST",
                        "header": [{ "key": "Accept", "value": "application/json" }],
                        "url": "{{base_url}}/auth/login",
                        "body": { "mode": "raw", "raw": JSON.stringify({"email":"seller1@example.com","password":"Password123"}, null, 4), "options": { "raw": { "language": "json" } } }
                    }
                },
                {
                    "name": "Get Authenticated User (Me)",
                    "request": {
                        "method": "GET",
                        "header": [
                            { "key": "Accept", "value": "application/json" },
                            { "key": "Authorization", "value": "Bearer {{admin_token}}" }
                        ],
                        "url": "{{base_url}}/auth/me"
                    }
                }
            ]
        },
        {
            "name": "2. Public / Guest APIs",
            "item": [
                { "name": "Health Check", "request": { "method": "GET", "header": [{ "key": "Accept", "value": "application/json" }], "url": "{{base_url}}/health" } },
                { "name": "List Plans", "request": { "method": "GET", "header": [{ "key": "Accept", "value": "application/json" }], "url": "{{base_url}}/plans" } },
                { "name": "List Categories", "request": { "method": "GET", "header": [{ "key": "Accept", "value": "application/json" }], "url": "{{base_url}}/categories" } },
                { "name": "List Attribute Groups", "request": { "method": "GET", "header": [{ "key": "Accept", "value": "application/json" }], "url": "{{base_url}}/attributes/groups" } },
                { "name": "List Attributes", "request": { "method": "GET", "header": [{ "key": "Accept", "value": "application/json" }], "url": "{{base_url}}/attributes" } },
                { "name": "List Products", "request": { "method": "GET", "header": [{ "key": "Accept", "value": "application/json" }], "url": "{{base_url}}/products" } },
                {
                    "name": "Get Cart",
                    "request": { "method": "GET", "header": [{ "key": "Accept", "value": "application/json" }], "url": "{{base_url}}/cart" }
                },
                {
                    "name": "Add to Cart",
                    "request": {
                        "method": "POST",
                        "header": [{ "key": "Accept", "value": "application/json" }],
                        "url": "{{base_url}}/cart/add",
                        "body": { "mode": "raw", "raw": JSON.stringify({"product_id": 1, "variant_id": 1, "quantity": 1}, null, 4), "options": { "raw": { "language": "json" } } }
                    }
                }
            ]
        },
        {
            "name": "3. Admin APIs",
            "item": [
                {
                    "name": "Plans",
                    "item": [
                        { "name": "List Plans", "request": { "method": "GET", "header": [{ "key": "Accept", "value": "application/json" }, { "key": "Authorization", "value": "Bearer {{admin_token}}" }], "url": "{{base_url}}/admin/plans" } },
                        { "name": "Create Plan", "request": { "method": "POST", "header": [{ "key": "Accept", "value": "application/json" }, { "key": "Authorization", "value": "Bearer {{admin_token}}" }], "url": "{{base_url}}/admin/plans", "body": { "mode": "raw", "raw": JSON.stringify({"name":"Gold Pro","slug":"gold-pro","description":"Premium seller plan","price":49.99,"duration":"monthly","commission_rate":5.00,"features":["priority_support","unlimited_products"]}, null, 4), "options": { "raw": { "language": "json" } } } } }
                    ]
                },
                {
                    "name": "Categories",
                    "item": [
                        { "name": "Create Category", "request": { "method": "POST", "header": [{ "key": "Accept", "value": "application/json" }, { "key": "Authorization", "value": "Bearer {{admin_token}}" }], "url": "{{base_url}}/admin/categories", "body": { "mode": "raw", "raw": JSON.stringify({"name":"Electronics","slug":"electronics","description":"Gadgets, devices","is_active":true}, null, 4), "options": { "raw": { "language": "json" } } } } },
                        { "name": "Update Category", "request": { "method": "PUT", "header": [{ "key": "Accept", "value": "application/json" }, { "key": "Authorization", "value": "Bearer {{admin_token}}" }], "url": "{{base_url}}/admin/categories/1", "body": { "mode": "raw", "raw": JSON.stringify({"name":"Updated Electronics","slug":"updated-electronics","is_active":false}, null, 4), "options": { "raw": { "language": "json" } } } } }
                    ]
                },
                {
                    "name": "Attributes",
                    "item": [
                        { "name": "Create Attribute Group", "request": { "method": "POST", "header": [{ "key": "Accept", "value": "application/json" }, { "key": "Authorization", "value": "Bearer {{admin_token}}" }], "url": "{{base_url}}/admin/attributes/groups", "body": { "mode": "raw", "raw": JSON.stringify({"name":"Color"}, null, 4), "options": { "raw": { "language": "json" } } } } },
                        { "name": "Create Attribute", "request": { "method": "POST", "header": [{ "key": "Accept", "value": "application/json" }, { "key": "Authorization", "value": "Bearer {{admin_token}}" }], "url": "{{base_url}}/admin/attributes", "body": { "mode": "raw", "raw": JSON.stringify({"attribute_group_id":1,"category_id":1,"name":"Device Color","type":"select","is_required":true,"is_filterable":true,"is_variant_maker":true,"values":["Red","Blue","Black"]}, null, 4), "options": { "raw": { "language": "json" } } } } }
                    ]
                },
                {
                    "name": "Products",
                    "item": [
                        { "name": "Admin List Products", "request": { "method": "GET", "header": [{ "key": "Accept", "value": "application/json" }, { "key": "Authorization", "value": "Bearer {{admin_token}}" }], "url": "{{base_url}}/admin/products" } },
                        { "name": "Admin Create Product", "request": { "method": "POST", "header": [{ "key": "Accept", "value": "application/json" }, { "key": "Authorization", "value": "Bearer {{admin_token}}" }], "url": "{{base_url}}/admin/products", "body": { "mode": "raw", "raw": JSON.stringify({"seller_id":2,"category_id":1,"name":"Smartphone X","slug":"smartphone-x","short_description":"Latest smartphone.","description":"Full description...","base_price":999.99,"images":["https://example.com/phone.jpg"],"variants":[{"sku":"PHONE-RED-01","price":999.99,"stock_quantity":50,"attributes":[{"attribute_id":1,"attribute_value_id":1}]}]}, null, 4), "options": { "raw": { "language": "json" } } } } },
                        { "name": "Approve Product", "request": { "method": "PUT", "header": [{ "key": "Accept", "value": "application/json" }, { "key": "Authorization", "value": "Bearer {{admin_token}}" }], "url": "{{base_url}}/admin/products/1/approve" } },
                        { "name": "Reject Product", "request": { "method": "PUT", "header": [{ "key": "Accept", "value": "application/json" }, { "key": "Authorization", "value": "Bearer {{admin_token}}" }], "url": "{{base_url}}/admin/products/1/reject", "body": { "mode": "raw", "raw": JSON.stringify({"reason":"Low quality images."}, null, 4), "options": { "raw": { "language": "json" } } } } }
                    ]
                },
                {
                    "name": "KYC & Commissions",
                    "item": [
                        { "name": "List Pending KYC", "request": { "method": "GET", "header": [{ "key": "Accept", "value": "application/json" }, { "key": "Authorization", "value": "Bearer {{admin_token}}" }], "url": "{{base_url}}/admin/kyc" } },
                        { "name": "Approve KYC", "request": { "method": "PUT", "header": [{ "key": "Accept", "value": "application/json" }, { "key": "Authorization", "value": "Bearer {{admin_token}}" }], "url": "{{base_url}}/admin/kyc/1/approve" } },
                        { "name": "Create Commission Rule", "request": { "method": "POST", "header": [{ "key": "Accept", "value": "application/json" }, { "key": "Authorization", "value": "Bearer {{admin_token}}" }], "url": "{{base_url}}/admin/commissions", "body": { "mode": "raw", "raw": JSON.stringify({"category_id":null,"rate":10.50,"is_active":true}, null, 4), "options": { "raw": { "language": "json" } } } } }
                    ]
                }
            ]
        },
        {
            "name": "4. Seller APIs",
            "item": [
                {
                    "name": "Create Store",
                    "request": {
                        "method": "POST",
                        "header": [{ "key": "Accept", "value": "application/json" }, { "key": "Authorization", "value": "Bearer {{seller_token}}" }],
                        "url": "{{base_url}}/seller/store",
                        "body": { "mode": "raw", "raw": JSON.stringify({"name":"My Cool Store","slug":"my-cool-store","description":"Best products","logo":"url","banner":"url","business_email":"contact@coolstore.com","phone":"1234567890"}, null, 4), "options": { "raw": { "language": "json" } } }
                    }
                },
                {
                    "name": "Add Product (Seller)",
                    "request": {
                        "method": "POST",
                        "header": [{ "key": "Accept", "value": "application/json" }, { "key": "Authorization", "value": "Bearer {{seller_token}}" }],
                        "url": "{{base_url}}/seller/products",
                        "body": { "mode": "raw", "raw": JSON.stringify({"category_id":1,"name":"Luxury Silk Scarf","slug":"luxury-silk-scarf-seller-1","short_description":"A beautiful silk scarf.","description":"Full description...","base_price":89.99,"images":["https://example.com/image1.jpg"],"variants":[{"sku":"SCARF-RED-01","price":89.99,"stock_quantity":50,"attributes":[{"attribute_id":1,"attribute_value_id":1}]}]}, null, 4), "options": { "raw": { "language": "json" } } }
                    }
                },
                {
                    "name": "Submit KYC",
                    "request": {
                        "method": "POST",
                        "header": [{ "key": "Accept", "value": "application/json" }, { "key": "Authorization", "value": "Bearer {{seller_token}}" }],
                        "url": "{{base_url}}/seller/kyc",
                        "body": { "mode": "raw", "raw": JSON.stringify({"document_type":"passport","document_number":"AB1234567","document_path":"https://example.com/passport.pdf"}, null, 4), "options": { "raw": { "language": "json" } } }
                    }
                },
                { "name": "Get Store Info", "request": { "method": "GET", "header": [{ "key": "Accept", "value": "application/json" }, { "key": "Authorization", "value": "Bearer {{seller_token}}" }], "url": "{{base_url}}/seller/store" } },
                { "name": "List Seller Products", "request": { "method": "GET", "header": [{ "key": "Accept", "value": "application/json" }, { "key": "Authorization", "value": "Bearer {{seller_token}}" }], "url": "{{base_url}}/seller/products" } },
                { "name": "List Seller Orders", "request": { "method": "GET", "header": [{ "key": "Accept", "value": "application/json" }, { "key": "Authorization", "value": "Bearer {{seller_token}}" }], "url": "{{base_url}}/seller/orders" } },
                { "name": "Get Wallet", "request": { "method": "GET", "header": [{ "key": "Accept", "value": "application/json" }, { "key": "Authorization", "value": "Bearer {{seller_token}}" }], "url": "{{base_url}}/seller/wallet" } }
            ]
        }
    ]
};

fs.writeFileSync('Aetheris_Luxe_Postman_Collection.json', JSON.stringify(collection, null, 2));
console.log('Postman collection successfully generated with ALL API routes!');
