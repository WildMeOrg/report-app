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
            function printChildren(childrenArray,itemArray, depth){
              for( var i=0 ; i < childrenArray.length; i++ ){
                if(childrenArray === 0 ){
                  var child = <Picker.Item label={" ".repeat(5*depth)+childrenArray[i].name} value={childrenArray[i].id} key={childrenArray[i].id}/>;
                  itemArray.push(child);
                }
                else{
                  var parent = <Picker.Item label={" ".repeat(5*depth)+childrenArray[i].name} value={childrenArray[i].id} key={childrenArray[i].id}/>;
                  itemArray.push(parent);
                  printChildren(childrenArray[i].locationID,itemArray, depth + 1);
                }
              }
            }
            // //no children 
            if(item.locationID.length === 0){
              return(
                <Picker.Item label={item.name} value={item.id} key={item.id}/>
              );  
            }
            // //has children 
            else{
             var itemArray = [];
             var parent = <Picker.Item label={item.name} value={item.id} key={item.locationID.id}/>;
             itemArray.push(parent);
             var depth = 1;
             printChildren(item.locationID, itemArray, depth);
             return(itemArray);
            }
          })
        }
      </Picker>
    );
}