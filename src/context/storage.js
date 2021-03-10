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
      date: 'September 23rd, 2019',
      species: 'Humpback Whale',
      Title: 'Humpy',
      Location: 'Portland OR ',
      Context: 'I saw it. The thing was absolutly massive bro',
      synced: true,
      inProgress: false,
      //used to test the custom fields 
      customFields:[
        {
          Type: 'DateTimePicker',
          Title: 'Picture Taken',
          Value: '2021-03-07T02:00:53.350Z'
        },
        {
          Type: 'DateRangePicker',
          Title: 'Date Range Test',
          Value: {
            Start: '2021-03-07T02:00:53.350Z',
            End: '2021-03-16T21:55:28.978Z'
          }
        },
        {
          Type: 'LocationIDInput',
          Title:'LocationID test',
          Value: ' Some place'
        },
        {
          Type: 'MultiSelect',
          Title: 'MultiSelect Test',
          Value: ['b','c','d','e']
        },
        {
          Type: 'boolean',
          Title: 'Boolean Test',
          Value: 'True'
        },
        {
          Type: 'FeetMeters',
          Title: 'Length of Feet',
          Value: '1.524'
        },
        {
          Type: 'SelectInput',
          Title: 'SelectTest',
          Value: 'Yes Test'
        },
        {
          Type: 'LatLongInput',
          Title: 'Coordinates',
          Value: {
            Lat: '158.05',
            Long: '168.00'
          }
        },
        {
          Type: 'AllTextInput',
          Title: 'Text input test',
          Value: 'A massive paragraph or something'
        },
        {
          Type: 'Area',
          Title: 'Area of Sighting',
          Value: {
            North: '5.5',
            East: '6.6',
            South: '8.8',
            West: '9.9'
          }
        }
      ]
    },
    {
      id: 2,
      image: [Hummingbird],
      name: 'Anna\'s Hummingbird',
      date: 'October 23rd, 2019',
      species: 'Hummingbird',
      Title: 'Humming',
      Location: 'Beaverton OR',
      Context: 'A Cute Little Bird',
      synced: true,
      inProgress: false,
      customFields:[]
    },
    {
      id: 3,
      image: [RedPanda],
      name: 'Red Panda',
      date: 'September 23rd, 2019',
      species: 'Red Panda',
      Title: 'Pabu',
      Location: 'China',
      Context: 'Its that pet from LoK',
      synced: true,
      inProgress: false,
      customFields:[]
    },
    {
      id: 4,
      image: [Octopus],
      name: 'Maldives Octopus',
      date: 'November 23rd, 2019',
      species: 'Octopus',
      Title: 'Tako',
      Location: 'Maldives',
      Context: 'Freaky little guy',
      synced: true,
      inProgress: false,
      customFields:[]
    },
    {
      id: 5,
      image: [WhaleShark],
      name: 'Whale Shark',
      date: 'September 23rd, 2019',
      species: 'Whale Shark',
      Title: 'Whale Shark',
      Location: 'Australia',
      Context: 'Went diving, found this guy',
      synced: true,
      inProgress: false,
      customFields:[]
    },
    {
      id: 6,
      image: [Lizard],
      name: 'Indonesian Forest Liza...',
      date: 'September 23rd, 2019',
      species: 'Indonesian Forest Lizard',
      Title: 'Lizard',
      Location: 'Indonesia',
      Context: 'Got lost on a hiking trail, found this guy',
      synced: true,
      inProgress: false,
      customFields:[]
    },
    {
      id: 7,
      image: [Elephant],
      name: 'African Bush Elephant',
      date: 'September 23rd, 2019',
      species: 'African Bush Elephant',
      Title: 'Elephant',
      Location: 'Central Africa',
      Context: 'Big, Absoluely massive',
      synced: true,
      inProgress: false,
      customFields:[]
    },
    {
      id: 8,
      image: [Jaguar],
      name: 'North American Jaguar',
      date: 'September 23rd, 2019',
      species: 'North American Jaguar',
      Title: 'Jaguar',
      Location: 'Arizona, US',
      Context: 'A scary, fast cat',
      synced: true,
      inProgress: false,
      customFields:[]
    },
  ],
};
