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
      // TODO: change from for-loop into dictionary id
      for (let i = 0; i < state.sightings.length; i++) {
        if(state.sightings[i].id == action.targetID) {
          state.sightings.splice(i, 1);
        }
      }
      break;

    case 'update':
      // TODO: change from for-loop into dictionary id
      for (let i = 0; i < state.sightings.length; i++) {
        if(state.sightings[i].id == action.targetID) {
          state.sightings[i] = action.updatedSighting;            
        }
      }  
      break;

    default:
      throw new Error(
        'reducer: action.type "'+action.type+'" is invalid action type', 
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
