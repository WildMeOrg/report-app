import React, { Fragment, useState } from 'react';
import SelectMultiple from 'react-native-select-multiple';
import globalStyles from '../../styles/globalStyles';
import styles from '../../styles/newSightingStyles';
import theme from '../../constants/theme';
import { View } from 'react-native';

export default function MultiSelectInput(rest) {
  const { name, schema, props } = rest;
  //TODO possibly fix the warnings that appear in expo
  //TODO possibly add a constraint on num of choices if needed
  //TODO typeography & validation
  const multiSelectOptions = schema.choices; //could be wrong
  const [selectedOptions, setSelectedOptions] = useState([]);
  const onSelectionsChange = (items) => {
    setSelectedOptions(items);
  };
  return (
    <View style={{ borderColor: theme.black, borderRadius: 10 }}>
      <SelectMultiple
        items={multiSelectOptions}
        selectedItems={selectedOptions}
        onSelectionsChange={onSelectionsChange}
        style={{
          marginHorizontal: '5%',
        }}
        rowStyle={{
          borderBottomWidth: 1,
          borderTopWidth: 1,
          borderBottomColor: '#cccccc',
          borderTopColor: '#cccccc',
        }}
      />
    </View>
  );
}
