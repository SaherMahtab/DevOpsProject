import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { deleteAll_API, getOffers_API } from '../../api/endpoint';

const AddOffers = () => {
  const [bannerImage, setBannerImage] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [offerDetails, setOfferDetails] = useState({});
  const [offerImages, setOfferImages] = useState({});
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getOffers();
  }, []);

  useEffect(() => {
    if (images.length > 0) {
      setShowModal(true);
    }
  }, [images]);

 
  const getOffers = async () => {
    await getOffers_API().then((data) => {
        setImages(data);

    }).catch((error) => {
        console.error('Error fetching images:', error);

    }
    );
};
  const handleImageUpload = async (event, type) => {
    const file = event.target.files[0];

    if (file) {
      // Check if uploading more than 4 images
      if (Object.keys(offerImages).length + (bannerImage ? 1 : 0) >= 4) {
        alert('You can upload only 4 images in total.');
        return;
      }

      const formData = new FormData();
      formData.append('images', file);
      formData.append('type', type);

      try {
        const response = await axios.post('https://vroomcabs-server-production.up.railway.app/api/images/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        const imageUrl = response.data?.url; // Assuming the backend returns the uploaded image URL

        if (type === 'banner') {
          setBannerImage(imageUrl);
        } else {
          setOfferImages((prev) => ({
            ...prev,
            [type]: imageUrl,
          }));
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Failed to upload image. Please try again.');
      }
    }
  };

  const deleteAll = async () => {
    try {
      const imageIDs = images.map((image) => image.public_id);
      const data = { public_id: imageIDs };
      await deleteAll_API( { data });
      setImages([]);
    } catch (error) {
      console.error('Error deleting images:', error);
      alert('Failed to delete images. Please try again.');
    }
  };

  const handleOfferClick = (offer) => {
    setSelectedOffer(offer);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedOffer(null);
  };

  const handleSaveOfferDetails = () => {
    const offerInput = document.getElementById(`offer-input-${selectedOffer}`).value;

    setOfferDetails((prev) => ({
      ...prev,
      [selectedOffer]: offerInput,
    }));

    setOpenDialog(false);
    setSelectedOffer(null);
  };

  return (
    <>
      {showModal && (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">Images</h1>
          <ul className="grid grid-cols-3 gap-4">
            {images.map((image) => (
              <li key={image.id} className="flex items-center justify-center">
                <img src={image?.url} alt={image.id} className="w-32 h-32 object-cover rounded-md" />
              </li>
            ))}
          </ul>
          <button
            className="bg-red-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-red-600 transition-colors duration-300"
            onClick={deleteAll}
          >
            Delete All
          </button>
        </div>
      )}

      <Box
        sx={{
          padding: '40px 20px',
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Grid container spacing={3} justifyContent="center" sx={{ marginBottom: '40px', width: '80%' }}>
          <Grid item xs={12} sm={8} md={6} sx={{ position: 'relative' }}>
            <Box
              sx={{
                border: '2px dashed green',
                padding: '40px',
                textAlign: 'center',
                marginBottom: '20px',
                marginTop: '190px',
              }}
            >
              {bannerImage ? (
                <Box sx={{ position: 'relative' }}>
                  <img src={bannerImage} alt="Banner" style={{ width: '100%' }} />
                  <IconButton
                    sx={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    }}
                    onClick={() => setBannerImage(null)}
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>
              ) : (
                <Typography variant="h5">Banner Image</Typography>
              )}
            </Box>
            {!bannerImage && (
              <Button
                variant="contained"
                component="label"
                sx={{
                  width: '100%',
                  height: '50px',
                  border: '2px dashed green',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                }}
              >
                <Typography variant="h6">Upload</Typography>
                <input type="file" accept="image/*" hidden onChange={(e) => handleImageUpload(e, 'banner')} />
              </Button>
            )}
          </Grid>
        </Grid>
        <Grid container spacing={3} justifyContent="center" sx={{ marginBottom: '40px', width: '80%' }}>
          {['Offer 1', 'Offer 2', 'Offer 3'].map((offer, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  border: '2px dashed green',
                  height: '200px',
                  padding: '10px',
                  marginBottom: '20px',
                  textAlign: 'center',
                  position: 'relative',
                }}
                onClick={() => handleOfferClick(offer)}
              >
                <CardContent>
                  <Typography variant="h6">{offerDetails[offer] ? offerDetails[offer] : offer}</Typography>
                  {offerImages[offer] && <img src={offerImages[offer]} alt={offer} style={{ width: '100%', marginTop: '10px' }} />}
                </CardContent>
              </Card>
              <Button
                variant="contained"
                component="label"
                sx={{ width: '100%', marginTop: '10px' }}
              >
                <Typography variant="h6">Upload Image</Typography>
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => handleImageUpload(e, offer)}
                />
              </Button>
            </Grid>
          ))}
        </Grid>

        <Dialog open={openDialog} onClose={handleDialogClose}>
          <DialogTitle>Update {selectedOffer}</DialogTitle>
          <DialogContent>
            <DialogContentText>Enter details for {selectedOffer}.</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id={`offer-input-${selectedOffer}`}
              label="Offer Details"
              type="text"
              fullWidth
              variant="outlined"
              defaultValue={offerDetails[selectedOffer]}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>Cancel</Button>
            <Button onClick={handleSaveOfferDetails}>Save</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};

export default AddOffers;
