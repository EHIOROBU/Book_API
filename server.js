const express = require("express");
const mongoose = require("mongoose");
const Booking = require("./model/book_model");
const app = express();


//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    next();
});


app.get("/books", async (req, res) => {
    try {
        const { published_year, title, genre, author, search } = req.query;
        const filter = {};

        if (published_year) {
            filter.published_year = published_year
        }
        if (title) {
            filter.title = {
                $regex: title, $options: 'i'
            }
        }
        if (author) {
            filter.author = {
                $regex: author, $options: 'i'
            }
        }
        if (genre) {
            filter.genre = {
                $regex: genre, $options: 'i'
            }
        }
        if (search) {
            filter.$or = [
                {
                    title: { $regex: search, $options: 'i' }
                },
                {
                    genre: { $regex: search, $options: 'i' }
                },
                {
                    author: { $regex: search, $options: 'i' }
                },
            ]
        }
        const booking = await Booking.find(filter)
        return res.status(200).json(booking)
    }
    catch (error) {
        res.status(500).json(error)
    }
})



app.get("/books/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const booking = await Booking.findById(id);
        res.status(200).json(booking)
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
})




app.post("/books", async (req, res) => {
    try {
        const booking = await Booking.create(req.body);
        res.status(200).json(booking)
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});


app.put("/books/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const booking = await Booking.findByIdAndUpdate(id, req.body)
        res.status(200).json(booking)

        if (!booking) {
            res.status(404).json({ message: "book not found" })
        }
        const updatebook = await Booking.find()
        res.status(200).json(updatebook)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.delete("/books/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const booking = await Booking.findByIdAndDelete(id)
        res.status(200).json(booking)

        if (!booking) {
            res.status(404).json({ message: "book to found" })
        }
        res.status(200).json({ message: "book sucessfully deleted" })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

require("dotenv").config()
mongoose.connect(process.env.URI)
    .then(() => {
        console.log("connecting mongoDB")

        app.listen(3000, () => {
            console.log("connecting port 3000")
        })

    })
    .catch((error) => {
        {
            console.log(error)
        }
    })
