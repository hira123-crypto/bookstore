import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        default: "Unknown",
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    // ✅ ADD THIS FIELD
    downloadUrl: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
});

const Book = mongoose.model("Book", bookSchema);
export default Book;