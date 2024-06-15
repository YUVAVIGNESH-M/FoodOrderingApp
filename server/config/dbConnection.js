import mongoose from 'mongoose'

export const connectDb=async()=>{
    try {
        const connection=mongoose.connect("mongodb://localhost:27017/SivamalaiCatering", {
            dbName: 'SivamalaiCatering' // Specify the desired database name here
          })
        console.log("connected to mongodb")
    } catch (error) {
        console.log(error)
    }
    
}