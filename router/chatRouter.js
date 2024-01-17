import express from 'express'

import { isAuthenticate } from '../middleware/isAuthenticate.js';
import { allMessage, deleteAllMsg, postMessage, twilioMsgSend } from '../controller/chatController.js';

const chatRoute = express.Router();

chatRoute
.post('/' ,isAuthenticate, postMessage)
.post ('/msg' ,isAuthenticate, allMessage)
.post('/twilio' , isAuthenticate,twilioMsgSend)
.patch('/:id',isAuthenticate)
.delete('/:id' ,isAuthenticate)
.delete('/delAllmsg' , deleteAllMsg)

export default chatRoute
