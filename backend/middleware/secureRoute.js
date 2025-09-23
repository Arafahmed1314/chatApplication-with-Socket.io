import jwt from "jsonwebtoken";
import User from "../models/user-model.js";

const secureRoute = async (req, res, next) => {
    const token = req.cookies.token;
    console.log("Token from cookies:", token);

    if (!token) {
        return res.status(401).json({ error: "Unauthorized - No token provided" });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (!verified) {
            return res.status(401).json({ error: "Unauthorized - Invalid token" });
        }

        const user = await User.findById(verified.id).select("-password");
        if (!user) {
            return res.status(401).json({ error: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("JWT verification error:", error);
        return res.status(401).json({ error: "Unauthorized - Token verification failed" });
    }
};

export default secureRoute;
