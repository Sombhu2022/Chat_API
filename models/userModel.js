import mongoose from "mongoose";

const userModel = new mongoose.Schema({
    name:{
        type:String ,
        required:true,
        max:100
    },
    email:{
        type:String ,
        required:true ,
        unique:true,
        max:300
    },
    dp:{
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    password:{
        type:String,
        min:8,
        required:true
    },
    createAt:{
        type:Date ,
        default:Date.now()
    }
});

export const Users = mongoose.model('user',userModel);