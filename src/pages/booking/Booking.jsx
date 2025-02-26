import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Box, Modal, Backdrop, Fade, CardMedia, Tabs, Tab } from '@mui/material';
import { styled, keyframes } from '@mui/system';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { useNavigate } from 'react-router-dom';
import { calculateFare, calculateFareRoundTrip } from '../services/utils';
import LoadingComponent from '../../components/loadingComponent/LoadingComponent';

const bookingAPI = 'https://vroomcabs-server-production.up.railway.app/api/bookings';
// const bookingAPI = 'http://localhost:3000/api/bookings';

// Define custom styled TextField
const CustomTextField = styled(TextField)({
  '& .MuiInputBase-input': {
    color: '#fff',
  },
  '& label': {
    color: '#fff',
  },
  '& label.Mui-focused': {
    color: '#FF5722',
  },
  '& .MuiInput-underline:before': {
    borderBottomColor: '#fff',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#fff',
    },
    '&:hover fieldset': {
      borderColor: '#FF5722',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#FF5722',
    },
  },
});

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const BookingForm = ({ handleFormSubmit, travelDetails, BookingDetails,pTime }) => {

console.log("pTime",pTime)  

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const cancelBooking = () => {
    localStorage.removeItem('TravelDetails');
    localStorage.removeItem('bookingDetails');
    window.location.href = '/';
  };

  return (
    <Box
      className="bg-gradient-to-r from-pink-500 to-yellow-500 p-8 rounded shadow-md w-full h-full"
      sx={{ animation: `${fadeIn} 1s ease-out` }}
    >
      <Typography variant="h5" component="h2" className="text-center font-bold mb-4 text-white">
        BOOKING DETAILS
      </Typography>
      <form className="space-y-4 mt-5">
        <CustomTextField
          label="Your Name"
          variant="outlined"
          fullWidth
          required
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <CustomTextField
          label="E-mail"
          variant="outlined"
          fullWidth
          required
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <CustomTextField
          label="Enter Mobile Number"
          inputMode='numeric'
          variant="outlined"
          fullWidth
          required
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
        />
        <CustomTextField
          label="Pick Up"
          variant="outlined"
          fullWidth
          disabled
          name="pickUp"
          value={travelDetails?.fromTrip}
        />
        <CustomTextField
          label="Drop"
          variant="outlined"
          fullWidth
          disabled
          name="drop"
          value={travelDetails?.toTrip}
        />
        <Box display="flex" justifyContent="space-evenly">
          <Button
            onClick={() => 
            { 
              if(formData.mobile.length !== 10 || isNaN(formData.mobile) || formData.mobile === ''){
                alert('Please enter a valid mobile number');
              }else{

              handleFormSubmit({
              customerName: formData.name,
              customerPhone: formData.mobile,
              customerEmail: formData.email,
              serviceType: travelDetails?.serviceType,
              pickupLocation: travelDetails?.fromTrip,
              dropoffLocation: travelDetails?.toTrip,
              pickupDate: travelDetails?.pickupDate,
              pickupTime: pTime,
              returnDate: travelDetails?.returnDate,
              vehicleType: BookingDetails?.carType,
              airportServiceType: travelDetails?.tripType,
              price: BookingDetails?.totalFare,
            })}
          }
          }
            variant="contained"
            style={{ backgroundColor: '#FF5722', color: '#fff', padding: '10px 20px', borderRadius: '20px' }}
          >
            Book Now
          </Button>
          <Button
            onClick={cancelBooking}
            variant="contained"
            style={{ backgroundColor: '#ec4b95', color: '#fff', padding: '10px 20px', borderRadius: '20px' }}
          >
            Cancel
          </Button>
        </Box>
      </form>
    </Box>
  );
};

