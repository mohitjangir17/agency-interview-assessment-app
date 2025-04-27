import { User } from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';

const generateToken = async (id) => {
    return jwt.sign({ id }, process.env.JWTSECRET, { expiresIn: '30d' });
};

export const registerUser = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide email and password' });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(409).json({ message: 'User already exists' });
    }

    const user = await User.create({ email, password });

    res.status(201)
        .json({
            success: true,
            message: "User created successfully.",
            data: {
                _id: user._id,
                email: user.email,
            }
        });
};

export const loginUser = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {

        const token = await generateToken(user._id)
        const options = {
            httpOnly: true,
            secure: true,
        }

        res.status(200)
            .cookie('accessToken', token, options)
            .json({
                success: true,
                message: 'User logged in successfully.',
                data: {
                    _id: user._id,
                    email: user.email,
                    token: token
                }
            });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
};
