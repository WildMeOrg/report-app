import React, { useReducer, createContext } from 'react';
import storage from './storage.js';

export const ReportContext = createContext();

const initialState = storage;

const reducer = (state, action) => {
  // 'action' should be an object with a type and the appropriate element to pair with it
  switch (action.type) {
    case 'add':
      state.sightings.append(action.newSighting);
      break;

    case 'remove':
      // TODO: change from for-loop into dictionary id lookup to reduce from o(n^2) to o(n)
      for (let i = 0; i < state.sightings.length; i++) {
        if(state.sightings[i].id == action.targetID) {
          state.sightings.splice(i, 1);
        }
      }
      break;

    case 'update':
      for (let i = 0; i < state.sightings.length; i++) {
        if(state.sightings[i].id == action.targetID) {
          state.sightings[i] = action.updatedSighting;            
        }
      }  
      break;

    default:
      throw new Error(
        'Invalid use of state reducer: action.type "'+action.type+'" is invalid action type', 
        'report-context.jsx', 
        10
      );
  }
};

export const ReportContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ReportContext.Provider value={[state, dispatch]}>
      {props.children}
    </ReportContext.Provider>
  );
};
