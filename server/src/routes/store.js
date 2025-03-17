import express from 'express';
const router = express.Router();

import { dbGetForCampaignCarousel, dbGetForProductShowcase, dbGetForCategory } from '../../database/models/storeModels.js';


router.get("/campaign-carousel", (req, res) => {
    const products = dbGetForCampaignCarousel();

    if(products){
        res.status(200).json(products)
    } else {
        res.status(500).json(null)
    }
})

router.get("/product-showcase/:type", (req, res) => {
    const { type } = req.params;

    const products = dbGetForProductShowcase(type);

    if(products){
        res.status(200).json(products)
    } else {
        res.status(500).json(null)
    }
})

router.get("/category/:category", (req, res) => {
    const { category } = req.params;

    const products = dbGetForCategory(category);

    if(products){
        res.status(200).json(products)
    } else {
        res.status(500).json(products)
    }
})

export default router;