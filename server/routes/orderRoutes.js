import express from 'express'
import {createOrder,getAllOrders,getOrder,updateOrder,removeOrder} from '../controllers/orderController.js'

const orderRouter=express.Router()

orderRouter.get('/',getAllOrders)
orderRouter.post('/',createOrder)
orderRouter.get('/:id',getOrder)
orderRouter.delete('/:id',removeOrder)
orderRouter.post('/updateorder/:id',updateOrder)


export default orderRouter