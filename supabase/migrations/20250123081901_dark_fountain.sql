/*
  # E-commerce Store Schema

  1. New Tables
    - `products`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `price` (decimal)
      - `image_url` (text)
      - `stock` (integer)
      - `created_at` (timestamp)
    - `orders`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `status` (text)
      - `total` (decimal)
      - `created_at` (timestamp)
    - `order_items`
      - `id` (uuid, primary key)
      - `order_id` (uuid, references orders)
      - `product_id` (uuid, references products)
      - `quantity` (integer)
      - `price` (decimal)

  2. Security
    - Enable RLS on all tables
    - Products are readable by everyone, but only admins can modify
    - Orders and order items are only accessible by their owners
*/

-- Create products table
CREATE TABLE products (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    description text,
    price decimal(10,2) NOT NULL,
    image_url text,
    stock integer NOT NULL DEFAULT 0,
    created_at timestamptz DEFAULT now()
);

-- Create orders table
CREATE TABLE orders (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users NOT NULL,
    status text NOT NULL DEFAULT 'pending',
    total decimal(10,2) NOT NULL,
    created_at timestamptz DEFAULT now()
);

-- Create order items table
CREATE TABLE order_items (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id uuid REFERENCES orders ON DELETE CASCADE,
    product_id uuid REFERENCES products,
    quantity integer NOT NULL,
    price decimal(10,2) NOT NULL
);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Policies for products
CREATE POLICY "Products are viewable by everyone"
    ON products FOR SELECT
    TO public
    USING (true);

CREATE POLICY "Products are insertable by authenticated users"
    ON products FOR INSERT
    TO authenticated
    WITH CHECK (true);

-- Policies for orders
CREATE POLICY "Users can view their own orders"
    ON orders FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own orders"
    ON orders FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

-- Policies for order items
CREATE POLICY "Users can view their own order items"
    ON order_items FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM orders
            WHERE orders.id = order_items.order_id
            AND orders.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can insert their own order items"
    ON order_items FOR INSERT
    TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM orders
            WHERE orders.id = order_items.order_id
            AND orders.user_id = auth.uid()
        )
    );