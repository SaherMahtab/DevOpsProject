import axios from './axios';


export const getCars_API = async () => {
    const response = await axios.get(`/api/cars/getCars`);
    return response.data;
};
export const getReviews_API = async () => {
    const response = await axios.get(`/api/reviews/`);
    return response.data;
};


export const getOffers_API = async () => {
    const response = await axios.get(`/api/images/`);
    return response.data;
};

export const getBookings_API = async () => {
    const response = await axios.get(`/api/bookings/`);
    return response.data;
}
export const login_API = async ({data}) => {
    const response = await axios.post(`/api/auth/login`, data);
    return response.data;
}
export const changeCarPrice_API = async (data) => {
    const response = await axios.post(`/api/cars/updateprice`, data);
    return response.data;
}

export const deleteBooking_API = async ({id}) => {
    const response = await axios.delete(`/api/bookings/${id}`);
    return response.data;
}
export const sendData = async (data) => {
    const response = await axios.post('/data', data);
    return response.data;
};
export const deleteAll_API = async (data) => {
    const response = await axios.delete('/api/images/all', data);
    return response.data;
};

export const fetchReviews = async () => {
    try {
      const response = await axios.get('/api/reviews');
      return response.data;
    } catch (error) {
      console.error('Error fetching reviews:', error);
      throw error;
    }
  };
  
  // Add a new review
  export const addReview = async (reviewData) => {
    try {
      const response = await axios.post('/api/reviews', reviewData);
      return response.data;
    } catch (error) {
      console.error('Error adding review:', error);
      throw error;
    }
  };
  
  // Update an existing review
  export const updateReview = async (reviewId, updatedData) => {
    try {
      const response = await axios.put(`/api/reviews/${reviewId}`, updatedData);
      return response.data;
    } catch (error) {
      console.error('Error updating review:', error);
      throw error;
    }
  };
  
  // Delete a review
  export const deleteReview = async (reviewId) => {
    try {
      const response = await axios.delete(`/api/reviews/${reviewId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting review:', error);
      throw error;
    }

  };

  export const sendContactForm = async (data) => {
    try {
      const response = await axios.post(`/api/contact/`,data);
      return response.data;
    } catch (error) {
      console.error('Error deleting review:', error);
      throw error;
    }
  };