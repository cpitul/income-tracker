import React, { useContext } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import StorageContext from '../context/StorageContext';

const Cal = () => {
  const { updateMonth, updateDate, date, dark } = useContext(StorageContext);

  const handleChangeMonth = (newDate) => {
    updateMonth(newDate.getMonth());
    updateDate(newDate);
  };

  return (
    <div className='cal'>
      <Calendar
        className={dark ? 'react-calendar darkCal' : 'react-calendar'}
        tileClassName={dark ? 'tile' : null}
        minDetail='year'
        maxDetail='year'
        next2Label={null}
        prev2Label={null}
        onClickMonth={handleChangeMonth}
        value={date}
      />
    </div>
  );
};

export default Cal;
