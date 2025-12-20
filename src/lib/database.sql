-- Sanjeevika E-commerce Database Schema
-- Based on PHP application structure

-- Users table
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    mobile VARCHAR(20),
    state VARCHAR(100),
    country VARCHAR(100) DEFAULT 'India',
    full_add JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id VARCHAR(50) UNIQUE NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    sku VARCHAR(100) UNIQUE,
    category VARCHAR(100) NOT NULL,
    description TEXT,
    key_benefits JSON,
    selected_tags JSON,
    variants JSON,
    image_paths TEXT,
    rating DECIMAL(2,1) DEFAULT 0,
    reviews_count INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Categories table
CREATE TABLE categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    image VARCHAR(255),
    parent_id INT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INT DEFAULT 0,
    FOREIGN KEY (parent_id) REFERENCES categories(id)
);

-- Orders table
CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    tax_amount DECIMAL(10,2) DEFAULT 0,
    discount_amount DECIMAL(10,2) DEFAULT 0,
    shipping_amount DECIMAL(10,2) DEFAULT 0,
    status ENUM('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
    payment_status ENUM('pending', 'paid', 'failed', 'refunded') DEFAULT 'pending',
    shipping_address JSON NOT NULL,
    billing_address JSON,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Order items table
CREATE TABLE order_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    product_sku VARCHAR(100),
    quantity INT NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    variant_info JSON,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Wishlist table
CREATE TABLE wishlist (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id),
    UNIQUE KEY unique_wishlist (user_id, product_id)
);

-- Reviews table
CREATE TABLE reviews (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title VARCHAR(255),
    comment TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    is_approved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Newsletter subscriptions
CREATE TABLE newsletter_subscriptions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contact messages
CREATE TABLE contact_messages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255),
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample categories
INSERT INTO categories (name, slug, image, sort_order) VALUES
('Health Care', 'healthcare', 'samisha march 3.webp', 1),
('Personal Care', 'personalcare', 'samisha march 1.webp', 2),
('Hair Care', 'haircare', 'samisha march 1.webp', 3),
('Oral Care', 'oralcare', 'samisha march 1.webp', 4),
('Skin Care', 'skincare', 'samisha march 1.webp', 5),
('Ayurvedic Medicines', 'ayurvedicmedicines', 'samisha march 1.webp', 6),
('Beverages', 'beverages', 'samisha march 4.webp', 7),
('Seasonal', 'seasonal', 'samisha march 4.webp', 8),
('Special Combos', 'specialcombos', 'samisha march 5 (1).webp', 9);

-- Insert sample products
INSERT INTO products (product_id, product_name, sku, category, description, key_benefits, selected_tags, variants, image_paths, rating, reviews_count) VALUES
('PROD001', 'Neem Face Wash', 'NFW001', 'personalcare', 'Natural neem face wash for clear and healthy skin', 
 '["Anti-bacterial", "Deep cleansing", "Natural ingredients", "Suitable for all skin types"]',
 '["Organic", "Natural", "Ayurvedic", "Herbal"]',
 '[{"quantity": "80g", "price": 120, "sellingPrice": 106, "discount": 12, "productTax": "included tax"}]',
 '12 6.webp', 4.2, 15),

('PROD002', 'Arogya Amrit Herbal Tea', 'AAT001', 'healthcare', 'Immunity boosting herbal tea blend',
 '["Boosts immunity", "Natural antioxidants", "Stress relief", "Digestive health"]',
 '["Organic", "Herbal", "Immunity", "Natural"]',
 '[{"quantity": "115g", "price": 120, "sellingPrice": 106, "discount": 12, "productTax": "included tax"}]',
 '11 5 (1).webp', 4.5, 22),

('PROD003', 'Keshwardhna Herbal Shampoo', 'KHS001', 'haircare', 'Natural herbal shampoo for healthy hair growth',
 '["Hair growth", "Anti-dandruff", "Natural ingredients", "Chemical-free"]',
 '["Herbal", "Natural", "Hair care", "Organic"]',
 '[{"quantity": "200ml", "price": 120, "sellingPrice": 106, "discount": 12, "productTax": "included tax"}]',
 '10 2.webp', 4.3, 18),

('PROD004', 'Dant Shuddhi Toothpaste', 'DST001', 'oralcare', 'Ayurvedic toothpaste for complete oral care',
 '["Prevents cavities", "Fresh breath", "Natural whitening", "Gum protection"]',
 '["Ayurvedic", "Natural", "Fluoride-free", "Herbal"]',
 '[{"quantity": "100g", "price": 120, "sellingPrice": 106, "discount": 12, "productTax": "included tax"}]',
 'DANT SHUDDHI.webp', 4.1, 12),

('PROD005', 'Brahmi Badam Sharbat', 'BBS001', 'beverages', 'Refreshing and nutritious herbal drink',
 '["Brain health", "Memory enhancement", "Natural cooling", "Nutritious"]',
 '["Herbal", "Refreshing", "Natural", "Healthy"]',
 '[{"quantity": "750ml", "price": 220, "sellingPrice": 194, "discount": 12, "productTax": "included tax"}]',
 'BRAHMI BADAM SHARBAT 1 (1).webp', 4.4, 25);