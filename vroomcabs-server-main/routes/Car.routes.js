const express = require('express');
const router = express.Router();

const Car = require('../models/Car.model');
const authenticate = require('../middlewares/authMiddleware');

router.get('/getCars', async (req, res) => {
    try {
        const cars = await Car.find();
        res.json(cars);
    } catch (err) {
        res.json({ message: err });
    }
});

router.post('/updateprice', authenticate, async (req, res) => {
    const { carId, newPrice } = req.body;
    console.log(carId, newPrice)
    try {
      const car = await Car.findById(carId);
      if (car) {
        car.price = newPrice;
        await car.save();
        res.json({ message: 'Price updated successfully', car });
      } else {
        res.status(404).json({ message: 'Car not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  router.post('/addcar', async (req, res) => {
    const { name, price,image } = req.body;
    const car = new Car({
        name,
        price,
        image
    });
    const savedCar = await car.save();
    res.json(savedCar);
  });


  module.exports = router;