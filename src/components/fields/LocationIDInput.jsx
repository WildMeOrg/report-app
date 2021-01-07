import React, { useState } from 'react';
import { Picker } from '@react-native-community/picker';
import globalStyles from '../../styles/globalStyles';
import styles from '../../styles/newSightingStyles';

export default function locationIDInput(rest){
    //NOTE: for some reason this field doesnt have a schema, just locationID 
    const {name,schema,locationID,props} = rest;
    const [choice, setChoice] = useState();
    return(
        <Picker 
        selectedValue={choice}
        style={{height: 50, width: 200, margin: '5%'}}
        onValueChange={(itemValue) => setChoice(itemValue)}>
        {
          locationID.map((item) => 
          {
            //no children 
            if(item.locationID.length === 0){
              return(
                <Picker.Item label={item.name} value={item.id} key={item.id}/>
              );  
            }
            //TODO possibly need to change this in case of multiple levels of children 
            //has children 
            else{
             var itemArray = [];
             var parent = <Picker.Item label={item.name} value={item.id} key={item.locationID.id}/>;
             itemArray.push(parent);
             for(var i = 0; i < item.locationID.length; i++){
               var child = <Picker.Item label={" ".repeat(10)+item.locationID[i].name} value={item.locationID[i].id} key={item.locationID[i].id}/>; 
               itemArray.push(child);
             }
             return(itemArray);
            }
          })
        }
      </Picker>
    );
}