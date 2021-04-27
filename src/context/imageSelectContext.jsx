import React, { useReducer, createContext } from 'react';

export const ImageSelectContext = createContext();

const initialState = {
  images: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'set':
      return {
        ...state,
        images: action.images,
      };

    case 'clear':
      return {
        images: [],
      };

    case 'uppy':
      return {
        ...state,
        submissionID: action.submissionID,
        uploadID: action.uploadID,
      };

    default:
      throw new Error(
        'reducer: action.type "' + action.type + '" is invalid action type',
        'imageSelectContext.jsx',
        10
      );
  }
};

export const ImageSelectProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ImageSelectContext.Provider value={[state, dispatch]}>
      {props.children}
    </ImageSelectContext.Provider>
  );
};
