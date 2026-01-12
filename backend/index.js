import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import bookRoute from './route/book.route.js';
import userRoute from './route/user.route.js';
import contactRoute from './route/contact.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const URI = process.env.MONGODB_URI;

// Middleware
app.use(cors()); // ✅ Enable CORS for frontend communication
app.use(express.json()); // ✅ Parse JSON request bodies

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
};

connectDB();

// Routes
app.use('/book', bookRoute);
app.use('/user', userRoute);
app.use('/contact', contactRoute);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});