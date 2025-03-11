import db from '../db.js'

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

        return stmt.all()
    } catch (error) {
        console.error(error.message);
        return error.message;
    }
}

export { dbGetForCampaignCarousel }