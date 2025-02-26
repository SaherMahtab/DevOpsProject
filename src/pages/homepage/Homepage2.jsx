import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Slider from 'react-slick';
import { Images } from '../../assets/images';
import { TextField, Container, Box, Grid, Typography, Card, CardContent, CardMedia, Paper, Avatar, Button, Fab, Radio, RadioGroup, FormControlLabel, FormControl, List, ListItem, InputLabel, Select, MenuItem } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker, MobileTimePicker } from '@mui/x-date-pickers';
import { TravelExplore, LocationCity, FlightTakeoff, BusinessCenter } from '@mui/icons-material';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SearchIcon from '@mui/icons-material/Search';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import dayjs from 'dayjs';
import { addReview, getCars_API,getOffers_API, getReviews_API } from '../../api/endpoint';
import { debounce } from 'lodash';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import ScrollUp from '../../components/ScrollUp';
import axios from 'axios';
import { calculateFare, calculateFareRoundTrip } from '../services/utils';
import LoadingComponent from '../../components/loadingComponent/LoadingComponent';
const CarTariffItem = ({ tariff, index }) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <Box
            ref={ref}
            sx={{
                display: 'flex',
                flexDirection: index % 2 === 0 ? 'row' : 'row-reverse',
                alignItems: 'center',
                mb: 4,
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateX(0)' : index % 2 === 0 ? 'translateX(-50px)' : 'translateX(50px)',
                transition: 'opacity 0.6s, transform 0.6s',
            }}
        >
            <Box sx={{ flex: 1 }}>
                <CardMedia
                    sx={{ width: 350, borderRadius: 2 }}
                    component="img"
                    image={tariff.image}
                    alt={tariff.title}
                />
            </Box>
            <Box sx={{ flex: 1, p: 2 }}>
                <Typography variant="h5" component="h3" gutterBottom>
                    {tariff.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    {tariff.description}
                </Typography>
                <Typography variant="h6" component="p" gutterBottom>
                    ₹{tariff.price}/km
                </Typography>
                <Typography variant="caption" color="error">
                    {tariff.note}
                </Typography>
            </Box>
        </Box>
    );
};




