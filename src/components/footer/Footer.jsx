import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material'; // Importing Typography component
import { Images } from '../../assets/images';
import { useNavigate } from 'react-router-dom';
const Footer = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const handleSubscribe = () => {
    // Add subscription logic here
  };

  return (
    <>
      <div className='flex  w-full flex-col bg-gradient-to-r from-blue-900 to-purple-900 text-white pt-10'>
        <div className='flex flex-col md:flex-row px-8'>
          <div className='md:w-1/3 h-auto md:h-full mt-8'>
            <h1 className='text-3xl font-bold mb-5'>Services</h1>
            <div>
  <ol className="list-none">
    <a href='/'>
      <li className="md:w-52 text-gray-300 mb-2 lg:hover:scale-110 transition duration-300 hover:text-white flex items-center">
        <i className="fas fa-route mr-2"></i> One way trip
      </li>
    </a>
    <a href='/'>
      <li className="md:w-52 text-gray-300 mb-2 lg:hover:scale-110 transition duration-300 hover:text-white flex items-center">
        <i className="fas fa-exchange-alt mr-2"></i> Round trip
      </li>
    </a>
    <a href='/'>
      <li className="md:w-52 text-gray-300 mb-2 lg:hover:scale-110 transition duration-300 hover:text-white flex items-center">
        <i className="fas fa-plane-departure mr-2"></i> Airport Service
      </li>
    </a>
    <a href='/'>
      <li className="md:w-52 text-gray-300 mb-2 lg:hover:scale-110 transition duration-300 hover:text-white flex items-center">
        <i className="fas fa-taxi mr-2"></i> Get Taxi
      </li>
    </a>
  </ol>
</div>

          </div>
          <div className='md:w-1/3 h-full mt-8'>
            <h1 className='text-3xl font-bold mb-5'>Quick Links</h1>
            <ol className="list-none">
            <div onClick={()=>navigate('/')}>
                <li className="md:w-24 text-gray-300 mb-2 lg:hover:scale-110 transition duration-300 hover:text-white flex items-center">
                  <i className="fas fa-tags mr-2"></i> Tariffs
                </li>
              </div>
             
              <Link to='/about'>
                <li className="md:w-24 text-gray-300 mb-2 lg:hover:scale-110 transition duration-300 hover:text-white flex items-center">
                  <i className="fas fa-address-card mr-2"></i> About Us
                </li>
              </Link>
           
              <Link to='/blogs'>
                <li className="md:w-24 text-gray-300 mb-2 lg:hover:scale-110 transition duration-300 hover:text-white flex items-center">
                  <i className="fas fa-headset mr-2"></i> Blogs
                </li>
              </Link>
            </ol>
          </div>
          <div className='md:w-1/3 h-full mt-8'>
            <h1 className='text-3xl font-bold mb-5'>Contact Us</h1>
            <Typography variant="body1" color="textSecondary" component={'p'} paragraph>
              <p className="text-gray-300 mb-2">Email: contact@vroomcabs.com</p>
              <p className="text-gray-300 mb-2">Phone: +91 7668613191</p>
              <p className="text-gray-300 mb-2">Phone: +91 8791576777</p>
              <p className="text-gray-300 mb-2">Address: Radhika Tours and Travels 
              100 Feet Road, Dayal Bagh Agra.</p>
            </Typography>
            <h1 className='text-3xl font-bold mb-5 mt-8'>Newsletter</h1>
            <div className='flex'>
              <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Enter your email'
                className='px-4 py-2 rounded-l-lg w-full text-black'
              />
              <button
                onClick={handleSubscribe}
                className='bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition duration-300'
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
        <div className='flex flex-row justify-between my-3 px-8'>
          <div className="pt-6 md:mt-20 flex md:p-10">
            <Link to={'https://www.facebook.com/profile.php?id=61554487537625&mibextid=kFxxJD'}>
              <img src={Images.facebookLight} alt="Facebook" className="h-10 w-10 rounded-full object-contain mx-1 lg:hover:scale-110 transition-transform duration-300 mr-4" />
            </Link>
            <Link to={'https://www.instagram.com/vroomcabs.in?igsh=MW14Z2hudmsyaXlwcw%3D%3D'}>
              <img src={Images.instagramLight} alt="Instagram" className="h-10 w-10 rounded-full object-contain mx-1 lg:hover:scale-110 transition-transform duration-300 mr-4" />
            </Link>
            <Link to={'#'}>
              <img src={Images.linkedinLight} alt="LinkedIn" className="h-10 w-10 rounded-full object-contain mx-1 lg:hover:scale-110 transition-transform duration-300 mr-4" />
            </Link>
        
          </div>
        </div>
        <div className='h-full bg-gray-900 text-white px-8 py-4'>
          <Typography variant={'body2'} component={'span'}  align="center" className="text-gray-400">
            <span>© 2024 Vroomcabs.</span> All Rights <Link to={'/admin'}>Reserved.</Link>
          </Typography>
               </div>
      </div>
    </>
  );
};

export default Footer;
