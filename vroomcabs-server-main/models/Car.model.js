const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    note: {
        type: String,
        required: true
    },
    description: {
        type: String, // It should be String if it is text
        required: true
    },
}, {
    timestamps: true
});

const Car = mongoose.model('Car', CarSchema);

module.exports = Car;
