//component that returns a DateTimePicker based on the given schema
import { Text, View } from 'react-native';
import React, { useState } from 'react';
import { Icon } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import globalStyles from '../../styles/globalStyles';
import styles from '../../styles/newSightingStyles';
import Typography from '../../components/Typography';
import theme from '../../constants/theme';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function DateInput(rest) {
  const { name, schema, props } = rest;
  const { displayType } = rest;
  const type = (schema && schema.displayType) || displayType;
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const showMode = (currMode) => {
    if (show && mode === currMode) {
      setShow(false);
    } else {
      setShow(true);
    }
    setMode(currMode);
  };
  const showDatePicker = () => {
    showMode('date');
  };
  const showTimePicker = () => {
    showMode('time');
  };

  function formatDate(date) {
    var options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    if (props.values.customFields[name]) {
      return new Date(props.values.customFields[name].Value).toLocaleDateString(
        [],
        options
      );
    } else {
      return new Date(date).toLocaleDateString([], options);
    }
  }

  function formatTime(date) {
    var options = {
      hour: 'numeric',
      minute: 'numeric',
    };
    if (props.values.customFields[name]) {
      return new Date(date).toLocaleTimeString([], options);
    } else {
      return new Date(date).toLocaleTimeString([], options);
    }
  }
  const onChange = (event, selectedDate) => {
    const currDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    props.setFieldValue(`customFields.${name}`, {
      Type: type,
      Value: currDate,
    });
    setDate(currDate);
  };
  return (
    //TODO Typography
    <View>
      <View>
        <TouchableOpacity
          onPress={showDatePicker}
          style={[
            globalStyles.inputField,
            {
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: '2%',
            },
          ]}
        >
          <Text style={[globalStyles.basicText, { margin: '2%' }]}>
            {formatDate(date)}
          </Text>
          <View style={{ alignSelf: 'center' }}>
            <Icon name="today" type="material-icons" onPress={showDatePicker} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={showTimePicker}
          style={[
            globalStyles.inputField,
            { flexDirection: 'row', justifyContent: 'space-between' },
          ]}
        >
          <Text style={[globalStyles.basicText, { margin: '2%' }]}>
            {formatTime(date)}
          </Text>
          <View style={{ alignSelf: 'center' }}>
            <Icon
              name="schedule"
              type="material-icons"
              onPress={showTimePicker}
            />
          </View>
        </TouchableOpacity>
        {show && (
          <DateTimePicker
            style={{
              height: 80,
              flex: 1,
              marginHorizontal: '5%',
              alignItems: 'flex-start',
              paddingHorizontal: '20%',
            }}
            value={
              (props.values.customFields[name] &&
                props.values.customFields[name].Value) ||
              date
            }
            display="default"
            mode={mode}
            onBlur={props.handleBlur(`customFields.${name}`)}
            onChange={onChange}
          />
        )}
      </View>
    </View>
  );
}
