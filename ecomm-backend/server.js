import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

import productRouter from './routes/productRoutes.js'
import userRouter from './routes/userRoutes.js'
import orderRouter from './routes/orderRoutes.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

dotenv.config();

const app = express();

app.use(express.json())

connectDB()

app.get('/', (req,res)=>{
    res.send('api is running..');
});


app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);

app.get('/api/config/paypal', (req,res)=>{
    res.send(process.env.PAYPAL_CLIENT_ID);
})


app.use(notFound);

app.use(errorHandler)



const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`server is running at port ${PORT}`.underline.bold.yellow));