import Humpback from '../../assets/images/humpback.jpg';
import Hummingbird from '../../assets/images/hummingbird.jpg';
import RedPanda from '../../assets/images/redPanda.jpg';
import Octopus from '../../assets/images/octopus.jpg';
import WhaleShark from '../../assets/images/whaleshark.jpg';
import Lizard from '../../assets/images/lizard.jpg';
import Elephant from '../../assets/images/elephant.jpg';
import Jaguar from '../../assets/images/jaguar.jpg';
import Humpback2 from '../../assets/images/humpback2.jpeg';
import Humpback3 from '../../assets/images/humpback3.jpeg';

export default storage = {
  //dummy data for testing
  sightings: [
    {
      id: 1,
      image: [Humpback, Humpback2, Humpback3], //used to test image slider
      name: 'Humpback Whale',
      date: Date(2019, 8, 19, 13, 24, 56, 987),
      Species: 'Humpback Whale',
      Title: 'Humpy',
      Location: 'Portland OR ',
      Context: 'I saw it. The thing was absolutly massive bro',
      synced: true,
      inProgress: false,
      //used to test the custom fields
      customFields: {
        'Picture Taken': {
          Type: 'DateTimePicker',
          Value: Date(2021, 3, 7, 2, 0, 53, 987),
        },
        'Date Range Test': {
          Type: 'DateRangePicker',
          Value: {
            Start: Date(2021, 3, 7, 2, 0, 53, 987),
            End: Date(2021, 3, 16, 21, 55, 28, 987),
          },
        },
        'LocationID Test': {
          Type: 'LocationIDInput',
          Value: 'Some Place',
        },
        'MultiSelect Test': {
          Type: 'MultiSelect',
          Value: ['b', 'c', 'd', 'e'],
        },
        'Boolean Test': {
          Type: 'boolean',
          Value: 'True',
        },
        'Length of Feet': {
          Type: 'FeetMeters',
          Value: '1.524',
        },
        'Select Test': {
          Type: 'SelectInput',
          Value: 'Yes Test',
        },
        'Coordinates ': {
          Type: 'LatLongInput',
          Value: {
            Lat: '158.05',
            Long: '168.00',
          },
        },
        'Text Input Test': {
          Type: 'AllTextInput',
          Value: 'A massive paragraph or soemthing',
        },
        'Area of Sighting': {
          Type: 'AreaInput',
          Value: {
            North: '5.5',
            East: '6.6',
            South: '8.8',
            West: '9.9',
          },
        },
      },
    },
    {
      id: 2,
      image: [Hummingbird],
      name: "Anna's Hummingbird",
      date: Date(2019, 8, 21, 13, 24, 56, 987),
      Species: 'Hummingbird',
      Title: 'Humming',
      Location: 'Beaverton OR',
      Context: 'A Cute Little Bird',
      synced: true,
      inProgress: false,
      customFields: {},
    },
    {
      id: 3,
      image: [RedPanda],
      name: 'Red Panda',
      date: Date(2019, 8, 23, 13, 24, 56, 987),
      Species: 'Red Panda',
      Title: 'Pabu',
      Location: 'China',
      Context: 'Its that pet from LoK',
      synced: true,
      inProgress: false,
      customFields: {},
    },
    {
      id: 4,
      image: [Octopus],
      name: 'Maldives Octopus',
      date: Date(2019, 8, 22, 15, 24, 56, 987),
      Species: 'Octopus',
      Title: 'Tako',
      Location: 'Maldives',
      Context: 'Freaky little guy',
      synced: true,
      inProgress: false,
      customFields: {},
    },
    {
      id: 5,
      image: [WhaleShark],
      name: 'Whale Shark',
      date: Date(2019, 8, 21, 16, 24, 56, 987),
      Species: 'Whale Shark',
      Title: 'Whale Shark',
      Location: 'Australia',
      Context: 'Went diving, found this guy',
      synced: true,
      inProgress: false,
      customFields: {},
    },
    {
      id: 6,
      image: [Lizard],
      name: 'Indonesian Forest Liza...',
      date: Date(2019, 8, 23, 17, 24, 56, 987),
      Species: 'Indonesian Forest Lizard',
      Title: 'Lizard',
      Location: 'Indonesia',
      Context: 'Got lost on a hiking trail, found this guy',
      synced: true,
      inProgress: false,
      customFields: {},
    },
    {
      id: 7,
      image: [Elephant],
      name: 'African Bush Elephant',
      date: Date(2019, 8, 25, 13, 24, 56, 987),
      Species: 'African Bush Elephant',
      Title: 'Elephant',
      Location: 'Central Africa',
      Context: 'Big, Absoluely massive',
      synced: true,
      inProgress: false,
      customFields: {},
    },
    {
      id: 8,
      image: [Jaguar],
      name: 'North American Jaguar',
      date: Date(2019, 8, 24, 13, 24, 56, 987),
      Species: 'North American Jaguar',
      Title: 'Jaguar',
      Location: 'Arizona, US',
      Context: 'A scary, fast cat',
      synced: true,
      inProgress: false,
      customFields: {},
    },
  ],
};
