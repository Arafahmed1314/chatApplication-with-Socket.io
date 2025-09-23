import jwt from 'jsonwebtoken';
const createTokenAndSaveCookie = (userId, res) => {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: '24h', // Token expires in 24 hours
    });

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Only secure in production
        sameSite: 'lax', // More permissive for development
        maxAge: 86400000, // 24 hours
    });

    return token;
};

export default createTokenAndSaveCookie;