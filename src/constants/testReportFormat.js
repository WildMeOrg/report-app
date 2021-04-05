export default {
  startTime: '2020-01-01T16:20:10+03:00',
  endTime: '2020-02-01T16:20:10+03:00',

  distance: 100.1,
  bearing: 0.0123,
  behavior: 'munging',

  decimalLatitude: 0.001,
  decimalLongitude: 0.002,

  locationId: 'location-id-0',
  verbatimLocality: 'localhost',
  context: 'anything',

  encounters: [
    {
      time: '2021-21-05T00:01:59+03:00',
      behavior: 'sleeping',
      lifeStage: 'youthful',
      sex: 'male',
      locationId: 'some-location-A',
      decimalLatitude: 0.003,
      decimalLongitude: 0.004,
    },
    {
      time: '2020-09-22T16:20:10+03:00',
      locationId: 'some-location-B',
      decimalLatitude: 0.005,
      decimalLongitude: 0.006,
      sex: 'female',
    },
  ],
};
