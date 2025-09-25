import createTokenAndSaveCookie from "../jwt/generate-token.js";
import User from "../models/user-model.js";
import bcrypt from "bcryptjs";
export const signup = async (req, res) => {
    const { fullname, fullName, email, password, confirmPassword } = req.body || {};

    // Handle both camelCase and lowercase
    const name = fullname || fullName;

    try {
        if (!name || !email || !password || !confirmPassword) {
            return res.status(400).json({ error: "All fields are required" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ error: "User already registered" });
        }

        // Hashing the password
        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = await new User({
            fullname: name,
            email,
            password: hashPassword,
        });

        await newUser.save();

        if (newUser) {
            createTokenAndSaveCookie(newUser._id, res);
            res.status(201).json({
                message: "User created successfully",
                user: {
                    _id: newUser._id,
                    fullname: newUser.fullname,
                    email: newUser.email,
                },
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
};
export const login = async (req, res) => {
    const { email, password } = req.body || {};
    try {
        const user = await User.findOne({ email });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid || !user) {
            return res.status(400).json({ error: "Invalid email or password" });
        }
        createTokenAndSaveCookie(user._id, res);
        res.status(200).json({
            message: "Login successful",
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
};
export const logout = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: true, // Always secure for production
        sameSite: 'none', // Required for cross-domain cookies
    });
    res.status(200).json({ message: "Logout successful" });
};
export const getUserProfile = async (req, res) => {
    try {
        const loggedUser = req.user._id;
        const allUsers = await User.find({ _id: { $ne: loggedUser } }).select("-password");
        res.status(200).json(allUsers);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }

}
