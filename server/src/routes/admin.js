import multer from 'multer';

import { dbAdd, dbGetForAdmin, dbDelete, dbGetForCampaigns, dbSetCampaign } from "../../database/models/adminModels.js";

import express from 'express';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage })


router.post("", upload.single("image"), (req, res) => {
    const {product_name, description, superCategory, category, brand, sku, price, date} = req.body;

    const superCategoryString = superCategory == 0 ? "Spel" : superCategory == 1 ? "Konsoller" : superCategory == 2 ? "PC" : superCategory == 3 ? "TV, Ljud & Bild" : superCategory == 4 ? "Hobby" : null;

    const image = req.file.buffer;

    const response = dbAdd(product_name, description, superCategoryString, category, brand, sku, image, price, date)

    if (response) {
        res.status(400).json({ error: response });
    } else {
        console.log("Request successful");
        res.status(200).json({ success: true });
    }
})

router.get("/", (req, res) => {
    const products = dbGetForAdmin();

    if(products){
        res.status(200).json(products)
    } else {
        res.status(500).json(null)
    }
})

router.post("/delete", (req, res) => {
    const { id } = req.body;

    const response = dbDelete(id);

    if (response) {
        res.status(400).json({ error: response });
    } else {
        console.log("Request successful");
        res.status(200).json({ success: true });
    }
})

router.get("/campaigns", (req, res) => {
    const products = dbGetForCampaigns();

    if(products){
        res.status(200).json(products)
    } else {
        res.status(500).json(null)
    }
})

router.post("/campaigns", (req, res) => {
    const { id, campaignPrice } = req.body;

    const response = dbSetCampaign(id, campaignPrice);

    if (response) {
        res.status(400).json({ error: response });
    } else {
        console.log("Request successful");
        res.status(200).json({ success: true });
    }
})

export default router;