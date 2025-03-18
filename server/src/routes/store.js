import express from 'express';
const router = express.Router();

import { dbGetForCampaignCarousel, dbGetForProductShowcase, dbGetForCategory, dbGetForSearch } from '../../database/models/storeModels.js';


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

router.get('/search/:query', (req, res) => {
    const { query } = req.params;

    const products = dbGetForSearch(query);

    if(products){
        res.status(200).json(products)
    } else {
        res.status(500).json()
    }
})


export default router;