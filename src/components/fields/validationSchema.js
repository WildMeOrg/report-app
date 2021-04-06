import * as yup from 'yup';

const validationSchema = [
  yup.object().shape({
    title: yup.string().required('Title is required'),
    location: yup.string().required('Location is required'),
    sightingContext: yup
      .string()
      .required('Sighting Context is required')
      .min(8, 'Sighting Context must be more than 8 charaters')
      .max(255, 'Sighting Context must be less than 255 charaters'),
  }),
  yup.object().shape({
    status: yup.string(),
    relationships: yup.string(),
    matchIndividual: yup.string(),
  }),
  yup.object().shape({
    photographerName: yup.string(),
    photographerEmail: yup.string(),
  }),
];

export default validationSchema;
