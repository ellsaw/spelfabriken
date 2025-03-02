import Database from 'better-sqlite3';
import slugify from 'slugify';

const db = new Database('./database/shop.db');

function dbAdd(product_name, description, category, brand, sku, img, price, date){
    try {

        const slug = slugify(`${brand}-${product_name}`, {
            lower: true,
            remove: /[*+~.,()'"!:@/åäö]/g,
            })


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
            stmt.run(product_name, description, category, brand, sku, img, price, date, slug);
    } catch (error) {
        return error;
    }
}

export { dbAdd }