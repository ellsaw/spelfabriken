import db from '../db.js'
import bufferToImg from '../../utils/bufferToImg.js';
import Fuse from 'fuse.js'

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
            supercategory,
            category,
            img,
            price,
            campaign_price,
            slug
            FROM products
            WHERE category_slug = ? OR supercategory_slug = ?
            ORDER BY id DESC;
            `)

        const products = stmt.all(category, category)

        if(products.length === 0){
            throw new Error("Invalid Category")
        }

        products.forEach(product => {
            product.img = bufferToImg(product.img);
        });

        return products;

    } catch (error) {
        console.error(error.message);
        return error.message;
    }
}


function search(query){
    try {
        const stmt = db.prepare(`
            SELECT
            id,
            product_name,
            brand,
            supercategory,
            category
            FROM products
            `)
        const result = stmt.all()

        const fuseOptions = {
            minMatchCharLength: 2,
            findAllMatches: true,
            threshold: 0.2,
            keys: [
                "product_name",
                "brand",
                "supercategory",
                "category"
            ]
        }

        const fuse = new Fuse(result, fuseOptions)

        return fuse.search(query);

    } catch (error) {
        return error;
    }
}

function dbGetForSearch(query){
    try {
        const results = search(query)

        const products = [];
        results.forEach(result => {
            const stmt = db.prepare(`
                SELECT
                id,
                product_name,
                brand,
                supercategory,
                category,
                img,
                price,
                campaign_price,
                slug
                FROM products
                WHERE id = ?;
                `)
                const product = stmt.get(result.item.id)
    
                products.push(product)
        });

        products.forEach(product => {
            product.img = bufferToImg(product.img);
        });

        return products;

    } catch (error) {
        console.error(error.message);   
    }
}

function dbGetForProductDetails(slug){
    try {
        const stmt = db.prepare(`
            SELECT
            id,
            product_name,
            brand,
            supercategory,
            supercategory_slug,
            category,
            category_slug,
            img,
            price,
            campaign_price
            FROM products
            WHERE slug = ?;            
            `);
        const product = stmt.get(slug);

        if(product) product.img = bufferToImg(product.img);

        return {product: product, error: null};
        
    } catch (e) {
        const error = e.message;

        console.error(error);

        return {product: null, error: error}
    }
}
export { dbGetForCampaignCarousel, dbGetForProductShowcase, dbGetForCategory, dbGetForSearch, dbGetForProductDetails }