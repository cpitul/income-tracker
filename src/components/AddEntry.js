import React, { useState, useContext, Fragment, useRef } from 'react';
import StorageContext from '../context/StorageContext';
import { useSpring, animated } from 'react-spring';

const AddEntry = () => {
  const { updateLS, toggle, updateToggle, dark } = useContext(StorageContext);
  const [input, setInput] = useState('');
  const [showAlert, setShowAlert] = useState(0);

  const inputRef = useRef();

  const header = useSpring({
    transform: toggle ? 'translateY(0)' : 'translateY(-150%)',
    position: toggle ? 'fixed' : 'absolute',
    top: toggle ? 0 : 0,

    background: dark ? '#222' : '#ff4757',
    color: dark ? '#ff4757' : '#000',
  });
  const form = useSpring({
    transform: toggle ? 'translateX(0)' : 'translateX(100%)',
    background: dark ? '#222' : '#ff4757',
  });

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input) {
      updateLS(parseFloat(input));
      setInput('');
      updateToggle();
    } else {
      setShowAlert(1);
      setTimeout(() => {
        setShowAlert(0);
      }, 1700);
    }
  };

  const handleTheme = () => {
    return dark ? { borderColor: '#ff4757', color: '#fff' } : null;
  };

  let inputStyle = handleTheme();

  const darkStyle = {
    background: '#222',
    color: '#ff4757',
  };
  const darkStyleBtn = {
    background: '#000',
    color: '#ff4757',
  };

  return (
    <div>
      <i
        onClick={() => {
          updateToggle();
          inputRef.current.focus();
        }}
        className='fas fa-plus fa-2x'
        style={dark ? darkStyle : null}
      />
      <Fragment>
        <animated.h2 style={header}>Adauga venit</animated.h2>
        <animated.form style={form} id='form' onSubmit={handleSubmit}>
          {showAlert === 1 && (
            <p style={dark ? { color: '#ff4757' } : null} className='sm-txt'>
              Please enter something
            </p>
          )}
          <input
            min='0'
            step='0.01'
            style={inputStyle}
            onFocus={handleTheme}
            ref={inputRef}
            value={input}
            onChange={handleInput}
            type='number'
            className='input-number'
            id='number'
          />
          <input
            onClick={() => (document.querySelector('html').scrollTop = 0)}
            style={dark ? darkStyleBtn : null}
            type='submit'
            value='Adauga'
            className='input-btn'
          />
          <input
            style={dark ? darkStyleBtn : null}
            onClick={() => {
              updateToggle();
              setInput('');
            }}
            type='button'
            value='Renunta'
            className='input-btn'
          />
        </animated.form>
      </Fragment>
    </div>
  );
};

export default AddEntry;
