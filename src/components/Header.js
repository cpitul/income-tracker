import React, { useContext } from 'react';
import { animated, useSpring } from 'react-spring';
import StorageContext from '../context/StorageContext';
import Slider from './Slider';

const Header = () => {
  const { toggle, showCal, updateShowCal, dark } = useContext(StorageContext);
  const props = useSpring({
    opacity: toggle ? 0 : 1,
    position: toggle ? 'absolute' : 'sticky',
    top: toggle ? 0 : 0,
    width: toggle ? '100%' : '100%',
  });

  const darkStyles = {
    background: '#222',
    color: '#ff4757',
  };

  return (
    <animated.header style={props}>
      <Slider />
      <h2 style={dark ? darkStyles : null}>Income Tracker</h2>
      {showCal ? (
        <i
          style={dark ? darkStyles : null}
          onClick={updateShowCal}
          className='calendar-icon fas fa-calendar-alt fa-2x'
        ></i>
      ) : (
        <i
          style={dark ? darkStyles : null}
          onClick={updateShowCal}
          className='calendar-icon far fa-calendar-alt fa-2x'
        ></i>
      )}
    </animated.header>
  );
};

export default Header;
