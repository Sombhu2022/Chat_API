import { Chats } from "../models/chatModel.js";

export const postMessage = async(req,res)=>{
    try {
       const {message , reciver} = req.body;
       const {email , name} =req.user;
       const sender ={
        name:name,
        email:email
       }
       const data = await Chats.create({message , sender , reciver })
       res.status(200).json({
        success:true ,
        message:"message post successfully",
        user:req.user,
        data
       })
    
   } catch (error) {
    res.status(200).json({
        success:true ,
        message:"message not post",
        user:req.user
       })
   }
}

export const allMessage = async (req , res) =>{
    try {
        const {reciver}=req.body
        const {email , name} =req.user;
       const sender ={
        name:name,
        email:email
       }
        const data= await Chats.find({})

        const response= data.filter(
            (data) => data.sender.email ===email  && data.reciver.email === reciver.email || data.sender.email ===reciver.email  && data.reciver.email === email
          );

        res.status(200).json({
            success:true ,
            chat: response ,
            user:req.user
        })
    } catch (error) {
        res.status(400).json({
            success:true,
            error,
            user:req.user
        })
    }
}