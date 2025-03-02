CREATE TABLE products(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_name TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    brand TEXT NOT NULL,
    sku TEXT NOT NULL UNIQUE,
    img BLOB NOT NULL,
    price REAL NOT NULL,
    date TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE 
    )

    DROP TABLE products;