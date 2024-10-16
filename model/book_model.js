
const mongoose = require("mongoose");
const bookSchema = mongoose.Schema(
    {
        title: {
            type: String,
            require: true,

        },
        author: {
            type: String,
            require: true,
        },
        published_year: {
            type: String,
            require: true,
        },
        genre: {
            type: String,
            require: true,
        },
        image_URL: {
            type: String,
            require: true,
        },
        description: {
            type: String,
            require: true,
        },
        nationality: {
            type: String,
            require: true,
        },
        language: {
            type: String,
            require: true,
        },

    },
    {
        Timestamps: true
    });

const Booking = mongoose.model("booking", bookSchema);
module.exports = Booking