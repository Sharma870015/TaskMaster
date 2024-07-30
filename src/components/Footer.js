// Footer.js
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} TaskMaster. All Rights Reserved.</p>
        <div className="footer-links">
          <a href="/about">About Us</a>
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
          <a href="/contact">Contact Us</a>
        </div>
        <div className="social-media">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <img src="https://img.freepik.com/premium-photo/facebook-icon-logo-vector-illustration-banner_895118-5534.jpg?ga=GA1.2.1755385959.1720200277&semt=ais_hybrid" alt="Facebook" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <img src="https://img.freepik.com/premium-psd/twiter-3d-icon_530221-968.jpg?ga=GA1.2.1755385959.1720200277&semt=ais_hybrid" alt="Twitter" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <img src="https://img.freepik.com/free-psd/instagram-application-logo_23-2151544096.jpg?ga=GA1.2.1755385959.1720200277&semt=ais_hybrid" alt="Instagram" />
          </a>
        </div>
      </div>
      {/* <h3 className='footer-stand-image'>SignUp now to make your <br></br> project easy.</h3> */}
    </footer>
  );
};

export default Footer;
