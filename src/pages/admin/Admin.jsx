import React, { useEffect, useState } from 'react';
import { Container, TextField, Button, Typography, Box, Grid, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { UseAuth } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';
import { login_API } from '../../api/endpoint';
import ScrollUp from '../../components/ScrollUp';
const Admin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isAuthenticated } = UseAuth();
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    await login_API({ data: { username:email, password } }).then((data) => {
      localStorage.setItem('token', data.token);
      login()
      navigate('/admin/dashboard');


    }).catch((error) => {
      console.log(error);

    });
    // Here, you can add your authentication logic.
    // For simplicity, we will assume the login is successful.
  };
  const checkLogin = () => {
    if (!localStorage.getItem('token')) {
      navigate('/admin/');
    }
  };
  useEffect(() => {
    checkLogin()
  }, []);
  return (
    <Container maxWidth="sm" sx={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
  <ScrollUp/>
      
      <Box
        component={motion.div}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4, mb: 4 }}
      >
        <Paper
          component={motion.div}
          initial={{ x: '100vw' }}
          animate={{ x: 0 }}
          transition={{ type: 'spring', stiffness: 50 }}
          elevation={10}
          sx={{
            p: 4,
            borderRadius: 3,
            width: '100%',
            background: 'linear-gradient(145deg, #ece9e6, #ffffff)',
          }}
        >
          <Typography
            component={motion.h1}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            variant="h4"
            textAlign="center"
            gutterBottom
            sx={{ color: '#333' }}
          >
            Admin Login
          </Typography>
          <form onSubmit={handleLogin}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  sx={{
                    '& label.Mui-focused': { color: '#333' },
                    '& .MuiOutlinedInput-root': {
                      '&.Mui-focused fieldset': {
                        borderColor: '#333',
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  sx={{
                    '& label.Mui-focused': { color: '#333' },
                    '& .MuiOutlinedInput-root': {
                      '&.Mui-focused fieldset': {
                        borderColor: '#333',
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                onClick={handleLogin}
                  component={motion.button}
                  whileTap={{ scale: 0.9 }}
                  variant="contained"
                  fullWidth
                  sx={{
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    backgroundColor: '#333',
                    color: '#fff',
                    '&:hover': {
                      backgroundColor: '#333', // No color change on hover
                    },
                  }}
                >
                  Login
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default Admin;
