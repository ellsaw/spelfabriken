import Database from 'better-sqlite3';
import slugify from 'slugify';


const db = new Database('./database/shop.db');

console.log("Connected to database");

try {
    db.exec(`
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            product_name TEXT NOT NULL,
            description TEXT NOT NULL,
            category TEXT NOT NULL,
            category_slug TEXT NOT NULL UNIQUE,
            brand TEXT NOT NULL,
            sku TEXT NOT NULL UNIQUE,
            img BLOB NOT NULL,
            price REAL NOT NULL,
            date TEXT NOT NULL,
            slug TEXT NOT NULL UNIQUE
        );
    `);

    console.log("Table created or already exists.");
} catch (error) {
    console.error(error.message);
}

function checkSlug(slug){
    const stmt = db.prepare(`SELECT slug FROM products WHERE slug = ?`);
    return stmt.get(slug);
}

function dbAdd(product_name, description, category, brand, sku, img, price, date){
    try {
        const slug = slugify(`${brand}-${product_name}`, {
            lower: true,
            remove: /[*+~.,()'"!:@/åäö]/g,
        })

        const slugifiedCategry = slugify(category, {
            lower: true,
            remove: /[*+~.,()'"!:@/åäö]/g,
        })


        let i = 1;
        let newSlug = slug;

        while(checkSlug(newSlug)){
            newSlug = `${slug}-${i}`;
            i++;
        }


        const stmt = db.prepare(
            `INSERT INTO PRODUCTS(
            product_name,
            description,
            category,
            category_slug,
            brand,
            sku,
            img,
            price,
            date,
            slug)
            VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
            stmt.run(product_name, description, category, slugifiedCategry, brand, sku, img, price, date, newSlug);
    } catch (error) {
        console.error(error.message);
        
        return error.message;
    }
}

function dbGetForAdmin(){
    try {
        const stmt = db.prepare(`
            SELECT
            id,
            product_name,
            category,
            brand,
            sku,
            price
            FROM products
            ORDER BY id DESC`)
        return stmt.all();
    } catch (error) {
        console.error(error.message)
        return null;
    }
}

function dbDelete(id){
    try {
        const stmt = db.prepare(`
            DELETE FROM products WHERE id = ?
            `)
        stmt.run(id);
    } catch (error) {
        console.error(error.message);
        return error.message;
    }
}

export { dbAdd, dbGetForAdmin, dbDelete }