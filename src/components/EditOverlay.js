import React, { useContext, useState } from 'react';
import StorageContext from '../context/StorageContext';

const EditOverlay = ({ id, setEdit }) => {
  // Context
  const { entries, updateEntry, dark } = useContext(StorageContext);

  // Funtions
  const toEdit = entries.filter((entry) => entry.id === id);
  const { sum, date, month, year } = toEdit[0];

  const handleTotal = (e) => setTotal(e.target.value);
  const handleD = (e) => setD(e.target.value);
  const handleM = (e) => setM(e.target.value);
  const handleY = (e) => setY(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    const newDate = new Date(`${m}/${d}/${y}`);
    const update = {
      id,
      sum: parseFloat(total),
      day: newDate.getDay(),
      date: newDate.getDate(),
      month: newDate.getMonth(),
      year: newDate.getFullYear(),
    };
    updateEntry(update);
    setEdit(false);
  };

  // State
  const [d, setD] = useState(date);
  const [m, setM] = useState(month + 1);
  const [y, setY] = useState(year);
  const [total, setTotal] = useState(sum);

  const handleTheme = () => {
    return dark ? { borderColor: '#ff4757', color: '#fff' } : null;
  };

  let inputStyle = handleTheme();

  const darkStyles = {
    background: '#222',
  };
  const darkStylesBtn = {
    background: '#000',
    color: '#ff4757',
  };

  return (
    <div className='overlay'>
      <form
        style={dark ? darkStyles : null}
        className='edit-form'
        onSubmit={handleSubmit}
      >
        <h4 style={dark ? { color: '#ff4757' } : null}>Editeaza</h4>
        <label htmlFor='total'>Suma</label>
        <input
          min='0'
          step='0.01'
          style={inputStyle}
          onFocus={handleTheme}
          value={total}
          onChange={handleTotal}
          type='number'
          name='total'
          className='input'
        />
        <label htmlFor='zi'>Ziua</label>
        <input
          min='1'
          max='31'
          style={inputStyle}
          onFocus={handleTheme}
          value={d}
          onChange={handleD}
          type='number'
          name='zi'
          className='input'
        />
        <label htmlFor='luna'>Luna</label>
        <input
          min='1'
          max='12'
          style={inputStyle}
          onFocus={handleTheme}
          value={m}
          onChange={handleM}
          type='number'
          name='luna'
          className='input'
        />
        <label htmlFor='an'>Anul</label>
        <input
          min='0'
          style={inputStyle}
          onFocus={handleTheme}
          value={y}
          onChange={handleY}
          type='number'
          name='an'
          className='input'
        />
        <input
          style={dark ? darkStylesBtn : null}
          type='submit'
          value='Salveaza'
          id='edit-submit'
          className='btn'
        />
        <input
          style={dark ? darkStylesBtn : null}
          onClick={() => setEdit(false)}
          type='button'
          value='Renunta'
          id='edit-exit'
          className='btn'
        />
      </form>
    </div>
  );
};

export default EditOverlay;
