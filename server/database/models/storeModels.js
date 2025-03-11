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
            WHERE campaign_price > 0;
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

export { dbGetForCampaignCarousel }