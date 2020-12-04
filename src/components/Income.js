import React, { useContext, useEffect, useState } from 'react';
import { animated, useSpring } from 'react-spring';
import StorageContext from '../context/StorageContext';
import Cal from './Cal';
import EditOverlay from './EditOverlay';
import IncomeCard from './IncomeCard';

const Income = () => {
  const months = [
    'Ianuarie',
    'Februarie',
    'Martie',
    'Aprilie',
    'Mai',
    'Iunie',
    'Iulie',
    'August',
    'Septembrie',
    'Octombrie',
    'Noiembrie',
    'Decembrie',
  ];
  const { entries, toggle, showCal, month, date } = useContext(StorageContext);
  const [totalDisplay, setTotalDisplay] = useState(null);
  const [edit, setEdit] = useState({ id: null, state: false });

  const income = useSpring({
    marginTop: toggle ? 71 : 0,
    config: {
      duration: 0,
    },
  });

  useEffect(() => {
    let total = 0;
    entries.map((entry) =>
      entry.month === month ? (total += entry.sum) : null
    );
    setTotalDisplay(total.toFixed(2));
  }, [month, entries]);

  return (
    <animated.div style={income}>
      {showCal && <Cal />}
      <div className='info'>
        {totalDisplay !== parseFloat(0).toFixed(2) && (
          <h3>Total: {totalDisplay} lei</h3>
        )}
        <h3>{`${months[month]} ${date.getFullYear()}`}</h3>
      </div>
      <ul>
        {entries.map(
          (entry) =>
            entry.month === month && (
              <IncomeCard key={entry.id} entry={entry} setEdit={setEdit} />
            )
        )}
      </ul>
      {edit.state && <EditOverlay id={edit.id} setEdit={setEdit} edit={edit} />}
    </animated.div>
  );
};

export default Income;
