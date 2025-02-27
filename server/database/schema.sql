CREATE TABLE products(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_name TEXT NOT NULL,
    description TEXT NOT NULL,
    img BLOB NOT NULL,
    brand TEXT NOT NULL,
    sku TEXT NOT NULL UNIQUE,
    price REAL NOT NULL,
    date TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE 
    )

    DROP TABLE products;