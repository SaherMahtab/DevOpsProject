// backend/routes/bookings.js
const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking.model');
const authenticate = require('../middlewares/authMiddleware');
const sendMailNodeMailer  = require('../middlewares/nodemailer');

console.log('Imported sendMailNodeMailer:', typeof sendMailNodeMailer);
// Create a new booking
router.post('/', async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    const emailSubject = 'New Booking Created';
    const emailText = `A new booking has been created with the following details:\n\n${JSON.stringify(req.body, null, 2)}`;
    const emailHtml = `<p>A new booking has been created with the following details:</p><pre>${JSON.stringify(req.body, null, 2)}</pre>`;

    await sendMailNodeMailer(emailSubject, emailText, emailHtml); // Ensure await for async function
    res.status(201).json(booking);
  } catch (error) {
    console.error('Error creating booking:', error); // Log the error for debugging
    res.status(400).json({ message: error.message });
  }
});

// Get all bookings
router.get('/',authenticate, async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single booking by ID
router.get('/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a booking by ID
router.put('/:id', async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a booking by ID
router.delete('/:id', async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json({ message: 'Booking deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
