//component that returns 2 DateTimePickers based on the given schema
import { Text, View } from 'react-native';
import React, { useState } from 'react';
import { Icon } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import globalStyles from '../../styles/globalStyles';
import styles from '../../styles/newSightingStyles';
import theme from '../../constants/theme';
import { onChange } from 'react-native-reanimated';
import Typography from '../../components/Typography';

export default function DateRangeInput(rest) {
  const { name, schema, props } = rest;
  //start date constants
  const [dateStart, setDateStart] = useState(new Date());
  const [modeStart, setModeStart] = useState('date');
  const [showStart, setShowStart] = useState(false);
  //end date constants
  const [dateEnd, setDateEnd] = useState(new Date());
  const [modeEnd, setModeEnd] = useState('date');
  const [showEnd, setShowEnd] = useState(false);
  const showModeStart = (currMode) => {
    if (showStart) {
      setShowStart(false);
    } else {
      setShowStart(true);
    }
    setModeStart(currMode);
  };
  const showDatePickerStart = () => {
    showModeStart('date');
  };
  const showTimePickerStart = () => {
    showModeStart('time');
  };
  const onChangeStart = (event, selectedDate) => {
    const currDate = selectedDate || dateStart;
    setShowStart(Platform.OS === 'ios');
    props.setFieldValue(`customFields.${name}`, [currDate, dateEnd]);
    setDateStart(currDate);
  };

  const showModeEnd = (currMode) => {
    if (showEnd) {
      setShowEnd(false);
    } else {
      setShowEnd(true);
    }
    setModeEnd(currMode);
  };
  const showDatePickerEnd = () => {
    showModeEnd('date');
  };
  const showTimePickerEnd = () => {
    showModeEnd('time');
  };
  const onChangeEnd = (event, selectedDate) => {
    const currDate = selectedDate || dateEnd;
    setShowEnd(Platform.OS === 'ios');
    props.setFieldValue(`customFields.${name}`, [dateStart, currDate]);
    setDateEnd(currDate);
  };
  function formatDate(date, num) {
    var options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
    if (
      props.values.customFields[name] &&
      props.values.customFields[name][num]
    ) {
      return new Date(props.values.customFields[name][num]).toLocaleDateString(
        [],
        options
      );
    } else {
      return new Date(date).toLocaleDateString([], options);
    }
  }
  return (
    <View>
      <Text style={[globalStyles.h2Text, globalStyles.inputHeader]}>
        Start Date: {formatDate(dateStart, 0)}
      </Text>
      <View style={styles.horizontal}>
        <Typography id="EDIT_DATE" style={styles.dtpText} />
        <Icon
          name="today"
          type="material-icons"
          onPress={showDatePickerStart}
          raised={true}
        />
        <Typography id="EDIT_TIME" style={styles.dtpText} />
        <Icon
          name="schedule"
          type="material-icons"
          onPress={showTimePickerStart}
          raised={true}
        />
      </View>
      <View
        style={{
          marginHorizontal: '5%',
        }}
      >
        {showStart && (
          <DateTimePicker
            style={{
              flex: 1,
              alignItems: 'flex-start',
              paddingHorizontal: '20%',
            }}
            value={
              (props.values.customFields[name] &&
                props.values.customFields[name][0]) ||
              dateStart
            }
            display="default"
            mode={modeStart}
            onBlur={props.handleBlur(`customFields.${name}`)}
            onChange={onChangeStart}
          />
        )}
      </View>
      <Text style={[globalStyles.h2Text, globalStyles.inputHeader]}>
        End Date: {formatDate(dateEnd, 1)}
      </Text>
      <View style={styles.horizontal}>
        <Typography id="EDIT_DATE" style={styles.dtpText} />
        <Icon
          name="today"
          type="material-icons"
          onPress={showDatePickerEnd}
          raised={true}
        />
        <Typography id="EDIT_TIME" style={styles.dtpText} />
        <Icon
          name="schedule"
          type="material-icons"
          onPress={showTimePickerEnd}
          raised={true}
        />
      </View>
      <View
        style={{
          marginHorizontal: '5%',
          justifyContent: 'center',
        }}
      >
        {showEnd && (
          <DateTimePicker
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'flex-start',
              paddingHorizontal: '20%',
            }}
            value={
              (props.values.customFields[name] &&
                props.values.customFields[name][1]) ||
              dateEnd
            }
            display="default"
            mode={modeEnd}
            onBlur={props.handleBlur(`customFields.${name}`)}
            onChange={onChangeEnd}
          />
        )}
      </View>
    </View>
  );
}
