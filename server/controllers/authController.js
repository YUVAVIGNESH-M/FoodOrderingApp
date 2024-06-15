import userModel from "../models/userModel.js"
import bcrypt from 'bcrypt'
export const signUp=async(req,res)=>{
        const salt=await bcrypt.genSalt(10)
        const hashedpassword=await bcrypt.hash(req.body.password,salt)
        req.body.password=hashedpassword
        try {
            const newUser=new userModel(req.body)
            const savedUser=await newUser.save()
            res.status(200).send(savedUser)
        } catch (error) {
            console.log(error)
        }
        
        
}

export const login=async(req,res)=>{
        console.log(req.body)
        const {username,password}=req.body
        console.log(username)
        const dbuser=await userModel.findOne({
            username:username
        })
        
        bcrypt.compare(password,dbuser.password,(err,result)=>{
            if(err)
            console.log(err)
            else{
                if(result)
                res.status(200).send(dbuser)
                else{
                    res.status(401).send("password not matched")
                }
            }
        })
        

}