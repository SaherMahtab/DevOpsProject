import React, { useState } from 'react';
import ScrollUp from '../../components/ScrollUp';
import { sendContactForm } from '../../api/endpoint';

const Contactus = () => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [subject, setSubject] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = async () => {

    let data = {
      name,
      email,
      phone: phoneNumber,
      subject,
      message: msg,
    };
    await sendContactForm(data);
    setName('');
    setEmail('');
    setPhoneNumber('');
    setSubject('');
    setMsg('');
    setSubmitted(true);

    
    setTimeout(() => {setSubmitted(false),  window.location.reload();}, 3000); // Reset after 3 seconds
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'phone') {
      setPhoneNumber(value);
    } else if (name === 'subject') {
      setSubject(value);
    } else if (name === 'message') {
      setMsg(value);
    }
  };

  return (
    <div style={styles.contactContainer}>
      <ScrollUp />
      <div style={{ ...styles.contactForm, ...(submitted ? styles.submitted : {}) }}>
        <h1 style={styles.heading}>Contact Us</h1>
        <p style={styles.description}>We'd love to hear from you! Please fill out the form below to get in touch with us.</p>
        <div  style={styles.form}>
          <input type="text" placeholder="Full Name" onChange={handleChange} name='name' required style={styles.input} />
          <input type="email" placeholder="Email" onChange={handleChange} name='email' required style={styles.input} />
          <input type="tel" placeholder="Phone Number" onChange={handleChange} name='phone' required style={styles.input} />
          <input type="text" placeholder="Subject" onChange={handleChange} name='subject' required style={styles.input} />
          <textarea placeholder="Message" rows="4" onChange={handleChange} name='message' required style={styles.textarea}></textarea>
          <button onClick={handleSubmit} style={styles.button}>Send Message</button>
        </div>
        {submitted && <div style={styles.thankYouMessage}>Thank you for your message!</div>}
      </div>
      <div style={styles.additionalInfo}>
        <div style={styles.infoSection}>
          <h2 style={styles.infoHeading}>Address</h2>
          <p style={styles.infoText}>Radhika Tours and Travels <br />100 Feet Road, Dayal Bagh Agra.</p>
        </div>
        <div style={styles.infoSection}>
          <h2 style={styles.infoHeading}>Phone</h2>
          <p style={styles.infoText}>7668613191<br />8791576777</p>
        </div>
        <div style={styles.infoSection}>
          <h2 style={styles.infoHeading}>Email</h2>
          <p style={styles.infoText}>contact@vroomcabs.com</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  contactContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    minHeight: '100vh',
    padding: '2rem',
    backgroundImage: 'url("https://images.pexels.com/photos/15509461/pexels-photo-15509461/free-photo-of-aerial-view-of-yellow-cabs-on-a-city-street.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
  },
  contactForm: {
    background: 'rgba(255, 255, 255, 0.9)',
    padding: '3rem',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
    borderRadius: '10px',
    transition: 'transform 0.3s ease, opacity 0.3s ease',
    maxWidth: '600px',
    width: '100%',
    marginBottom: '2rem',
    animation: 'fadeIn 1s ease-in-out',
  },
  submitted: {
    transform: 'scale(1.05)',
    opacity: 0.7,
  },
  heading: {
    marginBottom: '1rem',
    fontSize: '2.5rem',
    textAlign: 'center',
    color: '#1e3c72',
    fontWeight: 'bold',
  },
  description: {
    marginBottom: '2rem',
    textAlign: 'center',
    fontSize: '1.2rem',
    color: '#555',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    width: '100%',
    padding: '1rem',
    marginBottom: '1.5rem',
    border: '1px solid #ccc',
    borderRadius: '8px',
    fontSize: '1rem',
    animation: 'fadeInUp 0.5s ease-in-out',
  },
  textarea: {
    width: '100%',
    padding: '1rem',
    marginBottom: '1.5rem',
    border: '1px solid #ccc',
    borderRadius: '8px',
    fontSize: '1rem',
    animation: 'fadeInUp 0.5s ease-in-out',
  },
  button: {
    background: '#1e3c72',
    color: '#fff',
    border: 'none',
    padding: '1rem',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1.1rem',
    animation: 'fadeInUp 0.5s ease-in-out',
    transition: 'transform 0.2s, background 0.3s',
  },
  buttonHover: {
    transform: 'scale(1.05)',
    background: '#2a5298',
  },
  thankYouMessage: {
    marginTop: '2rem',
    color: '#28a745',
    fontSize: '1.2rem',
    textAlign: 'center',
    animation: 'fadeIn 0.5s ease-in-out',
  },
  additionalInfo: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    width: '100%',
    maxWidth: '900px',
    padding: '2rem',
    background: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '10px',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
    animation: 'fadeIn 1s ease-in-out',
  },
  infoSection: {
    textAlign: 'center',
    animation: 'fadeInUp 1s ease-in-out',
    marginBottom: '1.5rem',
  },
  infoHeading: {
    fontSize: '1.8rem',
    color: '#1e3c72',
    marginBottom: '0.5rem',
    textTransform: 'uppercase',
  },
  infoText: {
    fontSize: '1.2rem',
    color: '#555',
  },
  '@media (min-width: 600px)': {
    additionalInfo: {
      flexDirection: 'row',
    },
    infoSection: {
      marginBottom: 0,
    },
  },
};

// Adding the styles for the animations
const stylesString = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = stylesString;
document.head.appendChild(styleSheet);

export default Contactus;
