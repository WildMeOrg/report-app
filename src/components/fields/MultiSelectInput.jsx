import React, { Fragment, useState } from 'react';
import SelectMultiple from 'react-native-select-multiple';
import globalStyles from '../../styles/globalStyles';
import styles from '../../styles/newSightingStyles';
import theme from '../../constants/theme';
import { View } from 'react-native';

export default function MultiSelectInput(rest) {
  const { name, schema, props, id } = rest;
  const { displayType } = rest;
  const type = (schema && schema.displayType) || displayType;
  const multiSelectOptions = schema.choices;
  const [selectedOptions, setSelectedOptions] = useState([]);
  const onSelectionsChange = (items) => {
    props.setFieldValue('customFields.MULTI_TEMP', items);
    const values = items.map((item) => item.value);
    props.setFieldValue(`customFields.${name}`, {
      Type: type,
      id,
      Value: values,
    });
    setSelectedOptions(items);
  };
  return (
    <View style={{ borderColor: theme.black, borderRadius: 10 }}>
      <SelectMultiple
        items={multiSelectOptions}
        selectedItems={props.values.customFields.MULTI_TEMP || selectedOptions}
        onSelectionsChange={onSelectionsChange}
        onBlur={props.handleBlur(`customFields.${name}`)}
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
