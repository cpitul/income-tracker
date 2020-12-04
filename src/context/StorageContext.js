import React, { useReducer, createContext, useEffect, useState } from 'react';

const StorageContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ENTRY':
      return [
        {
          id: state.length === 0 ? 1 : state[0].id + 1,
          sum: action.payload.sum,
          date: action.payload.date,
          month: action.payload.month,
          year: action.payload.year,
          day: action.payload.day,
        },
        ...state,
      ];
    case 'DELETE_ENTRY':
      return state.filter((entry) => entry.id !== action.payload);
    case 'UPDATE_ENTRY':
      return state.map((entry) =>
        entry.id === action.payload.id ? action.payload : entry
      );
    default:
      return state;
  }
};

const darkReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE':
      return !state;
    default:
      return state;
  }
};

export const Storage = ({ children }) => {
  // Reducer
  const [entries, dispatch] = useReducer(reducer, [], () => {
    const data = localStorage.getItem('entries');
    return data ? JSON.parse(data) : [];
  });

  const [dark, darkDispatch] = useReducer(darkReducer, false, () => {
    const data = localStorage.getItem('darkMode');
    return data ? JSON.parse(data) : false;
  });

  // State declarations
  const [date, setDate] = useState(new Date());
  const [toggle, setToggle] = useState(false);
  const [showCal, setShowCal] = useState(false);
  const [month, setMonth] = useState(date.getMonth());

  useEffect(() => localStorage.setItem('entries', JSON.stringify(entries)), [
    entries,
  ]);

  useEffect(() => localStorage.setItem('darkMode', JSON.stringify(dark)), [
    dark,
  ]);

  // Functions
  const updateDate = (newDate) => setDate(newDate);

  const updateMonth = (month) => setMonth(month);

  const updateToggle = () => setToggle(!toggle);

  const updateShowCal = () => setShowCal(!showCal);

  const updateLS = (input) => {
    dispatch({
      type: 'ADD_ENTRY',
      payload: {
        sum: input,
        date: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear(),
        day: date.getDay(),
      },
    });
  };

  const deleteEntry = (id) => dispatch({ type: 'DELETE_ENTRY', payload: id });

  const updateEntry = (update) =>
    dispatch({ type: 'UPDATE_ENTRY', payload: update });

  const updateDarkMode = () => darkDispatch({ type: 'TOGGLE' });

  return (
    <StorageContext.Provider
      value={{
        entries,
        toggle,
        showCal,
        month,
        date,
        dark,
        updateDate,
        updateMonth,
        updateToggle,
        updateShowCal,
        updateEntry,
        updateLS,
        deleteEntry,
        updateDarkMode,
      }}
    >
      {children}
    </StorageContext.Provider>
  );
};

export default StorageContext;
