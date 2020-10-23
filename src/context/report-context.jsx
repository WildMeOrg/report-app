import React, { useReducer, createContext } from 'react';
import storage from './storage.js';

export const ReportContext = createContext();

const initialState = storage;

const reducer = (state, action) => {
    //some type of switch to add, remove, update reports
}

export const ReportContextProvider = props => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
    <ReportContext.Provider value={[state, dispatch]}>
        {props.children}
    </ReportContext.Provider>
    );
};