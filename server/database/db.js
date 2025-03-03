import Database from 'better-sqlite3';
import slugify from 'slugify';

const db = new Database('./database/shop.db');

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
            brand,
            sku,
            img,
            price,
            date,
            slug)
            VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)`);
            stmt.run(product_name, description, category, brand, sku, img, price, date, newSlug);
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