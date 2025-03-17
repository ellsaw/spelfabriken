import db from '../db.js'
import bufferToImg from '../../utils/bufferToImg.js';

function dbGetForCampaignCarousel(){
    try {
        const stmt = db.prepare(`
            SELECT
            id,
            product_name,
            brand,
            img,
            price,
            campaign_price,
            slug
            FROM products
            WHERE campaign_price > 0
            ORDER BY (price - campaign_price) DESC;
            `)

        const products = stmt.all()

        products.forEach(product => {
            product.img = bufferToImg(product.img);
        });

        return products;

    } catch (error) {
        console.error(error.message);
        return error.message;
    }
}

function dbGetForProductShowcase(type){
    try {
        let stmt;

        if(type === "bestsellers"){
            stmt = db.prepare(`
                SELECT
                id,
                product_name,
                brand,
                img,
                price,
                campaign_price,
                slug
                FROM products
                ORDER BY price DESC
                LIMIT 5;
                `)

        }else if(type === "recent"){
            stmt = db.prepare(`
                SELECT
                id,
                product_name,
                brand,
                img,
                price,
                campaign_price,
                slug
                FROM products
                ORDER BY id DESC
                LIMIT 5;
                `)
        }else{
            throw new Error("Invalid type")
        }

        const products = stmt.all()

        products.forEach(product => {
            product.img = bufferToImg(product.img);
        });

        return products;

    } catch (error) {
        console.error(error.message);
        return error.message;
    }
}

function dbGetForCategory(category){
    try {
        const stmt = db.prepare(`
            SELECT
            id,
            product_name,
            brand,
            img,
            price,
            campaign_price,
            slug
            FROM products
            WHERE category_slug = ? OR supercategory_slug = ?
            ORDER BY id DESC;
            `)

        const products = stmt.all(category, category)

        products.forEach(product => {
            product.img = bufferToImg(product.img);
        });

        return products;

    } catch (error) {
        console.error(error.message);
        return error.message;
    }
}

export { dbGetForCampaignCarousel, dbGetForProductShowcase, dbGetForCategory }