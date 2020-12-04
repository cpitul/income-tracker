import React, { useContext } from 'react';
import StorageContext from '../context/StorageContext';
import { useSpring, animated } from 'react-spring';

const IncomeCard = ({ entry, setEdit }) => {
  const { deleteEntry, dark } = useContext(StorageContext);

  const handleDelete = (id) => {
    deleteEntry(id);
  };

  const handleEdit = (id) => {
    setEdit({
      id,
      state: true,
    });
  };

  const days = ['Dum', 'Lu', 'Ma', 'Mi', 'Joi', 'Vi', 'Sam'];

  const darkStyles = {
    background: '#333',
  };

  const props = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: {
      duration: 700,
    },
  });

  return (
    <animated.li style={props} className='list-item'>
      <div className='date'>
        <h5>{days[entry.day]}</h5>
        <h5 className='cifra'>{entry.date}</h5>
      </div>
      <div style={dark ? darkStyles : null} className='card'>
        <p className='lead'>{entry.sum} lei</p>
        <span className='entry-icons'>
          <i
            onClick={() => handleEdit(entry.id)}
            className='entry-icon fas fa-pencil-alt'
          ></i>
          <i
            onClick={() => handleDelete(entry.id)}
            className='entry-icon fas fa-backspace '
          />
        </span>
      </div>
    </animated.li>
  );
};

export default IncomeCard;