const BookingDetails = ({ details, }) => {
  const [activeTab, setActiveTab] = useState('inclusions');
  const CustomTab = styled(Tab)(({ theme }) => ({
    minWidth: 'auto',
    flex: 1,
    [theme.breakpoints.up('sm')]: {
      minWidth: 'auto',
    },
  }));
  const tabContent = {
    inclusions: `Base Fare at ₹10/km \nDriver Allowance \nGST (5%)`,
    exclusions: `Pay ₹10.5/km after 292 km \nToll / State tax \nParking`,
    facilities: `\n4 seater\n1 bags\nAC`,
    terms: `Your Trip has a KM limit and in case of certain special packages may even contain Hours limit. If your usage exceeds these limits, you will be charged for the excess KM used (and/or hour if applicable).\n\nThe Airport entry charge, if applicable, is not included in the fare and will be charged extra.\nAll road toll fees, parking charges, state taxes etc. are charged extra and need to be paid to the concerned authorities as per actuals.\n\nFor driving between 09:45 PM to 06:00 AM on any of the nights, an additional allowance will be applicable and is to be paid to the driver.\n\nPlease ensure you have covered all cities you plan to visit in your itinerary. This will help our driver prepare accordingly. Adding city to the itinerary during trip may not be possible.\n\nIf your Trip has Hill climbs, cab AC may be switched off during such climbs.`,
  };
  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const TabContent = ({ activeTab }) => {
    const content = tabContent[activeTab].split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));

    return (
      <Box sx={{ p: { xs: 2, sm: 3, md: 4 }, mt: 2 }}>
        <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
          {content}
        </Typography>
      </Box>
    );
  };
  return (
    <Box className="bg-white p-8 rounded shadow-md w-full h-full" sx={{ animation: `${fadeIn} 1s ease-out` }}>
      <Box bgcolor="#FF5722" color="white" p={2} borderRadius="borderRadius" textAlign="center">
        <Typography variant="h6" component="h3">{'Trip Summary'.toUpperCase()}</Typography>
      </Box>
      <Box p={2}>
        <Typography variant="h6" component="h3" gutterBottom><strong>Itinerary:</strong> <span style={{ color: '#FF5722' }}>{details.pickUp} <h1 className='text-center font-bold text-black'>To</h1> {details.drop}</span></Typography>
        <Typography variant="h6" component="h3" gutterBottom><strong>Pickup Date:</strong> <span style={{ color: '#FF5722' }}>{details.pickupDate}</span></Typography>
        <Typography variant="h6" component="h3" gutterBottom><strong>Car Type:</strong> <span style={{ color: '#FF5722' }}>{details.carType}</span></Typography>
        <Typography variant="h6" component="h3" gutterBottom><strong>KMs Included:</strong> <span style={{ color: '#FF5722' }}>{details.kmsIncluded} Km</span></Typography>
        <Typography variant="h6" component="h3" gutterBottom><strong>Total Fare:</strong> <span style={{ color: '#FF5722' }}>{details.totalFare} Rs</span></Typography>
       
      </Box>
      {/* <Box display="flex" justifyContent="space-evenly" mt={4}>
        <Button
          onClick={() => setActiveTab('inclusions')}
          variant={activeTab === 'inclusions' ? 'contained' : 'outlined'}
          style={{ backgroundColor: activeTab === 'inclusions' ? '#FF5722' : '#fff', color: activeTab === 'inclusions' ? '#fff' : '#000' }}
        >
          INCLUSIONS
        </Button>
        <Button
          onClick={() => setActiveTab('exclusions')}
          variant={activeTab === 'exclusions' ? 'contained' : 'outlined'}
          style={{ backgroundColor: activeTab === 'exclusions' ? '#FF5722' : '#fff', color: activeTab === 'exclusions' ? '#fff' : '#000' }}
        >
          EXCLUSIONS
        </Button>
        <Button
          onClick={() => setActiveTab('facilities')}
          variant={activeTab === 'facilities' ? 'contained' : 'outlined'}
          style={{ backgroundColor: activeTab === 'facilities' ? '#FF5722' : '#fff', color: activeTab === 'facilities' ? '#fff' : '#000' }}
        >
          FACILITIES
        </Button>
        <Button
          onClick={() => setActiveTab('terms')}
          variant={activeTab === 'terms' ? 'contained' : 'outlined'}
          style={{ backgroundColor: activeTab === 'terms' ? '#FF5722' : '#fff', color: activeTab === 'terms' ? '#fff' : '#000' }}
        >
          T&C
        </Button>
      </Box> */}
      <Box sx={{ width: '100%' }}>
      <Tabs
        value={activeTab}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="booking details tabs"
        sx={{ borderBottom: 1, borderColor: 'divider' }}
      >
        <CustomTab label="Inc." value="inclusions" />
        <CustomTab label="Exc." value="exclusions" />
        <CustomTab label="Fac" value="facilities" />
        <CustomTab label="T&C" value="terms" />
      </Tabs>
      <TabContent activeTab={activeTab} />
    </Box>
    </Box>
  );
};



