export const transformUpload = (values, imageState) => {
  const transactionId = imageState.submissionID;
  var uploadJSON = {};
  var customFields = {};
  var assetReferences = [];
  // var assestReferences = [];
  //Adding General Fields
  Object.keys(values).map((field) => {
    const fieldValue = values[field];
    if (field !== 'customFields') {
      if (field === 'sightingContext') {
        uploadJSON['context'] = fieldValue;
      } else {
        uploadJSON[field] = fieldValue;
      }
    }
  });
  //Adding all the customFields
  if (values.customFields) {
    Object.keys(values.customFields).map((field) => {
      const fieldType = values.customFields[field].Type;
      const fieldID = values.customFields[field].id;
      const fieldValue = values.customFields[field].Value;
      console.log('FIELD ' + values.customFields[field]);
      if (fieldType === 'latlong') {
        uploadJSON['decimalLatitude'] = fieldValue[0];
        uploadJSON['decimalLongitude'] = fieldValue[1];
      }
      if (fieldType === 'locationIds') {
        uploadJSON['locationId'] = fieldValue;
      }
      customFields[fieldID] = fieldValue;
    });
  }
  //Adding assets if there are any to include
  if (transactionId) {
    console.log(transactionId);
    imageState.images.map((image) => {
      console.log(image);
      assetReferences.push({
        transactionId,
        path: image.name,
      });
    });
  }
  const encounter = { customFields, assetReferences };
  uploadJSON['encounters'] = [encounter];
  uploadJSON['customFields'] = customFields; //<< Testing
  console.log('TRANSFORM RETURN');
  console.log(uploadJSON);
  return uploadJSON;
};
