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
        return new Error('Error from search:', error.message);
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
            description,
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

function dbGetForRelatedProducts(relatedToId){
    try {

        function getSourceProduct(id){

            try {
                const stmt = db.prepare(`
                    SELECT
                    product_name,
                    brand,
                    category,
                    supercategory
                    FROM products
                    WHERE id = ?;
                    `)
                
                return stmt.get(id);
            } catch (error) {
                return new Error('Error from getSourceProduct:', error.message)
            }

        }

        const sourceProduct = getSourceProduct(relatedToId)

        const resultIds = [];
        for(const value of Object.values(sourceProduct)){
            const results = search(value);

            results.forEach(result => {
                if((!resultIds.includes(result.item.id)) && (result.item.id != relatedToId) && (resultIds.length < 8)){
                    resultIds.push(result.item.id);
                }
            });

            if(resultIds.length === 8) break;
        }

        const products = [];
        resultIds.forEach(resultId=> {
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
                const product = stmt.get(resultId)
    
                products.push(product)
        });

        if(products.length <= 8){
            for(let i = products.length; i < 8 ; i++){
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
                    WHERE id NOT IN (${( resultIds.length > 0 ? resultIds.join(",") + ", " : "") + relatedToId})
                    ORDER BY RANDOM();
                    `)
                    const product = stmt.get()
        
                    resultIds.push(product.id);
                    products.push(product)
            }
        }


        products.forEach(product => {
            product.img = bufferToImg(product.img);
        });

        return products;
        
    } catch (error) {
        console.error(error.message)
    }
}

function dbGetForCart(id){
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
        WHERE id = ?
        `)

        const product = stmt.get(id);

        product.img = bufferToImg(product.img);

        return product;

    } catch (error) {
        console.error(error.message)
    }
}

export { dbGetForCampaignCarousel, dbGetForProductShowcase, dbGetForCategory, dbGetForSearch, dbGetForProductDetails, dbGetForRelatedProducts, dbGetForCart }