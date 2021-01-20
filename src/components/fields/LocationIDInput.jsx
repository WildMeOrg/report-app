import React, { useState } from 'react';
import { Picker } from '@react-native-community/picker';
import globalStyles from '../../styles/globalStyles';
import styles from '../../styles/newSightingStyles';
import { View } from 'react-native';

export default function locationIDInput(rest) {
  //NOTE: for some reason this field doesnt have a schema, just locationID
  const { name, schema, locationID, props } = rest;
  console.log(props.values);
  const [choice, setChoice] = useState();
  return (
    <View style={{flex: 1}}>
      <Picker
        selectedValue= {props.values.customFields[name] || choice}
        style={{ margin: '5%', height: 115 }}
        itemStyle={{ height: 115 }}
        onValueChange={(itemValue) => {
          [
            setChoice(itemValue),
            props.setFieldValue(`customFields.${name}`, itemValue),
          ];
        }}
        onBlur={props.handleBlur(`customFields.${name}`)}
      >
        {locationID.map((item) => {
          function printChildren(childrenArray, itemArray, depth) {
            for (var i = 0; i < childrenArray.length; i++) {
              if (childrenArray === 0) {
                var child = (
                  <Picker.Item
                    label={' '.repeat(5 * depth) + childrenArray[i].name}
                    value={childrenArray[i].id}
                    key={childrenArray[i].id}
                  />
                );
                itemArray.push(child);
              } else {
                var parent = (
                  <Picker.Item
                    label={' '.repeat(5 * depth) + childrenArray[i].name}
                    value={childrenArray[i].id}
                    key={childrenArray[i].id}
                  />
                );
                itemArray.push(parent);
                printChildren(
                  childrenArray[i].locationID,
                  itemArray,
                  depth + 1
                );
              }
            }
          }
          // //no children
          if (item.locationID.length === 0) {
            return (
              <Picker.Item label={item.name} value={item.id} key={item.id} />
            );
          }
          // //has children
          else {
            var itemArray = [];
            var parent = (
              <Picker.Item
                label={item.name}
                value={item.id}
                key={item.locationID.id}
              />
            );
            itemArray.push(parent);
            var depth = 1;
            printChildren(item.locationID, itemArray, depth);
            return itemArray;
          }
        })}
      </Picker>
    </View>
  );
}
