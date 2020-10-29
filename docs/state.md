# State

State is written using React Context with Hooks. The implementation can be found in `/src/context/report-context`.



## How to use:

To implement state into your file, you will need to imports the following:

```jsx
import React, { useContext, useState } from 'react';
import { ReportContext } from '/src/context/report-context';
```

Once these are imported, you can start to use the state. To use it, create the following deconstructed array:

```jsx
const [state, dispatch] = useContext(ReportContext);
```

From here, you have access to any of the items in state, which can be accessed through `state.item`. 

The state also uses a reducer to manipulate state, which is also accessed through the `dispatch` function. For more details, see the *'State Manipulation'* section.



## Items in State:

#### `Sightings` -- the sighting objects used and created throughout the app

* `id` -- unique ID of the sighting.
* `image` -- the image associated with each sighting
* `name` -- the name of the animal/sighting
* `date` -- date of the sighting (change to ISO-8601)
* `synced` -- if the sighting has been synced with the server
* `inProgress` -- if the sighting is currently being uploaded to the server



## State Manipulation

To manipulate sightings, the reducer needs to be called through the dispatcher. The dispatcher requires a single object argument, with a required field of type, and other optional fields. The valid types and their corresponding data requirements are as follows:  

### **add**

* **Usage:**

  ```jsx
  dispatch({ 
      type:       'add', 
      newSighting: { SightingObject }
  });
  ```

* **Summary:** Simply pushes the Sighting in `newSighting` to the `sightings` array.

  

### **remove**

* **Usage:**

  ```jsx
  dispatch({
  	type:    'remove',
      removeID: IDNum
  });
  ```

* **Summary:** Removes the sighting with the target `removeID` from the `sightings` array.



### **update**

* **Usage:**

  ```jsx
  dispatch({
  	type:       'remove',
      newSighting: { SightingObject }, // [REQUIRED] The updated object
      updateID:    IDNum               // [REQUIRED] The id of the sighting to be updated
  });
  ```

* **Summary:** Replaces the old sighting, targeted with `updateID` with the `newSighting`.

