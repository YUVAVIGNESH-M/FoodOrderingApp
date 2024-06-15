import express from 'express';
import orderModel from '../models/orderModel.js'

export const createOrder=async(req,res)=>{
    console.log(req.body)
    try {

        const neworder=new orderModel(req.body);
        neworder.save()
        res.status(200).send(neworder)
    } catch (error) {
        console.log(error)
    }
}

export const getAllOrders=async(req,res)=>{
        try {
            const orderlist=await orderModel.find();
            res.status(200).send(orderlist)
        } catch (error) {
            console.log(error)
        }
}

export const getOrder=async(req,res)=>{
    const {id}=req.params;
       try {
          const orderlist=await orderModel.find({user_id:id})
          res.status(200).send(orderlist)
       } catch (error) {
          console.log(error)
       }
}

export const updateOrder=async(req,res)=>{
    try {
        const orderId=req.params.id;
        const previousStatus=req.query.status
        let newStatus=''
        if(previousStatus==='preparing')
        newStatus='ready for delivery'
        const updatedOrder = await orderModel.findByIdAndUpdate(
            orderId,
            { status: newStatus },
            { new: true }
        );
        res.status(200).json(updatedOrder)
    } catch (error) {
        console.log(error)
    }
}

export const removeOrder=async(req,res)=>{
    try {
        const orderId=req.params.id;
        await orderModel.deleteOne({_id:orderId})
        res.status(200).json({message:'order deleted successfully'})
    } catch (error) {
        console.log(error)
    }
}