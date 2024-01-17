import { Chats } from "../models/chatModel.js";
import twilio from 'twilio'

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


export const deleteAllMsg = async (req , res)=>{
    try {
        await Chats.deleteMany({})
        res.json({
            message:"delete all message..."
        })
    } catch (error) {
        res.json({
            error
        })
    }
}

export const twilioMsgSend = async (req , res)=>{
    const {body , to} = req.body
    const client = twilio(process.env.TWILIO_SID , process.env.TWILIO_TOKEN);
    try {
        const message = await client.messages.create({
            body: body,
            to:  to,
            from: process.env.TWILIO_NUMBER,
          });
          res.status(200).json({
            message:"msg send",
            message
          })
          
        } catch (error) {
            
            res.status(400).json({
              message:"msg not send",
              error
            })
    }

}

