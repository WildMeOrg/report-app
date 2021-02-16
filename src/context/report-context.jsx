import React, { useReducer, createContext } from 'react';
import storage from './storage.js';
import { AsyncStorage } from 'react-native';

export const ReportContext = createContext();

const initialState = storage;
const specialKey = ['\\', '?', '*', '[', ']', '(', ')', '+'];
AsyncStorage.setItem('REPORTS', JSON.stringify(storage));

const reducer = (state, action) => {
  // TODO: add state documentation
  switch (action.type) {
    case 'add':
      state.sightings.append(action.newSighting);
      break;

    case 'remove':
      state.sightings = state.sightings.filter(
        (sighting) => sighting.id !== action.removeID
      );
      break;

    case 'update':
      state.sightings = state.sightings.filter(
        (sighting) => sighting.id !== action.updateID
      );
      state.sightings.push(action.newSighting);
      break;

    case 'search':
      var literalText = action.text;
      specialKey.map((key) => {
        literalText = literalText.replace(key, '\\' + key);
        //might need to remove other characters later on.
        literalText = literalText.replace("'", '');
      });
      return {
        //TODO: figure out async storage to store and receive cards
        sightings: storage.sightings.filter((sighting) =>
          Object.keys(sighting).some(
            (key) =>
              sighting[key]
                .toString()
                .toLowerCase()
                .replace("'", '')
                .search(literalText.toLowerCase()) !== -1
          )
        ),
      };

    default:
      throw new Error(
        'reducer: action.type "' + action.type + '" is invalid action type',
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
