import React, { useEffect, useState } from 'react';
import { Box, Button, Modal, TextField } from '@mui/material';
import { fetchReviews, addReview, updateReview, deleteReview } from '../../api/endpoint'; // Import API functions

const EditReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);

  // Fetch reviews from the backend when the component mounts
  useEffect(() => {
    const getReviews = async () => {
      try {
        const data = await fetchReviews();
        setReviews(data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };
    getReviews();
  }, []);

  const handleEdit = (index) => {
    setSelectedReview(reviews[index]);
    setIsAddMode(false);
    setIsModalOpen(true);
  };

  const handleDelete = async (index) => {
    try {
      const reviewId = reviews[index]._id;
      await deleteReview(reviewId);
      const newReviews = reviews.filter((_, i) => i !== index);
      setReviews(newReviews);
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  const handleAdd = () => {
    setSelectedReview({ user: '', text: '' });
    setIsAddMode(true);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedReview(null);
  };

  const handleUpdateReview = (updatedReview) => {
    const updatedReviews = reviews.map((review) =>
      review._id === updatedReview._id ? updatedReview : review
    );
    setReviews(updatedReviews);
  };

  const handleAddReview = (newReview) => {
    setReviews([...reviews, newReview]);
  };

  return (
    <div className="mt-28 h-full">
      <div className="p-4">
        <Button variant="contained" color="primary" onClick={handleAdd}>Add New Review</Button>
      </div>
      <div className="p-4 grid grid-cols-3 gap-4">
        {reviews.map((review, index) => (
          <div key={index} className="border p-4 rounded shadow">
            <p>{review.text}</p>
            <p>{review.user}</p>
            <div className="flex justify-between mt-2">
              <Button variant="outlined" onClick={() => handleEdit(index)}>Edit</Button>
              <Button variant="outlined" color="error" onClick={() => handleDelete(index)}>Delete</Button>
            </div>
          </div>
        ))}
        {selectedReview && (
          <EditReviewModal
            open={isModalOpen}
            handleClose={handleCloseModal}
            review={selectedReview}
            onUpdate={handleUpdateReview}
            onAdd={handleAddReview}
            isAddMode={isAddMode}
          />
        )}
      </div>
    </div>
  );
};

const EditReviewModal = ({ open, handleClose, review, onUpdate, onAdd, isAddMode }) => {
  const [updatedReview, setUpdatedReview] = useState({ ...review });

  useEffect(() => {
    setUpdatedReview({ ...review });
  }, [review]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedReview((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (isAddMode) {
        const newReview = await addReview(updatedReview);
        onAdd(newReview);
      } else {
        const updatedData = await updateReview(review._id, updatedReview);
        onUpdate(updatedData);
      }
      handleClose();
    } catch (error) {
      console.error(`Error ${isAddMode ? 'adding' : 'updating'} review:`, error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="edit-review-modal"
      aria-describedby="modal-to-edit-review"
    >
      <Box className="p-4 bg-white rounded shadow-lg" sx={{ width: 400, margin: 'auto', mt: 10 }}>
        <h2>{isAddMode ? 'Add New Review' : 'Edit Review'}</h2>
        <TextField
          name="user"
          label="Username"
          value={updatedReview.user || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="text"
          label="Review"
          value={updatedReview.text || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          rows={4}
        />
        <Box display="flex" justifyContent="space-between" mt={2}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
          <Button variant="outlined" onClick={handleClose}>Cancel</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditReviews;
