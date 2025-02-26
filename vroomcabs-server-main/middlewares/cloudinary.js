const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'TestVroom',
  api_key: '261164493624311',
  api_secret: 'ft5QwIFJG5MZ1sb5csn-3CUCVb8'
});

module.exports = cloudinary;
