import express from 'express';
import productsRouters from './routers/product.routers';
import ordersRouters from './routers/order.routers';
import loginRouter from './routers/login.routers';

const app = express();

app.use(express.json());

app.use(productsRouters);
app.use(ordersRouters);
app.use(loginRouter);

export default app;
