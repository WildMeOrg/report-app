import React, { useReducer, createContext } from 'react';
import Humpback from '../../assets/humpback.jpg';
import Hummingbird from '../../assets/hummingbird.jpg';
import RedPanda from '../../assets/redPanda.jpg';
import Octopus from '../../assets/octopus.jpg';
import WhaleShark from '../../assets/whaleshark.jpg';
import ForestLizard from '../../assets/lizard.jpg';
import Elephant from '../../assets/elephant.jpg';
import Jaguar from '../../assets/jaguar.jpg';

export const ReportContext = createContext();

const initialState = {
    testSightings: [
        {
            id: 1,
            image: Humpback,
            name: 'Humpback Whale',
            date: 'September 23rd, 2019',
            synced: true,
            inProgress: false,
        },
        {
            id: 2,
            image: Hummingbird,
            name: "Anna's Hummingbird",
            date: 'September 23rd, 2019',
            synced: true,
            inProgress: false,
        },
        {
            id: 3,
            image: RedPanda,
            name: 'Red Panda',
            date: 'September 23rd, 2019',
            synced: true,
            inProgress: false,
        },
        {
            id: 4,
            image: Octopus,
            name: 'Maldives Octopus',
            date: 'September 23rd, 2019',
            synced: true,
            inProgress: false,
        },
        {
            id: 5,
            image: WhaleShark,
            name: 'Whale Shark',
            date: 'September 23rd, 2019',
            synced: true,
            inProgress: false,
        },
        {
            id: 6,
            image: ForestLizard,
            name: 'Indonesian Forest Liza...',
            date: 'September 23rd, 2019',
            synced: true,
            inProgress: false,
        },
        {
            id: 7,
            image: Elephant,
            name: 'African Bush Elephant',
            date: 'September 23rd, 2019',
            synced: true,
            inProgress: false,
        },
        {
            id: 8,
            image: Jaguar,
            name: 'North American Jaguar',
            date: 'September 23rd, 2019',
            synced: true,
            inProgress: false,
        },
    ],
};

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