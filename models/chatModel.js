import mongoose from 'mongoose'

const chatModel = new mongoose.Schema({
    message:{
        type:String ,
        max:20000,
        required:true
    },
    sender:{
        
        name:{
            type:String ,
        },
        email:{
            type:String
        }
    },
    reciver:{
        name:{
            type:String ,
        },
        email:{
            type:String
        }
    },
    postAt:{
        type:Date,
        default:Date.now()
    }
})

export const Chats = mongoose.model("chat",chatModel);