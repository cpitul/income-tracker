import React, { useContext } from 'react';
import { useSpring, animated } from 'react-spring';
import StorageContext from '../context/StorageContext';

const Slider = () => {
  const { updateDarkMode, dark } = useContext(StorageContext);

  const props = useSpring({
    transform: dark ? 'translateX(100%)' : 'translateX(0%)',
    background: dark ? '#000' : '#dfdede',
    config: {
      duration: 250,
    },
  });

  const sliderLine = useSpring({
    background: dark ? '#dfdede' : '#000',
    config: {
      duration: 300,
    },
  });

  return (
    <animated.div style={sliderLine} className='slider'>
      <animated.div
        style={props}
        onClick={updateDarkMode}
        className='circle'
      ></animated.div>
    </animated.div>
  );
};

export default Slider;
