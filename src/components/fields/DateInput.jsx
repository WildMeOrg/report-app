//component that returns a DateTimePicker based on the given schema
import { Text, View } from 'react-native';
import React, { useState } from 'react';
import { Icon } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import globalStyles from '../../styles/globalStyles';
import styles from '../../styles/newSightingStyles';
import Typography from '../../components/Typography';

//TODO: this still needs to be tested and validation added
export default function DateInput(rest) {
  const { name, schema, props } = rest;
  // console.log(props);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const showMode = (currMode) => {
    if (show) {
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
      hour: 'numeric',
      minute: 'numeric',
    };
    if (props.values.customFields[name]) {
      return new Date(props.values.customFields[name]).toLocaleDateString(
        [],
        options
      );
    } else {
      return new Date(date).toLocaleDateString([], options);
    }
  }
  const onChange = (event, selectedDate) => {
    const currDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    props.setFieldValue(`customFields.${name}`, currDate);
    //setDate(props.values.customFields[name]);
    setDate(currDate);
    //console.log(formatDate(currDate));
  };
  return (
    //TODO Typography
    <View>
      <View>
        <Text style={[globalStyles.h2Text, globalStyles.inputHeader]}>
          Date: {formatDate(date)}
        </Text>
        <View style={[styles.horizontal]}>
          <Typography id="EDIT_DATE" style={styles.dtpText} />
          <Icon
            name="today"
            type="material-icons"
            onPress={showDatePicker}
            raised={true}
          />
          <Typography id="EDIT_TIME" style={styles.dtpText} />
          <Icon
            name="schedule"
            type="material-icons"
            onPress={showTimePicker}
            raised={true}
          />
        </View>
        {show && (
          <DateTimePicker
            style={{
              height: 80,
              flex: 1,
              marginHorizontal: '5%',
              alignItems: 'flex-start',
              paddingHorizontal: '20%',
            }}
            value={props.values.customFields[name] || date}
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
