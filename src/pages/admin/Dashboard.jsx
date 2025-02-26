import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, ListItemIcon, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import { useNavigate } from 'react-router-dom';
import { deleteBooking_API, getBookings_API } from '../../api/endpoint';
import { Delete } from '@mui/icons-material';
import ScrollUp from '../../components/ScrollUp';

const Dashboard = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = React.useState([]);


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  
  const formatTime = (timeString) => {
    const time = new Date(timeString);
    return time.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  const getBookings = () => {
    getBookings_API().then((data) => {
      (data)
      setBookings(data);
    });
  }
  const handleDelete = (id) => {
    deleteBooking_API({id}).then((data) => {
      getBookings()
    }).catch((error) => {
      console.log(error)
    }
    )}
  const checkLogin = () => {
    if (!localStorage.getItem('token')) {
      navigate('/admin');
    }
  };

  React.useEffect(() => {
    checkLogin();
    getBookings()
  }, []);


  

  return (
    <Box className='h-full' sx={{ display: 'flex',marginTop:'80px', }}>
  <ScrollUp/>

      <Box sx={{ width: '20%', padding: 2, borderRight: '1px solid #ccc' }}>
        <Typography variant="h3" className='hidden md:block' fontWeight={'500'} color={'#0000aa'} gutterBottom>
          Dashboard
        </Typography>
        <List>
          <ListItem button onClick={() => navigate('/admin/dashboard/')}>
            <ListItemIcon><AssignmentIcon /></ListItemIcon>
            <ListItemText className='hidden md:block' primary="Bookings" />
          </ListItem>
          <ListItem button onClick={() => navigate('/admin/dashboard/EditTarrifs')}>
            <ListItemIcon><PriceChangeIcon /></ListItemIcon>
            <ListItemText className='hidden md:block' primary="Edit Prices" />
            <IconButton edge="end" aria-label="edit">
            </IconButton>
          </ListItem>
          <ListItem button onClick={() => navigate('/admin/dashboard/EditOffers')}>
            <ListItemIcon><AddIcon /></ListItemIcon>
            <ListItemText className='hidden md:block' primary="Add Offers" />
            <IconButton edge="end" aria-label="add">
            </IconButton>
          </ListItem>
          <ListItem button onClick={() => navigate('/admin/dashboard/EditReviews')}>
            <ListItemIcon><AddIcon /></ListItemIcon>
            <ListItemText className='hidden md:block' primary="Edit Reviews" />
            <IconButton edge="end" aria-label="add">
            </IconButton>
          </ListItem>
        </List>
      </Box>
      <Box sx={{ flexGrow: 1, padding: 2 }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Mob.no.</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>D/P</TableCell>
                <TableCell>Pickup</TableCell>
                <TableCell>Drop</TableCell>
                <TableCell>Pick Up Date</TableCell>
                <TableCell>Pick Up Time</TableCell>
                <TableCell>Vehicle</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Created at</TableCell>
                <TableCell>Delete</TableCell>
                {/* Add more table headers based on your schema */}
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking?.id}>
                  <TableCell>{booking?.id}</TableCell>
                  <TableCell>{booking?.customerName}</TableCell>
                  <TableCell>{booking?.customerPhone}</TableCell>
                  <TableCell>{booking?.customerEmail}</TableCell>
                  <TableCell>{booking?.serviceType}</TableCell>
                  <TableCell>{booking?.airportServiceType}</TableCell>
                  <TableCell>{booking?.pickupLocation}</TableCell>
                  <TableCell>{booking?.dropoffLocation}</TableCell>
                  <TableCell>{formatDate(booking?.pickupDate)}</TableCell>
                  <TableCell>{booking?.pickupTime}</TableCell>
                  <TableCell>{booking?.vehicleType}</TableCell>
                  <TableCell>₹{booking?.price}</TableCell>
                  <TableCell>{booking?.status}</TableCell>
                  <TableCell>{formatDate(booking?.createdAt)}</TableCell>
                  <TableCell><Button onClick={() => handleDelete(booking?._id)}><Delete /></Button></TableCell>
                  {/* Add more table cells based on your schema */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Dashboard;
