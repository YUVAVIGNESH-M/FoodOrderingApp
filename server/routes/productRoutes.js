import express from 'express'
import {addProduct,getAllProduct,deleteAllProducts,getProduct,getAllProductCount,getLimitedProducts} from  '../controllers/productController.js'
const productRouter=express.Router()

productRouter.post('/new',addProduct)
productRouter.get('/count',getAllProductCount)
productRouter.get('/limit',getLimitedProducts)
productRouter.get('/',getAllProduct)
productRouter.get('/:id',getProduct)
productRouter.delete('/',deleteAllProducts)
export default productRouter