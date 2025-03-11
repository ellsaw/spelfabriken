import express from "express";
import logger from 'morgan';

const app = express();
app.use(express.json());
app.use(logger('dev'));

const port = 8000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

import adminRouter from './routes/admin.js'
import storeRouter from './routes/store.js'

app.use('/api/products/admin', adminRouter);
app.use('/api/products/store', storeRouter);

