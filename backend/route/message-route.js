import express from 'express';
const router = express.Router();
import secureRoute from '../middleware/secureRoute.js';
import { getMessages, sendMessage } from '../controller/message-controller.js';
router.post('/send/:id', secureRoute, sendMessage);
router.get('/get/:id', secureRoute, getMessages);


export default router;