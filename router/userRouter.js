import express from 'express'
import { allUser, createUser, deleteUser, getUser, loginUser, logout } from '../controller/userController.js';
import { isAuthenticate } from '../middleware/isAuthenticate.js';

const userRoute = express.Router();

userRoute
.post('/register' , createUser)
.post('/login' , loginUser)
.get('/logout',isAuthenticate, logout)
.get('/' ,isAuthenticate, allUser)
.get('/:id',isAuthenticate, getUser )
.delete('/:id' ,isAuthenticate, deleteUser)

export default userRoute
