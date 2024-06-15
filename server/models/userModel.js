import mongoose from 'mongoose'

const userSchema=mongoose.Schema({
      username:{
        type:String,
        required:[true,"please add the user name"],
      },
      phoneno:{
           type:String,
           required:[true,'please add the phone number'],
           unique:true,
      },
      place:{
        type:String,
        required:[true,"please add the name of your place"],
      },
      password:{
        type:String,
        required:[true,"password is required"]
      },
      admin:{
        type:String,
        required:true
      }
},{ timestamps: true })



export default mongoose.model('users',userSchema);