import React, { useReducer, createContext } from 'react';
import storage from './storage.js';

export const ReportContext = createContext();

const initialState = storage;

const reducer = (state, action) => {
  // TODO: add state documentation 
  switch (action.type) {
    case 'add':
      state.sightings.append(action.newSighting);
      break;

    case 'remove':
      state.sightings = state.sightings.filter(sighting => sighting.id !== action.removeID);
      break;

    case 'update':
      state.sightings = state.sightings.filter(sighting => sighting.id !== action.updateID);
      state.sightings.push(action.newSighting);
      break;

    default:
      throw new Error(
        'reducer: action.type "'+action.type+'" is invalid action type', 
        'report-context.jsx', 
        10
      );
  }
  return state;
};

export const ReportContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ReportContext.Provider value={[state, dispatch]}>
      {props.children}
    </ReportContext.Provider>
  );
};
