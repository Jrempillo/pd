import React from 'react';

import './Footer.scss';

const Footer = () => {


  return (
    <div className='footer_container'>
      &copy; {new Date().getFullYear()} Technological Institute of the Philippines. All rights reserved.
    </div>
  );
};

export default Footer;
