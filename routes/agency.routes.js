import { Router } from 'express';
import { createAgencyAndClient, getTopClients } from '../controllers/agency.controller.js';
import userAuth from '../middlewares/authUser.middleware.js';
import { body } from 'express-validator';


const router = Router();

router.post('/', [
    body('agency.name')
        .notEmpty().withMessage('Agency name is required')
        .trim(),
    body('agency.address1')
        .notEmpty().withMessage('Agency address1 is required')
        .trim(),
    body('agency.state')
        .notEmpty().withMessage('Agency state is required')
        .trim(),
    body('agency.city')
        .notEmpty().withMessage('Agency city is required')
        .trim(),
    body('agency.phoneNumber')
        .notEmpty().withMessage('Agency phone number is required')
        .isMobilePhone().withMessage('Agency phone number must be a valid phone number'),

    // Client validation
    body('client.name')
        .notEmpty().withMessage('Client name is required')
        .trim(),
    body('client.email')
        .isEmail().withMessage('Client email must be a valid email'),
    body('client.phoneNumber')
        .notEmpty().withMessage('Client phone number is required')
        .isMobilePhone().withMessage('Client phone number must be a valid phone number'),
], userAuth, createAgencyAndClient);

router.get('/top-clients', userAuth, getTopClients);

export default router
