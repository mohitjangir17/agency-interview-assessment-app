import jwt from 'jsonwebtoken';

const userAuth = (req, res, next) => {

    const token = req.cookies?.accessToken || req.headers.authorization?.split(' ')[1] || req.header('Authorization')?.replace("Bearer", "")

    // console.log(token, "token")

    if (!token) {
        return res.status(401).json({ success: false, message: 'Not authorized, no token' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWTSECRET);

        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Not authorized, token failed' });
    }
};

export default userAuth
