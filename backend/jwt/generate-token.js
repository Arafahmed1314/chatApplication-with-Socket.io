import jwt from 'jsonwebtoken';
const createTokenAndSaveCookie = (userId, res) => {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: '24h', // Token expires in 1 hour
    });

    res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'Strict',
        maxAge: 86400000, // 24 hours
    });

    return token;
};

export default createTokenAndSaveCookie;