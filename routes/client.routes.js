import { Router } from 'express';
import { updateClient } from '../controllers/client.controller.js';
import userAuth from '../middlewares/authUser.middleware.js';

const router = Router();

router.put('/:id', userAuth, updateClient);

export default router;
