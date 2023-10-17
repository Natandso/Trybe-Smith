import express from 'express';
import productsRouters from './routers/product.router';
import ordersRouters from './routers/order.routers';

const app = express();

app.use(express.json());

app.use(productsRouters);
app.use(ordersRouters);

export default app;
