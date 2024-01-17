import express from 'express'
import 'dotenv/config'

import {createServer} from 'node:http'
import { Server } from 'socket.io'

import cors from 'cors'
import cookieParser from 'cookie-parser'
import { dbConection } from './db/database.js'
import bodyParser from 'body-parser'
import userRoute from './router/userRouter.js'
import fileUpload from 'express-fileupload'
import {v2 as cloudinary} from 'cloudinary'
import chatRoute from './router/chatRouter.js'

const app = express()
const server =createServer(app)

dbConection();
app.use(cors({
    origin: [process.env.FRONTEND_URL , 'http://localhost:3000' , '/*'], 
    
    exposedHeaders: ['X-Total-Count'],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
}))

cloudinary.config({
    cloud_name:process.env.CLOUDE_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})



app.use(express.json())
app.use(bodyParser.json({limit:"25mb"}));
app.use(cookieParser());
app.use(fileUpload())

app.use('/user' , userRoute)
app.use('/chat',chatRoute)

const io =new Server(server , {
    cors:{
      origin:'*'
    }
});

server.listen(process.env.PORT , ()=>{
    console.log("io server runing 5000 port")
});


let activeUser=[]
let message = []
io.on("connection", (socket) => {
    console.log('user connect' , socket.id)
    socket.on('user-join' , (joinUser)=>{
        if(!activeUser.some((user)=>user.userId === joinUser._id )){
            activeUser.push({
                userId:joinUser._id,
                socketId:socket.id,
                user:joinUser
            })
        }
        console.log( "user conected",activeUser);
        socket.emit('wellcome-user' ,joinUser)
        io.emit('user_connect_msg',activeUser )
    })

    socket.on('msg-send' ,(msg)=>{
        message.push({
            msg 
        })
        console.log(msg.reciverId)
        io.to([msg.reciverId]).emit('msg_show' , message)
    })
     // x8WIv7-mJelg7on_ALbx
    

  });


// app.listen(process.env.PORT, ()=>{
//   console.log("post runing" ,process.env.PORT);
// })