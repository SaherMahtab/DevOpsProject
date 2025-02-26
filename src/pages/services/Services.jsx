import React from "react";
import { Container, Grid, Typography, Card, CardContent, CardMedia, Box, Button } from "@mui/material";
import { motion } from "framer-motion";
import { styled } from "@mui/system";
import { Images } from "../../assets/images"; // Ensure to have your images here

const services = [
  {
    title: "Luxury Rides",
    description: "Experience the ultimate comfort and luxury with our premium rides. Perfect for special occasions.",
    image: Images.luxuryRides, // Replace with your image
  },
  {
    title: "Eco-Friendly Options",
    description: "Go green with our eco-friendly vehicles, designed for a sustainable future.",
    image: Images.ecoFriendly, // Replace with your image
  },
  {
    title: "24/7 Customer Support",
    description: "Our team is available round the clock to assist you with any queries or issues.",
    image: Images.customerSupport, // Replace with your image
  },
  {
    title: "Family Packages",
    description: "Enjoy special family packages with spacious and comfortable vehicles.",
    image: Images.familyPackages, // Replace with your image
  },
  {
    title: "Corporate Services",
    description: "Reliable and professional transportation solutions for corporate clients.",
    image: Images.corporateServices, // Replace with your image
  },
  {
    title: "City Tours",
    description: "Discover the beauty of the city with our guided city tours.",
    image: Images.cityTours, // Replace with your image
  },
];

const MotionCard = styled(motion(Card))({
  boxShadow: '0px 10px 30px rgba(0,0,0,0.1)',
  borderRadius: '15px',
  overflow: 'hidden',
  transition: 'transform 0.3s',
  '&:hover': {
    transform: 'scale(1.05)',
  },
});

const Services = () => {
  return (
    <Container sx={{ py: 8 }}>
      
      <Typography variant="h3" component="h2" textAlign="center" gutterBottom>
        Our Exclusive Services
      </Typography>
      <Grid container spacing={4}>
        {services.map((service, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <MotionCard
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <CardMedia
                component="img"
                height="200"
                image={service.image}
                alt={service.title}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Typography variant="h5" component="h3" gutterBottom>
                  {service.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {service.description}
                </Typography>
              </CardContent>
            </MotionCard>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ textAlign: 'center', mt: 8 }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{
            borderRadius: '50px',
            padding: '10px 30px',
            fontSize: '18px',
            transition: 'background 0.3s',
            '&:hover': {
              backgroundColor: '#0056b3',
            },
          }}
          component={motion.a}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          href="/contact" // Add the link to your contact page or booking page
        >
          Book a Service Now
        </Button>
      </Box>
    </Container>
  );
};

export default Services;
