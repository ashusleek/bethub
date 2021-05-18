import React from 'react';
import { Image } from '@themesberg/react-bootstrap';

const Preloader = props => {
  const { show } = props;

  return (
    <div className={`preloader bg-soft flex-column justify-content-center align-items-center ${show ? '' : 'show'}`}>
      <Image className='loader-element animate__animated animate__jackInTheBox' src='/logo192.png' height={40} />
    </div>
  );
};

export default Preloader;
