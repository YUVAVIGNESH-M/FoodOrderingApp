import mongoose from 'mongoose'

const orderSchema=mongoose.Schema({
    user_id:{
        type:String,
        required:[true,"userid is missing"],
     },
     userName:{
        type:String,
        required:true
     },
     orders:[
        {
            product_id:{
                type:String,
                required:[true,"product id is missing"]
            },
            name:{
                type:String,
                required:true
            },
            price:{
                type:String,
                required:true
            },
            quantity:{
                type:Number,
                required:[true,'please add the quantity'],
            },
            total:{
                type:String,
                required:[true,"total amount is missing"],
            },
            img:{
                type:String,
            }
        }
        ],
     totalprice:{
        type:String,
        required:[true,'total price is missing'],
     },
     status:{
        type:String,
        required:[true,"status is required"],
     }
    
},{ timestamps: true })


export default mongoose.model('Orders',orderSchema);