// routes/imageRoutes.js
const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer');
const cloudinary = require('../middlewares/cloudinary');
const Image = require('../models/ImageOffer.model');

router.post('/', upload.array('images', 4), async (req, res) => {
  const uploader = async (path) => await cloudinary.uploader.upload(path);
  console.log(req.files)
  console.log(req.files[0]?.path)
  console.log("inside image routes")
  const urls = [];
  const files = req.files;

  for (const file of files) {
    const { path } = file;
    const newPath = await uploader(path);
    urls.push({
      url: newPath.secure_url,
      public_id: newPath.public_id
    });
  }

  const images = await Image.insertMany(urls);
  res.json(images);
});

router.get('/', async (req, res) => {
  const images = await Image.find();
  res.json(images);
});

module.exports = router;
