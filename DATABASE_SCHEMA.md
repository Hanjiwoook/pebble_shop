# Database Schema

## `auth.users` table (Supabase built-in)
- `id`: UUID (Primary Key)
- ... (other default user columns)

## `products` table
- `id`: Primary Key
- `name`: string
- `description`: string
- `price`: number
- `image_urls`: string[] (array of image URLs)
- `category_id`: Foreign Key
- `created_at`: timestamp

## `product_variants` table
- `id`: Primary Key
- `product_id`: Foreign Key (references `products.id`)
- `size`: string
- `color`: string
- `stock_quantity`: number

## `carts` table
- `id`: Primary Key
- `user_id`: Foreign Key (references `auth.users.id`)
- `variant_id`: Foreign Key (references `product_variants.id`)
- `quantity`: number
- `created_at`: timestamp

## `profiles` table
- `id`: Foreign Key (references `auth.users.id`)
- `username`: string
- `full_name`: string
- `updated_at`: timestamp

## `categories` table
- `id`: Primary Key
- `name`: string

## `orders` table
- `id`: Primary Key
- `user_id`: Foreign Key (references `auth.users.id`)
- `total_price`: number
- `status`: string
- `created_at`: timestamp

## `order_items` table
- `id`: Primary Key
- `order_id`: Foreign Key (references `orders.id`)
- `variant_id`: Foreign Key (references `product_variants.id`)
- `quantity`: number
- `price_at_purchase`: number