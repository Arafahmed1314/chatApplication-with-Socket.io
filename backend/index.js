
import express from 'express';
const app = express();
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './route/user-route.js';
import messageRoutes from './route/message-route.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

const uri = process.env.MONGODB_URI;
try {
    await mongoose.connect(uri).then(() => {
        console.log('Connected to MongoDB');
    });
} catch (error) {
    console.error('Error connecting to MongoDB:', error);
}


app.get('/', (req, res) => {
    res.send('Welcome to the User Management API');
});
app.use('/users', userRoutes);
app.use('/messages', messageRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});