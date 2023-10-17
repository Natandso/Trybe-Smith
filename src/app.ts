import express from 'express';
import productsRouters from './routers/product.router';

const app = express();

app.use(express.json());

app.use(productsRouters);

export default app;
