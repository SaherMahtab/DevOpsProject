import React, { useState } from 'react';
import { Container, Typography, Grid, Card, CardMedia, CardContent, Button, Box, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import ScrollUp from '../../components/ScrollUp';

const Blogs = () => {
  const [selectedTag, setSelectedTag] = useState(null);

  const blogPosts = [
    {
      id: 1,
      title: 'The Benefits of Using Vroom Cabs for Intercity Travel',
      image: 'https://images.pexels.com/photos/1149831/pexels-photo-1149831.jpeg?auto=compress&cs=tinysrgb&w=1600',
      snippet: 'Discover the advantages of using Vroom Cabs for your intercity travel needs...',
      content: 'Full blog post content goes here...',
      tags: ['Intercity Travel', 'Travel Tips'],
    },
    {
      id: 2,
      title: 'How to Choose the Right Car for Your Trip',
      image: 'https://images.pexels.com/photos/3860096/pexels-photo-3860096.jpeg?auto=compress&cs=tinysrgb&w=1600',
      snippet: 'Choosing the right car for your trip is crucial for a comfortable journey...',
      content: 'Full blog post content goes here...',
      tags: ['Car Options', 'Travel Tips'],
    },
    {
      id: 3,
      title: 'Safety Tips for Your Next Ride with Vroom Cabs',
      image: 'https://images.pexels.com/photos/614503/pexels-photo-614503.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      snippet: 'Stay safe and secure on your next ride with these essential tips...',
      content: 'Full blog post content goes here...',
      tags: ['Safety', 'Travel Tips'],
    },
    {
      id: 4,
      title: 'Exploring the City with Vroom Cabs',
      image: 'https://images.pexels.com/photos/104554/pexels-photo-104554.jpeg?auto=compress&cs=tinysrgb&w=1600',
      snippet: 'Discover the best city tours and attractions with Vroom Cabs...',
      content: 'Full blog post content goes here...',
      tags: ['City Tours', 'Travel Tips'],
    },
    {
      id: 5,
      title: 'Top Destinations for a Weekend Getaway',
      image: 'https://images.pexels.com/photos/14436957/pexels-photo-14436957.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      snippet: 'Plan your perfect weekend getaway with Vroom Cabs...',
      content: 'Full blog post content goes here...',
      tags: ['Travel Tips', 'Destinations'],
    },
    {
      id: 6,
      title: 'Eco-Friendly Travel with Vroom Cabs',
      image: 'https://images.pexels.com/photos/97075/pexels-photo-97075.jpeg?auto=compress&cs=tinysrgb&w=1600',
      snippet: 'Learn about our eco-friendly travel options and reduce your carbon footprint...',
      content: 'Full blog post content goes here...',
      tags: ['Eco-Friendly', 'Travel Tips'],
    },
  ];

  const featuredPost = {
    id: 7,
    title: 'Vroom Cabs: Your Ultimate Travel Partner',
    image: 'https://images.pexels.com/photos/6324297/pexels-photo-6324297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    snippet: 'Learn how Vroom Cabs can be your ultimate travel partner for all your transportation needs...',
    content: 'Full blog post content goes here...',
    tags: ['Travel Tips', 'Intercity Travel'],
  };

  const allTags = ['Travel Tips', 'Safety', 'Car Options', 'Intercity Travel', 'City Tours', 'Airport Transfers', 'Destinations', 'Eco-Friendly'];

  const filteredPosts = selectedTag
    ? blogPosts.filter((post) => post.tags.includes(selectedTag))
    : blogPosts;

  return (
    <div style={styles.container}>
  <ScrollUp/>

      <div style={styles.heroSection}>
        <Typography variant="h2" component="h1" style={styles.heroText}>
          Welcome to Our Blog
        </Typography>
      </div>
      <Container sx={{ py: 8 }}>
        <Typography variant="h4" component="h2" textAlign="center" gutterBottom>
          Introduction
        </Typography>
        <Typography variant="body1" textAlign="center" color="text.secondary" paragraph>
          Welcome to the Vroom Cabs blog! Here you will find the latest news, tips, and stories related to our cab services. Whether you are planning an intercity trip or need to know the best safety practices, we've got you covered. Stay tuned for regular updates and insightful content to make your travel experiences better.
        </Typography>

        <Typography variant="h4" component="h2" textAlign="center" gutterBottom>
          Featured Blog
        </Typography>
        <Grid container justifyContent="center" sx={{ mb: 8 }}>
          <Grid item xs={12} md={8}>
            <Card sx={{ boxShadow: 5, transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)', boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)' }, borderRadius: '10px' }}>
              <CardMedia
                component="img"
                height="400"
                image={featuredPost.image}
                alt={featuredPost.title}
                sx={{ transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.1)' } }}
              />
              <CardContent>
                <Typography variant="h5" component="h3" gutterBottom>
                  {featuredPost.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {featuredPost.snippet}
                </Typography>
                <Button
                  component={Link}
                  to={`/blog/${featuredPost.id}`}
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2, transition: 'background 0.3s', '&:hover': { backgroundColor: '#007BFF' } }}
                >
                  Read More
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Typography variant="h4" component="h2" textAlign="center" gutterBottom>
          Latest Posts
        </Typography>
        <Grid container spacing={4}>
          {filteredPosts.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post.id} sx={styles.animateCard}>
              <Card sx={{ boxShadow: 5, transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)', boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)' }, borderRadius: '10px' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={post.image}
                  alt={post.title}
                  sx={{ transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.1)' }, objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography variant="h5" component="h3" gutterBottom>
                    {post.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {post.snippet}
                  </Typography>
                  <Button
                    component={Link}
                    to={`/blog/${post.id}`}
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2, transition: 'background 0.3s', '&:hover': { backgroundColor: '#007BFF' } }}
                  >
                    Read More
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 8, textAlign: 'center' }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Subscribe to Our Newsletter
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Stay updated with the latest news and blog posts from Vroom Cabs. Subscribe to our newsletter by entering your email below.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <TextField
              label="Enter your email"
              variant="outlined"
              sx={{ width: '300px', marginRight: '1rem' }}
            />
            <Button variant="contained" color="primary">
              Subscribe
            </Button>
          </Box>
        </Box>

        <Box sx={{ mt: 8, textAlign: 'center' }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Popular Tags
          </Typography>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '10px' }}>
            {allTags.map((tag) => (
              <Button
                key={tag}
                variant="outlined"
                sx={styles.tagButton}
                onClick={() => setSelectedTag(tag)}
              >
                {tag}
              </Button>
            ))}
          </Box>
        </Box>
      </Container>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
  },
  heroSection: {
    background: 'url("https://images.pexels.com/photos/97075/pexels-photo-97075.jpeg?auto=compress&cs=tinysrgb&w=1600") no-repeat center center',
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
  animateCard: {
    animation: 'fadeInUp 1s ease-in-out',
  },
  tagButton: {
    borderRadius: '20px',
    transition: 'transform 0.3s',
    '&:hover': {
      transform: 'scale(1.1)',
      backgroundColor: '#007BFF',
      color: '#fff',
    },
  },
  '@keyframes fadeInUp': {
    '0%': {
      opacity: 0,
      transform: 'translateY(20px)',
    },
    '100%': {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
  '@keyframes fadeIn': {
    '0%': {
      opacity: 0,
    },
    '100%': {
      opacity: 1,
    },
  },
};

export default Blogs;
