import React, { useReducer, createContext } from 'react';

export const ImageSelectContext = createContext();

const initialState = {
  images: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'set':
      state.images = action.images;
      break;

    case 'clear':
      state.images = [];
      break;

    default:
      throw new Error(
        'reducer: action.type "' + action.type + '" is invalid action type',
        'imageSelectContext.jsx',
        10
      );
  }
  return state;
};

export const ImageSelectProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ImageSelectContext.Provider value={[state, dispatch]}>
      {props.children}
    </ImageSelectContext.Provider>
  );
};
