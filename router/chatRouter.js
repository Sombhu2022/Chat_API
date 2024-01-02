import express from 'express'

import { isAuthenticate } from '../middleware/isAuthenticate.js';
import { allMessage, postMessage } from '../controller/chatController.js';

const chatRoute = express.Router();

chatRoute
.post('/' ,isAuthenticate, postMessage)
.post ('/msg' ,isAuthenticate, allMessage)
.patch('/:id',isAuthenticate)
.delete('/:id' ,isAuthenticate)

export default chatRoute
