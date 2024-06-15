import express, { urlencoded } from 'express';
import {connectDb} from './config/dbConnection.js'
import productRouter from './routes/productRoutes.js'
import cors from 'cors'
import orderRouter from './routes/orderRoutes.js';
import authRouter from './routes/authRoutes.js';
const app=express();

connectDb()
app.use(cors())
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(express.json({ limit: '10mb' }));

app.use('/api/product',productRouter)
app.use('/api/orders',orderRouter)
app.use('/api/auth',authRouter)
app.listen(5000,()=>{
    console.log('server listening on 5000')
})