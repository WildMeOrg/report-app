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

  taxonomies: [
    {
      id: '00000000-0000-0000-0000-000000000000',
    },
    {
      id: '00000000-0000-0000-0000-000000000000',
    },
  ],

  customFields: {
    '00000000-0000-0000-0000-000000000000': 'some string',
    '00000000-0000-0000-0000-000000000001': 3.1415,
  },

  encounters: [
    {
      assetReferences: [
        {
          transactionId: '00000000-0000-0000-0000-000000000000',
          path: 'image-1.foo',
        },
      ],
      taxonomy: {
        id: '00000000-0000-0000-0000-000000000000',
      },

      time: '2021-21-05T00:01:59+03:00',
      behavior: 'sleeping',
      lifeStage: 'youthful',
      sex: 'male',
      locationId: 'some-location-A',
      decimalLatitude: 0.003,
      decimalLongitude: 0.004,
      individual: {
        id: '00000000-0000-0000-0000-000000000000',
      },
    },
    {
      assetReferences: [
        {
          transactionId: '00000000-0000-0000-0000-000000000000',
          path: 'image-1.foo',
        },
        {
          transactionId: '00000000-0000-0000-0000-000000000000',
          path: 'image-2.foo',
        },
      ],
      taxonomy: {
        id: '00000000-0000-0000-0000-000000000000',
      },

      customFields: {
        '00000000-0000-0000-0000-000000000000': 'happy',
        '00000000-0000-0000-0000-000000000001': 0.217036,
      },

      time: '2020-09-22T16:20:10+03:00',
      locationId: 'some-location-B',
      decimalLatitude: 0.005,
      decimalLongitude: 0.006,
      sex: 'female',
    },
  ],
};
