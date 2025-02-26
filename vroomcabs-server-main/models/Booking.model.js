const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  customerPhone: { type: String, required: true },
  serviceType: { type: String, enum: ['oneWay', 'twoWay', 'airport'], required: true },
  pickupLocation: { type: String, required: true },
  dropoffLocation: { type: String, required: true },
  pickupDate: { type: String, required: true },
  pickupTime: { type: String, required: true },
  returnDate: { type: String, required: false },
  vehicleType: { type: String, required: true },
  airportServiceType: { type: String, enum: ['drop', 'pickup'], required: false },
  price: { type: Number, required: true },

  status: { type: String, enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'], default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
},{timestamps: true});

module.exports = mongoose.model('Booking', bookingSchema);
