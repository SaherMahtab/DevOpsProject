import React from 'react';
import { Container, Typography, Grid, Card, CardMedia, CardContent, Box } from '@mui/material';
import ScrollUp from '../../components/ScrollUp';
import { Images } from '../../assets/images';

const About = () => {
  return (
    <div style={styles.container}>
    <ScrollUp/>
      
      <div style={styles.heroSection}>
        <Typography variant="h2" component="h1" style={styles.heroText}>
          About Vroom Cabs
        </Typography>
      </div>
      <Container sx={{ py: 8 }}>
        <Typography variant="h4" component="h2" textAlign="center" gutterBottom>
          Our Story
        </Typography>
        <Typography variant="body1" textAlign="center" color="text.secondary" paragraph>
          At Vroom Cabs, we are dedicated to providing the best transportation services to our customers. Our journey began with a mission to make travel easier, safer, and more convenient for everyone. 
          What started as a small initiative has now grown into a trusted travel partner for many, offering a variety of services to meet the diverse needs of our clients.
        </Typography>
        <Typography variant="body1" textAlign="center" color="text.secondary" paragraph>
          Over the years, we have continuously evolved to incorporate the latest technologies and innovations into our services. From our humble beginnings, we have expanded our fleet, enhanced our safety measures, 
          and introduced eco-friendly options to better serve our customers. Our commitment to excellence drives us to constantly improve and adapt to the changing needs of the transportation industry.
        </Typography>
        <Typography variant="body1" textAlign="center" color="text.secondary" paragraph>
          Our team is passionate about making every ride a pleasant and memorable experience. We believe in building long-lasting relationships with our customers by providing reliable, efficient, and friendly service.
          Join us on our journey as we continue to make strides in the world of transportation.
        </Typography>

        <Typography variant="h4" component="h2" textAlign="center" gutterBottom sx={{ mt: 8 }}>
          Our Values
        </Typography>
        <Grid container spacing={4}>
          {values.map((value, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ boxShadow: 5, transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' }, borderRadius: '10px' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={value.image}
                  alt={value.title}
                  sx={{ transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.1)' }, objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography variant="h5" component="h3" gutterBottom>
                    {value.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {value.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Typography variant="h4" component="h2" textAlign="center" gutterBottom sx={{ mt: 8 }}>
          Meet Our Team
        </Typography>
        <Grid container spacing={3}>
          {team.map((member, index) => (
            <Grid item xs={12} sm={12} md={12} key={index}>
              <Card sx={{ boxShadow: 5, transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' }, borderRadius: '10px' }}>
                <Grid container>
                  <Grid item xs={12} sm={6} md={6}>
                    <CardMedia
                      component="img"
                      image={member.image}
                      alt={member.name}
                      sx={{ transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.1)' }, objectFit: 'contain', width: '100%', height: '1000px' }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <CardContent>
                      <Typography variant="h5" component="h3" gutterBottom>
                        {member.name}
                      </Typography>
                      <Typography variant="body2" fontWeight={'900'} color="text.secondary">
                        {member.role}
                      </Typography>
                      <br/>
                      <br/>

                      <Typography variant="body1" textAlign={'justify'} color="text.secondary">
                        {member.desc1}
                      </Typography>
                      <br/>
                    
                      <Typography variant="body1" textAlign={'justify'} color="text.secondary">
                        {member.desc2}
                      </Typography>
                      <br/>
                      <Typography variant="body1" textAlign={'justify'} color="text.secondary">
                        {member.desc3}
                      </Typography>
                    </CardContent>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 8, textAlign: 'center' }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Our Vision
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            To be the leading transportation service provider, known for our exceptional service, innovative solutions, and commitment to sustainability. We aim to revolutionize the way people travel by providing reliable, safe, and eco-friendly transportation options.
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Our vision is to create a seamless and enjoyable travel experience for all our customers. We envision a future where Vroom Cabs is synonymous with comfort, safety, and efficiency in transportation. By continuously improving our services and embracing new technologies, we strive to set new standards in the industry.
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            We are committed to reducing our environmental impact and promoting sustainability. Our eco-friendly travel options are designed to minimize our carbon footprint while providing the same high level of service our customers expect. Together, we can create a greener future for the next generations.
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Join us as we pave the way for a smarter and more sustainable transportation network. Together, we can make every journey a memorable one.
          </Typography>
        </Box>
      </Container>
    </div>
  );
};

const values = [
  {
    title: 'Customer First',
    description: 'Our customers are at the heart of everything we do. We strive to provide exceptional service and exceed expectations.',
    image: 'https://images.pexels.com/photos/3184311/pexels-photo-3184311.jpeg?auto=compress&cs=tinysrgb&w=1600',
  },
  {
    title: 'Safety',
    description: 'Safety is our top priority. We ensure that all our rides are safe, secure, and comfortable for our passengers.',
    image: 'https://images.pexels.com/photos/5835266/pexels-photo-5835266.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    title: 'Innovation',
    description: 'We embrace innovation to provide cutting-edge solutions that enhance our services and improve the travel experience.',
    image: 'https://images.pexels.com/photos/373076/pexels-photo-373076.jpeg?auto=compress&cs=tinysrgb&w=1600',
  },
];

const team = [
  {
    name: 'Chetan Basotia',
    role: 'CEO & Founder',
    image: Images.chetan,
    desc1:`Chetan is a visionary entrepreneur with over 10 years of experience in the transportation industry. He founded Vroom Cab Service in 2022 with a mission to revolutionize urban mobility and provide a reliable, customer-centric cab service. Throughout his career, Chetan has demonstrated a keen ability to identify gaps in the market and develop innovative solutions to address them. His forward-thinking approach has been instrumental in shaping the direction of Vroom Cabs, ensuring that the company remains at the forefront of the industry.`,
    desc2: `Chetan's journey in the transportation sector began early in his career, where he gained valuable insights and experience working with various transportation and logistics companies. His passion for improving urban mobility led him to explore different aspects of the industry, from fleet management to customer service. This diverse experience has equipped him with a holistic understanding of the challenges and opportunities within the transportation landscape.`,
    desc3: `Under Chetan's leadership, Vroom Cabs has embraced cutting-edge technology to enhance the customer experience. From implementing advanced booking systems to integrating real-time tracking and payment solutions, Chetan has ensured that Vroom Cabs offers a seamless and convenient service to its users. His commitment to leveraging technology for operational efficiency has set Vroom Cabs apart from its competitors.`,
  }


];

  // {
  //   name: 'Jane Smith',
  //   role: 'Chief Operating Officer',
  //   image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1600',
  // },
  // {
  //   name: 'Robert Brown',
  //   role: 'Head of Marketing',
  //   image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1600',
  // },
 

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
  },
  heroSection: {
    background: 'url("https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1") no-repeat center center',
    backgroundSize: 'cover',
    height: '400px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    textAlign: 'center',
    marginBottom: '40px',
    position: 'relative',
    animation: 'fadeIn 1.5s ease-in-out',
  },
  heroText: {
    fontSize: '3rem',
    fontWeight: 'bold',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: '20px',
    borderRadius: '10px',
  },
};

export default About;
