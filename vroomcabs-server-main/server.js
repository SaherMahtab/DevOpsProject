const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const carRoutes = require('./routes/Car.routes');
const imageRoutes = require('./routes/imageOffer.routes');
const bookingRoutes = require('./routes/booking.routes');
const authRoutes = require('./routes/auth.routes');
const dotenv = require('dotenv');
const app = express();
dotenv.config();

app.use(cors());
app.use(bodyParser.json());



app.use('/api/cars', carRoutes);
app.use('/api/images', imageRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/auth', authRoutes);



const PORT = process.env.PORT || 3001;
console.log( process.env.PORT )
mongoose.connect('mongodb+srv://sahermahtab:Anam123@cluster0.whgfdv7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/cardb')
    .then(() =>{ console.log('MongoDB connected')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));}
)
    .catch(err => console.error('MongoDB connection error:', err));
