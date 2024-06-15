import mongoose from 'mongoose'

const productSchema=mongoose.Schema({
      name:{
        type:String,
        required:[true,"please add the user name"],
      },
     price:{
           type:String,
           required:[true,'please add the price'],
      },
      desc:{
        type:String,
        required:[true,"please add the desc for the product"],
      },
      img:{
        public_id:{
          type:String,
          required:true
        },
        url:{
          type:String,
          required:true
        }
      }
},{ timestamps: true })



export default mongoose.model('Products',productSchema);