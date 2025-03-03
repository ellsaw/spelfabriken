import express from "express";
import multer from 'multer';

import { dbAdd, dbGetForAdmin, dbDelete } from "../database/db.js";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage })

const app = express();
app.use(express.json());

const port = 8000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

app.post("/api/products/admin", upload.single("image"), (req, res) => {
    console.log("POST recieved at /api/products/admin")
    const {product_name, description, category, brand, sku, price, date} = req.body;

    const image = req.file.buffer;

    const response = dbAdd(product_name, description, category, brand, sku, image, price, date)

    if (response) {
        res.status(400).json({ error: response });
    } else {
        console.log("Request successful");
        res.status(200).json({ success: true });
    }
})

app.get("/api/products/admin", (req, res) => {
    console.log("GET recieved at /api/products/admin")

    const products = dbGetForAdmin();

    if(products){
        res.status(200).json(products)
    } else {
        res.status(500).json(null)
    }
})

app.post("/api/products/admin/delete", (req, res) => {
    console.log("POST recieved at /api/products/admin/delete")
    const { id } = req.body;

    const response = dbDelete(id);

    if (response) {
        res.status(400).json({ error: response });
    } else {
        console.log("Request successful");
        res.status(200).json({ success: true });
    }
})