const Booking = () => {
  const [bookingDetails, setBookingDetails] = useState(null);
  const [travelDetails, setTravelDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [pTime, setPTime] = useState({});

  const navigate = useNavigate();
  const date = new Date(JSON.parse(localStorage.getItem('TravelDetails')).pickupDate);
  const time = new Date(JSON.parse(localStorage.getItem('TravelDetails')).pickupTime);
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const formattedTime = time.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
  const getTimeFromLocalStorage =  () => {
    let pickTime = (localStorage.getItem('time'));
    console.log(pickTime)
    setPTime(pickTime);
  }
  useEffect(() => {
    getTimeFromLocalStorage();
    const travelData = JSON.parse(localStorage.getItem('TravelDetails'));
    if (travelData) {
      setTravelDetails(travelData);
    }

    const carData = JSON.parse(localStorage.getItem('bookingDetails'));
    if (carData) {
      setBookingDetails({
        pickUp: JSON.parse(localStorage.getItem('TravelDetails')).fromTrip || 'N/A',
        drop: JSON.parse(localStorage.getItem('TravelDetails')).toTrip || 'N/A',
        pickupDate: `${formattedDate} at ${formattedTime}`,
        carType: carData.name,
        kmsIncluded: parseInt(localStorage.getItem('distance-1')), // Placeholder value
        totalFare:(travelData?.serviceType === 'twoWay'?calculateFareRoundTrip(carData.price, localStorage.getItem('distance-1'),travelData.returnDate,travelData.pickupDate): calculateFare(carData.price, localStorage.getItem('distance-1'))),
        image: carData.image,
      });
    }
  }, []);

  const handleFormSubmit = (data) => {
    if (!data.customerName || !data.customerPhone || !data.customerEmail) {
      alert('Please fill all the fields');
      return;
    }
    setLoading(true);

    fetch(bookingAPI, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setLoading(false);
        setSuccess(true);
        setOpen(true);

        setTimeout(() => {
          setSuccess(false);
          setOpen(false);
        localStorage.clear();

          navigate('/')

        }, 2000);
      })
      .catch((error) => {
        console.error('Error:', error);
        setLoading(false);
        setSuccess(false);
        setErrorOpen(true);
        navigate('/');
      });
  };
 
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-700 via-gray-900 to-black p-4 mt-8">
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full max-w-4xl">
        <div className="w-full flex-1">
          {bookingDetails && <BookingDetails details={bookingDetails}  />}
        </div>
        <div className="w-full flex-1">
          <BookingForm
            handleFormSubmit={handleFormSubmit}
            travelDetails={travelDetails}
            BookingDetails={bookingDetails}
            pTime={pTime}
          />
        </div>
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {loading && <LoadingComponent/>}
            {!loading && success && (
              <>
                <CheckCircleIcon style={{ fontSize: 60, color: 'green' }} />
                <Typography variant="h6" component="h2">
                  Booking Confirmed!
                </Typography>
                <Typography variant="h6" component="h2">
                  Our executive will contact you shortly.
                </Typography>
              </>
            )}
          </Box>
        </Fade>
      </Modal>

      <Modal
        open={errorOpen}
        onClose={() => setErrorOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={errorOpen}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <ErrorIcon style={{ fontSize: 60, color: 'red' }} />
            <Typography variant="h6" component="h2">
              Booking Failed. Please try again.
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default Booking;
