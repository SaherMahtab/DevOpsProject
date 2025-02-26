// src/pages/admin/PriceChange.jsx

import React, { useEffect, useState } from 'react';
import { Button, Modal, Box, TextField } from '@mui/material';
import { styled } from '@mui/system';
import { changeCarPrice_API, getCars_API } from '../../api/endpoint';
import LoadingComponent from '../../components/loadingComponent/LoadingComponent';

const ModalBox = styled(Box)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  backgroundColor: 'white',
  padding: '16px',
  boxShadow: 24,
});

const carsData = [
  { id: 1, name: 'Car 1', price: '1000', image: 'path/to/image1' },
  { id: 2, name: 'Car 2', price: '2000', image: 'path/to/image2' },
  { id: 3, name: 'Car 3', price: '3000', image: 'path/to/image3' },
  { id: 4, name: 'Car 4', price: '4000', image: 'path/to/image4' },
];

const PriceChange = () => {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [newPrice, setNewPrice] = useState('');
  const [carsData, setCarsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpen = (car) => {
    setSelectedCar(car);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);
  const getCarsData = async () => {
    await getCars_API().then((data) => {
      setCarsData(data);
        setLoading(false);
    }).catch((error) => {
        console.error('There has been a problem with your fetch operation:', error);
        setLoading(false)
    }
    );
};
  const handleSave = () => {
    setOpen(false);
    let dataSend = {carId:selectedCar._id,newPrice}
    changeCarPrice_API(dataSend).then((data)=>{
      getCarsData()
    }).catch((error)=>{
      console.log(error)
    }
    )
  };
  useEffect(() => {
    getCarsData();
  }
  , []);
  return (
    <>
    {loading && <LoadingComponent/>}
    <div className="p-40">
    <div className='flex justify-between py=5 mx-5 items-center'>
                  <h1 className="text-lg font-bold">Change Prices</h1>
</div>
           
      {carsData?.map((car, index) => (
                <div key={index} className={`${selectedCar?.name === car.name ? 'ring-2': 'ring-0'} bg-gray-100 p-4 my-4 rounded-lg md:flex  justify-between items-center`}>
          <div className="flex justify-between  items-center">
                <img src={car.image} alt="Car 1" className="h-20 mix-blend-multiply  mr-4" />
                  <div>
                    <h2 className="text-lg font-semibold">{car.name}</h2>
                    <p>Car Fare: ₹ {car.price}</p>
                  </div>
                  </div>
                  <button onClick={()=>handleOpen(car)} className={`${selectedCar?.name === car.name ? 'bg-green-500' : 'bg-blue-500'} focus:ring-2 duration-300 focus:ring-blue-800 text-white px-4 py-2 rounded`}>{selectedCar?.name === car.name ?'Selected':'Select'}</button>
                </div>
            ))}
      <Modal open={open} onClose={handleClose}>
        <ModalBox>
          <h2>Edit Price for <h1 className="font-bold text-2xl">{selectedCar?.name}</h1></h2>
          <img src={selectedCar?.image} alt="Car 1" className="h-20 mix-blend-multiply  mr-4" />
          <TextField
            label="Enter New Price"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
            fullWidth
          />
          <div className="flex justify-between mt-4">
            <Button variant="contained" color="primary" onClick={handleSave}>
              Done
            </Button>
            <Button variant="contained" color="secondary" onClick={handleClose}>
              Cancel
            </Button>
          </div>
        </ModalBox>
      </Modal>
    </div>
    </>
   
  );
};

export default PriceChange;