const features = [
    {
        title: "Convenience & Safety",
        description: "Enjoy safe and convenient travel with our top-notch services. We prioritize your safety and comfort in every ride.",
        image: Images.safety,
    },
    {
        title: "Professional Drivers",
        description: "Our drivers are experienced, courteous, and professional. They are committed to providing you with the best service.",
        image: Images.drivers,
    },
    {
        title: "Variety of Vehicle Options",
        description: "Choose from a wide range of vehicles to suit your needs. We offer everything from compact cars to spacious SUVs.",
        image: Images.variety,
    },
    {
        title: "Door-to-Door Service",
        description: "Experience the convenience of our door-to-door service. We pick you up and drop you off at your desired location.",
        image: Images.doortodoor,
    },
    {
        title: "Cost Transparency",
        description: "No hidden fees, just transparent and fair pricing. Know exactly what you are paying for each trip.",
        image: Images.transparency,
    },
    {
        title: "Accessibility",
        description: "Our services are accessible to everyone, everywhere. We strive to provide transportation for all, including those with special needs.",
        image: Images.accessibility,
    },
    {
        title: "Clean & Comfortable Vehicles",
        description: "Travel in comfort with our clean and well-maintained vehicles. We ensure a pleasant and hygienic ride for all passengers.",
        image: Images.clean,
    },
    {
        title: "24/7 Customer Support",
        description: "Our team is available around the clock to assist you. Contact us anytime for any queries or issues.",
        image: Images.support,
    },
    {
        title: "Eco-Friendly Options",
        description: "Choose our eco-friendly vehicle options for a sustainable travel experience. Help reduce your carbon footprint.",
        image: Images.exofriendly,
    },
];
const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
                dots: true
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                initialSlide: 1
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
};
const Homepage2 = () => {
    const [pickupDate, setPickupDate] = useState(dayjs());
    const [pickupTime, setPickupTime] = useState();
    const [pickupTimeObj, setPickupTimeObj] = useState({});
    const [returnDate, setReturnDate] = useState(dayjs());
    const [carOptionSelection, setCarOptionSelection] = useState({});
    const [selectedCar, setSelectedCar] = useState(null);
    const [serviceType, setServiceType] = useState('oneWay');
    const [tripType, setTripType] = useState('drop');
    const [fromTrip, setFromTrip] = useState('');
    const [toTrip, setToTrip] = useState('');
    const [showFromSuggestions, setShowFromSuggestions] = useState(false);
    const [showToSuggestions, setShowToSuggestions] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [showPopUp, setShowPopUp] = useState(false);
    const [originCoordinates, setOriginCoordinates] = useState();
    const [destinationCoordinates, setDestinationCoordinates] = useState();
    const [carsData, setCarsData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [updatedReview, setUpdatedReview] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddMode, setIsAddMode] = useState(false);
    
    const handleAddReview = (newReview) => {
        setReviews([...reviews, newReview]);
      };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedReview((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async () => {
    try {
        const newReview = await addReview(updatedReview);
        handleAddReview(newReview);
        window.location.reload();
    } catch (error) {
      console.error(`Error ${isAddMode ? 'adding' : 'updating'} review:`, error);
    }
  };
    let navigate = useNavigate(); 
 
    useEffect( () => {
        let datesSend= {
            pickDate: pickupDate,
            returnDate: returnDate
        }
         localStorage.setItem('returnDatePickUpDate',JSON.stringify(datesSend))
    }, [pickupDate,returnDate]) 
    const tariffs = [
        {
            title: "SEDAN",
            description: "Elegant and comfortable, our Sedan offers a smooth and stylish ride for city travel.",
            price: "₹12/km",
            note: "*Only applicable for round trip*",
            image: Images.dzire,
        },
        {
            title: "ERTIGA",
            description: "Ideal for families and groups, the Ertiga combines space and versatility for your journeys.",
            price: "₹14/km",
            note: "*Only applicable for round trip*",
            image: Images.ertiga,
        },
        {
            title: "INNOVA",
            description: "Experience premium comfort and ample space with our Innova for group travel.",
            price: "₹17/km",
            note: "*Only applicable for round trip*",
            image: Images.innova,
            highlight: true,
        },
        {
            title: "CRYSTA",
            description: "Luxury and sophistication meet in the Crysta, perfect for a superior travel experience.",
            price: "₹20/km",
            note: "*Only applicable for round trip*",
            image: Images.crysta,
        },
    ];
    useEffect(() => {
        getOffers();
        getTestimonials()
        }, []);

 
        const getOffers = async () => {
            await getOffers_API().then((data) => {
                setImages(data);

            }).catch((error) => {
                console.error('Error fetching images:', error);

            }
            );
        };
        const getTestimonials = async () => {
            await getReviews_API().then((data) => {
                setReviews(data);

            }).catch((error) => {
                console.error('Error fetching images:', error);

            }
            );
        };
        

    const mapboxAccessToken = 'pk.eyJ1IjoicmVtYW50MSIsImEiOiJjbG80MHdoY3UwbW4xMm11ZGduYTZhOXYwIn0.jmthf2lWUMeGeh4fO4JHQg'
    const handleFinalBooking = () => {
        if(!fromTrip || !toTrip || !pickupDate){
            alert('Please fill all the fields')
            setShowPopUp(false)
            return;
        }
        if(Object.keys(pickupTimeObj).length === 0 ){
            alert('Please select a time')
            setShowPopUp(false)
            return;
        }
        if(!selectedCar){
            alert('Please select a car')
            return;
        }
        navigate('/booking')
    }
    const fetchData = async (value) => {
      
           
            fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${value}.json?country=IN&types=poi&access_token=${mapboxAccessToken}&country=IN&types=place`)
        .then(response => {

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          
          setSuggestions();
           
          return response.json();
        }).then(data => {
            
            setSuggestions(data);
        }).catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
         
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'fromTrip') {
            setFromTrip(value);

            if (value && value.length > 3) {
            handleDebounce(value);
                
            }
            setShowFromSuggestions(true);

        }
        if (name === 'toTrip') {
            if (value && value.length > 3) {
                fetchData(value);
            }
            setToTrip(value);
            setShowToSuggestions(true);
        }
    };
    const handleSelectCar = (car) => {
        setCarOptionSelection(car);
        localStorage.setItem('bookingDetails', JSON.stringify(car));

        setSelectedCar(car.name);
        
    };
    const handleDebounce = useCallback(debounce(fetchData, 500), []);
    const handleSuggestionClick = (suggestion, inputName) => {
        if (inputName === 'fromTrip') {
            setOriginCoordinates(suggestion.geometry.coordinates);
            setFromTrip(suggestion.place_name);
            setShowFromSuggestions(false);
        }
        if (inputName === 'toTrip') {
            setDestinationCoordinates(suggestion.geometry.coordinates);
            setToTrip(suggestion.place_name);
            setShowToSuggestions(false);
        }
    };
    const handleCarBook =()=>{
        if(serviceType === 'oneWay'){
            if(!fromTrip || !toTrip || !pickupDate || !pickupTime){
                alert('Please fill all the fields')
                return;
            }
        }
        
        if(serviceType === 'twoWay'){
            if(!fromTrip || !toTrip || !pickupDate || !pickupTime || !returnDate){
                alert('Please fill all the fields')
                return;
            }
        }
        if(serviceType === 'airport'){
            if(!fromTrip || !toTrip || !pickupDate || !pickupTime || !tripType){
                alert('Please fill all the fields')
                return;
            }
        }
        setLoading(true)

        const coordinates = `${originCoordinates[0]},${originCoordinates[1]};${destinationCoordinates[0]},${destinationCoordinates[1]}`;
        const profile = 'driving'; // You can change the profile to match your needs
        const directionsURL = `https://api.mapbox.com/directions/v5/mapbox/${profile}/${coordinates}?access_token=${mapboxAccessToken}`;
        fetch(directionsURL)

        .then((response) => response.json()).then((data) => {
            
            setLoading(false)
         
                const distance = data.routes[0].distance / 1000;
                const duration = data.routes[0].duration / 60;
               

               localStorage.setItem('distance-1', distance.toFixed(2));
                localStorage.setItem('duration-1', duration.toFixed(2));
        }).catch((error) => {
            setLoading(false)
            console.error('There has been a problem with your fetch operation:', error);
        });

        if(serviceType === 'oneWay'){
            localStorage.setItem('TravelDetails', JSON.stringify({pickupDate,pickupTime,fromTrip,toTrip,selectedCar,serviceType}))
        }
        if(serviceType === 'twoWay'){
            localStorage.setItem('TravelDetails', JSON.stringify({pickupDate,pickupTime,returnDate,fromTrip,toTrip,selectedCar,serviceType}))
        }
        if(serviceType === 'airport'){
            localStorage.setItem('TravelDetails', JSON.stringify({pickupDate,pickupTime,fromTrip,toTrip,selectedCar,serviceType,tripType}))
        }
        setShowPopUp(true)

    }
    const validateDateTime = () => {
        const now = dayjs();
        if (pickupDate.isBefore(now, 'day') || (pickupDate.isSame(now, 'day') && pickupTime.isBefore(now, 'minute'))) {
            alert('Pickup date and time must be in the future');
            return false;
        }
        if (serviceType === 'twoWay' && returnDate.isBefore(pickupDate, 'day')) {
            alert('Return date must be after pickup date');
            return false;
        }
        return true;
    };

    const handleCarBookWithValidation = () => {
        if (validateDateTime()) {
            handleCarBook();
        }
    };
    const getCarsData = async () => {
        await getCars_API().then((data) => {
          setCarsData(data);
          localStorage.setItem('carsData', JSON.stringify(data));
            setLoading(false);
        }).catch((error) => {
            console.error('There has been a problem with your fetch operation:', error);
            setCarsData(tariffs);
            setLoading(false)
        }
        );
    };

    const handleNewTime = (newValue) => {
        setPickupTime(newValue);
        setPickupTimeObj({h: newValue.hour(), m: newValue.minute()});
    };
    const setTimeLocalStorage = () => {
        let time = {
            h: pickupTimeObj.h,
            m: pickupTimeObj.m
        }
        localStorage.setItem('time', JSON.stringify(time));
    };

    useEffect(() => {
        setLoading(true)
        getCarsData();
    }
    , []);

    useEffect(() => {
        setTimeLocalStorage();
    }
    , [pickupTimeObj]);




    return (
        <>
       {showPopUp && (
  <>
  {loading && <LoadingComponent/>}
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50">
  <ScrollUp/>

      {/* JAI YAHA SE KAAM START KRNA HAI */}
      <div className="fixed top-1/2 left-1/2 w-11/12 sm:w-4/5 h-auto max-h-full transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 sm:p-8 rounded-xl shadow-xl z-50 overflow-y-auto">
      {/* close button */}
      <button onClick={() => setShowPopUp(false)} className="absolute top-4 right-4 text-2xl text-gray-500">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
  <ScrollUp/>

      <h1 className="text-xl sm:text-2xl font-bold mb-4">Select a Car</h1>
      <div className="flex flex-col space-y-4">
        {/* car components */}
        {carsData?.map((car, index) => (
          <div key={index} className={`${carOptionSelection.name === car.name ? 'ring-2': 'ring-0'} bg-gray-100 p-4 rounded-lg flex flex-col md:flex-row justify-between items-center`}>
            <div className="flex items-center w-full md:w-auto">
              <img src={car.image} alt={car.name} className="w-20 mix-blend-multiply mr-4" />
              <div>
                <h2 className="text-lg font-semibold">{car.name}</h2>
                <p>Est. Fare: ₹{serviceType === 'twoWay' ? calculateFareRoundTrip(car?.price, localStorage.getItem('distance-1'), returnDate, pickupDate) : calculateFare(car?.price, localStorage.getItem('distance-1'))} | Est. Distance: {localStorage.getItem('distance-1')} KMs </p>
              </div>
            </div>
            <Button 
              onClick={() => handleSelectCar(car)} 
              variant="contained" 
              color={carOptionSelection.name === car.name ? "success" : "primary"}
              className={`${carOptionSelection.name === car.name ? 'bg-green-500' : 'bg-blue-500'} mt-2 md:mt-0 focus:ring-2 duration-300 focus:ring-blue-800 text-white px-4 py-2 rounded`}
            >
              {carOptionSelection.name === car.name ? 'Selected' : 'Select'}
            </Button>
          </div>
        ))}
        <div className="flex justify-center space-x-4 mt-4">
          <Button 
            onClick={handleFinalBooking} 
            variant="contained" 
            color="primary" 
            className="bg-blue-500 text-white px-4 py-2 rounded-xl shadow-xl focus:ring-blue-500 focus:ring-2 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Book
          </Button>
          <Button 
            onClick={() => setShowPopUp(false)} 
            variant="contained" 
            color="secondary" 
            className="bg-red-500 text-white px-4 py-2 rounded-xl shadow-xl focus:ring-blue-500 focus:ring-2 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
      {/* END YAHA KRNA HAI */}
    </div>
  </>
)}


     {loading && <LoadingComponent/>}
          <div className='text-center flex justify-center items-center relative bg-no-repeat bg-cover bg-center h-64 object-cover' style={{ backgroundImage: `url(${Images.cabbg})`, }}>
                <h1 className="text-center text-4xl text-white font-bold">
                    Ride Comfortably, have Safely!
                </h1>
            </div>

            <Box sx={{ py: 4, bgcolor: 'background.paper', textAlign: 'center', my: 4 }}>
                <Container>
                    <Typography variant="h4" component="h2" textAlign="center" gutterBottom style={{ fontWeight: 'bold', fontSize: '1.75rem', color: '#007BFF' }}>
                        Favourite Routes
                    </Typography>
                    <Paper  id='book' sx={{ p: 2, boxShadow: 3, borderRadius: 2, background: 'linear-gradient(135deg, rgba(173, 216, 230, 0.8) 0%, rgba(240, 128, 128, 0.8) 100%)', animation: 'slideInLeft 0.5s ease-in-out both' }}>
                        <marquee behavior="scroll" direction="left" scrollamount="10" style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#000' }}>
                            <span style={{ padding: '0 2rem' }}>
                                 Agra to Delhi     Agra to Jaipur    Agra to Gwalior     Agra to Mathura    Agra to Firozabad    Agra to Aligarh     Agra to Kanpur    Agra to Lucknow
                            </span>
                            <span style={{ padding: '0 2rem' }}>
                                 Jaipur to Delhi    Jaipur to Agra
                            </span>
                            <span style={{ padding: '0 2rem' }}>
                                Delhi to Agra    Delhi to Amritsar    Delhi to Dehradun and Mussoorie
                            </span>
                            <span style={{ padding: '0 2rem' }}>
                                 Lucknow to Kanpur    Lucknow to Varanasi
                            </span>
                        </marquee>
                    </Paper>
                </Container>
            </Box>

            <div className='md:mx-auto max-w-3xl mt-10 mb-5 p-8 rounded-xl shadow-xl' style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', backgroundImage: `linear-gradient(135deg, rgba(173, 216, 230, 0.8) 0%, rgba(240, 128, 128, 0.8) 100%)` }}>
                <div className='flex justify-center mb-8'>
                    <div className='flex items-center space-x-6'>
                        <input type='radio' name='service' id='oneWay' className={`mr-2 text-blue-500 focus:ring-blue-500 hidden `} checked={serviceType === 'oneWay'} onChange={() => setServiceType('oneWay')} />
                        <label htmlFor='oneWay' className={`text-lg font-semibold cursor-pointer transition duration-300 ease-in-out transform hover:scale-110 hover:text-blue-700  ${serviceType === 'oneWay' && 'text-blue-500'} `}>ONE WAY</label>
                        <div className="mr-4"></div>
                        <input type='radio' name='service' id='twoWay' className='mr-2 text-blue-500 focus:ring-blue-500 hidden' checked={serviceType === 'twoWay'} onChange={() => setServiceType('twoWay')} />
                        <label htmlFor={`twoWay`} className={`text-lg font-semibold cursor-pointer transition duration-300 ease-in-out transform hover:scale-110 hover:text-blue-700 ${serviceType === 'twoWay' && 'text-blue-500'} `}>ROUND TRIP</label>
                        <div className="mr-4"></div>
                        <input type='radio' name='service' id='airport' className='mr-2 text-blue-500 focus:ring-blue-500 hidden' checked={serviceType === 'airport'} onChange={() => setServiceType('airport')} />
                        <label htmlFor='airport' className={`text-lg font-semibold cursor-pointer transition duration-300 ease-in-out transform hover:scale-110 hover:text-blue-700 ${serviceType === 'airport' && 'text-blue-500'}  `}>AIRPORT TRANSFER</label>
                    </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
                    {serviceType === 'oneWay' && (
                        <>
                            <div className='space-y-4 relative'>
                                <TextField value={fromTrip} label="From" variant="outlined" name='fromTrip'  onChange={handleInputChange} className='w-full bg-white text-gray-800' />
                                {showFromSuggestions && (
                    <Paper style={{ position: 'absolute', zIndex: 10, width: '100%' }}>
                        <List>
                            {suggestions?.features?.map((suggestion, index) => (
                                <ListItem
                                    key={index}
                                    button
                                    onClick={() => handleSuggestionClick(suggestion, 'fromTrip')}
                                >
                                    {suggestion.place_name}
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                )}
                                <TextField value={toTrip} label="To" variant="outlined" onChange={handleInputChange} name='toTrip' className='w-full bg-white text-gray-800' />
                                {showToSuggestions && (
                    <Paper style={{ position: 'absolute', zIndex: 10, width: '100%' }}>
                        <List>
                            {suggestions?.features?.map((suggestion, index) => (
                                <ListItem
                                    key={index}
                                    button
                                    onClick={() => handleSuggestionClick(suggestion, 'toTrip')}
                                >
                                    {suggestion.place_name}
                                </ListItem>

                            ))}
                        </List>
                    </Paper>
                )}
            

                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <MobileDatePicker
                                        label="Pickup Date"
                                        disablePast={true}
                                        value={pickupDate}
                                        onChange={(newValue) => setPickupDate(newValue)}
                                        renderInput={(params) => <TextField {...params} className='w-full bg-white text-gray-800' />}
                                    />
                                    <MobileTimePicker
                                        label="Pickup Time"
                                        value={pickupTime}
                                        onChange={(newValue) =>handleNewTime(newValue)}
                                        renderInput={(params) => <TextField {...params} className='w-full bg-white text-gray-800' />}
                                    />
                                </LocalizationProvider>
                            </div>
                        </>
                    )}
                    {serviceType === 'twoWay' && (
                        <>
                            <div className='space-y-4 relative'>
                            <TextField value={fromTrip} label="From" variant="outlined" name='fromTrip' onChange={handleInputChange} className='w-full bg-white text-gray-800' />
                                {showFromSuggestions && (
                    <Paper style={{ position: 'absolute', zIndex: 10, width: '100%' }}>
                        <List>
                            {suggestions?.features?.map((suggestion, index) => (
                                <ListItem
                                    key={index}
                                    button
                                    onClick={() => handleSuggestionClick(suggestion, 'fromTrip')}
                                >
                                    {suggestion.place_name}
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                )}
                                <TextField value={toTrip} label="To" variant="outlined" onChange={handleInputChange} name='toTrip' className='w-full bg-white text-gray-800' />
                                {showToSuggestions && (
                    <Paper style={{ position: 'absolute', zIndex: 10, width: '100%' }}>
                        <List>
                            {suggestions?.features?.map((suggestion, index) => (
                                <ListItem
                                    key={index}
                                    button
                                    onClick={() => handleSuggestionClick(suggestion, 'toTrip')}
                                >
                                    {suggestion.place_name}
                                </ListItem>

                            ))}
                        </List>
                    </Paper>
                )}
             
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <MobileDatePicker
                                        label="Pickup Date"
                                        disablePast={true}
                                        value={pickupDate}
                                        onChange={(newValue) => setPickupDate(newValue)}
                                        renderInput={(params) => <TextField {...params} className='w-full bg-white text-gray-800' />}
                                    />
                                    <MobileTimePicker
                                        label="Pickup Time"
                                        value={pickupTime}
                                        onChange={(newValue) => handleNewTime(newValue)}
                                        renderInput={(params) => <TextField {...params} className='w-full bg-white text-gray-800' />}
                                    />
                                    <MobileDatePicker
                                        label="Return Date"
                                        value={returnDate}
                                        disablePast={true}
                                        onChange={(newValue) => setReturnDate(newValue)}
                                        renderInput={(params) => <TextField {...params} className='w-full bg-white text-gray-800' />}
                                    />
                                </LocalizationProvider>
                            </div>
                        </>
                    )}
                    {serviceType === 'airport' && (
                        <>
                            <div className='space-y-4 relative'>
                                <FormControl component="fieldset">
                                    <RadioGroup row value={tripType} onChange={(e) => setTripType(e.target.value)}>
                                        <FormControlLabel value="drop" control={<Radio />} label="Drop" />
                                        <FormControlLabel value="pickup" control={<Radio />} label="Pickup" />
                                    </RadioGroup>
                                </FormControl>
                                <TextField value={fromTrip} label="From" variant="outlined" name='fromTrip'  onChange={handleInputChange} className='w-full bg-white text-gray-800' />
                                
                                {showFromSuggestions && (
                    <Paper style={{ position: 'absolute', zIndex: 10, width: '100%' }}>
                        <List>
                            {suggestions?.features?.map((suggestion, index) => (
                                <ListItem
                                    key={index}
                                    button
                                    onClick={() => handleSuggestionClick(suggestion, 'fromTrip')}
                                >
                                    {suggestion.place_name}
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                )}
                                <TextField value={toTrip} label="To" variant="outlined" onChange={handleInputChange} name='toTrip' className='w-full bg-white text-gray-800' />
                                {showToSuggestions && (
                    <Paper style={{ position: 'absolute', zIndex: 10, width: '100%' }}>
                        <List>
                            {suggestions?.features?.map((suggestion, index) => (
                                <ListItem
                                    key={index}
                                    button
                                    onClick={() => handleSuggestionClick(suggestion, 'toTrip')}
                                >
                                    {suggestion.place_name}
                                </ListItem>

                            ))}
                        </List>
                    </Paper>
                )}

                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <MobileDatePicker
                                        label="Pickup Date"
                                        disablePast={true}
                                        value={pickupDate}
                                        onChange={(newValue) => setPickupDate(newValue)}
                                        renderInput={(params) => <TextField {...params} className='w-full bg-white text-gray-800' />}
                                    />
                                    <MobileTimePicker
                                        label="Pickup Time"
                                        value={pickupTime}
                                        onChange={(newValue) => handleNewTime(newValue)}
                                        renderInput={(params) => <TextField {...params} className='w-full bg-white text-gray-800' />}
                                    />
                                </LocalizationProvider>
                            </div>
                        </>
                    )}
                </div>

                <div className='flex justify-center mt-8'>
                    <button onClick={handleCarBookWithValidation} className='flex items-center  bg-white  font-semibold py-2 px-16 rounded-full shadow-xl text-purple-600 focus:ring-blue-500 focus:ring-4 transition duration-300 ease-in-out transform hover:scale-105'>
                        <SearchIcon className='mr-2' />
                        Find Your Ride
                    </button>
                </div>
            </div>

            {images.length === 4 && <div className='md:px-64 flex justify-center items-center md:py-10'>
                <img src={images[0]?.url} alt='banner' className='w-11/12 md:w-full  md:rounded-2xl rounded-lg' />
            </div>}

            <Box sx={{ py: 8, bgcolor: 'background.paper' }}>
                <Container>
                   {carsData && <Typography variant="h3" component="h2" textAlign="center" gutterBottom style={{ fontWeight: 'bold', fontSize: '2rem' }}>
                        See Our Tariffs
                    </Typography>}
                   {carsData?.map((tariff, index) => (
                <CarTariffItem key={index} tariff={tariff} index={index} />
            ))}
                </Container>
            </Box>

            <Box sx={{ py: 4, bgcolor: 'background.paper', textAlign: 'center' }}>
                <div className='flex items-center justify-center'>
                    <a href="#book" className='flex justify-center items-center bg-blue-500 w-72 text-center text-white font-semibold py-2 px-4 rounded-full shadow-xl focus:ring-blue-500 focus:ring-4 transition duration-300 ease-in-out transform hover:scale-105'>
                    
                        Book a Cab
                    </a>
                </div>
            </Box>

            <Box sx={{ py: 8, bgcolor: 'background.paper', textAlign: 'center' }}>
    <Container>
        <Typography variant="h3" component="h2" textAlign="center" gutterBottom style={{ fontWeight: 'bold', fontSize: '2rem', marginBottom:'40px' }}>
            Why Choose Vroom Cabs?
        </Typography>
        <Grid container spacing={5} justifyContent="center">
            {features?.map((feature, index) => (
                <Grid item xs={12} sm={6} md={4} key={index} style={{ textAlign: 'center', animation: `fadeInUp 0.5s ${index * 0.1}s ease-in-out both`, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img src={feature.image} alt={feature.title} style={{ width: '100px', height: '100px', objectFit: 'cover', marginBottom: '10px', display: 'block', margin: '0 auto' }} />
                    <Typography variant="h6" component="h3" gutterBottom style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
                        {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" style={{ fontSize: '1rem' }}>
                        {feature.description}
                    </Typography>
                </Grid>
            ))}
        </Grid>
    </Container>
</Box>


{ images.length === 4 &&
  (  <div className='border py-10 px-10 bg-gray-100 flex flex-wrap xl:flex-nowrap gap-4 justify-evenly'>
                <div className='p-10 w-96 h-96 rounded-xl shadow-xl flex justify-center items-center bg-white' style={{ backgroundImage: `url(${images[1]?.url})`, objectFit: 'cover' }}>
                </div>
                <div className='p-10 w-96 h-96 rounded-xl shadow-xl flex justify-center items-center bg-white' style={{ backgroundImage: `url(${images[2]?.url})`, objectFit: 'contain' }}>
                </div>
                <div className='p-10 w-96 h-96 rounded-xl shadow-xl flex justify-center items-center bg-white' style={{ backgroundImage: `url(${images[3]?.url})`, objectFit: 'contain' }}>
                </div>
            </div>)
            }
        { reviews &&   <Box sx={{ py: 8, bgcolor: 'background.paper', textAlign: 'center' }}>
                <Container>
                    <Typography variant="h3" component="h2" textAlign="center" gutterBottom>
                        Testimonials
                    </Typography>
                    <Slider {...settings}>
                        {reviews.map((reviews, index) => (
                            <div key={index}>
                                <Paper sx={{ p: 4, textAlign: 'center', boxShadow: 3 }}>
                                    <Typography variant="h6" component="h3" gutterBottom>
                                        {reviews.text}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                       ~ {reviews.user}
                                    </Typography>
                                </Paper>
                            </div>
                        ))}
                    </Slider>
                </Container>
            </Box>}

            <Box sx={{ py: 8, bgcolor: 'background.paper', textAlign: 'center' }}>
                <Container>
                    <Typography variant="h3" component="h2" textAlign="center" gutterBottom>
                        Feedback Form
                    </Typography>
                    <Paper sx={{ p: 4, boxShadow: 3, borderRadius: 2, animation: 'fadeIn 1s ease-in-out', backgroundColor: 'rgba(240, 128, 128, 0.1)' }}>
                        <form>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                <TextField
          name="user"
          label="Username"
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
                                </Grid>
                               
                                <Grid item xs={12}>
                                <TextField
          name="text"
          label="Review"
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          rows={4}
        />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        onClick={handleSubmit}
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        fullWidth
                                        sx={{
                                            backgroundColor: '#007BFF',
                                            '&:hover': {
                                                backgroundColor: '#0056b3',
                                            },
                                            py: 1,
                                            fontSize: '1rem',
                                            fontWeight: 'bold',
                                            borderRadius: '9999px',
                                            transition: 'all 0.3s ease-in-out',
                                            transform: 'scale(1)',
                                            ':hover': {
                                                transform: 'scale(1.05)',
                                            },
                                        }}
                                    >
                                        Submit Feedback
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Paper>
                </Container>
            </Box>

            <Box sx={{ py: 4, bgcolor: 'background.default', textAlign: 'center' }}>
                <Container>
                    <Typography variant="body2" color="textSecondary">
                        &copy; {new Date().getFullYear()} Vroom Cabs. All rights reserved.
                    </Typography>
                </Container>
            </Box>

        </>
    );
}

export default Homepage2;
