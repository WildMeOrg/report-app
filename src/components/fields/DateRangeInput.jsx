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

//TODO: this still needs to be tested and validated
export default function DateRangeInput(rest) {
  const { name, schema, props } = rest;
  //start date constants
  const [dateStart, setDateStart] = useState(new Date());
  const [modeStart, setModeStart] = useState('date');
  const [showStart, setShowStart] = useState(false);
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
    setDateStart(currDate);
  };
  //end date constants
  const [dateEnd, setDateEnd] = useState(new Date());
  const [modeEnd, setModeEnd] = useState('date');
  const [showEnd, setShowEnd] = useState(false);
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
    setDateEnd(currDate);
  };
  function formatDate(date) {
    var options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
    return new Date(date).toLocaleDateString([], options);
  }
  return (
    <View>
      <Text style={[globalStyles.h2Text, globalStyles.inputHeader]}>
        Start Date: {formatDate(dateStart)}
      </Text>
      <View style={styles.horizontal}>
        <Typography id="EDIT_DATE" style={styles.dtpText}/>
        <Icon
          name="today"
          type="material-icons"
          onPress={showDatePickerStart}
          raised={true}
        />
        <Typography id="EDIT_TIME" style={styles.dtpText}/>
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
          //alignItems: 'center',
          // borderColor: theme.black,
          // borderWidth: 1,
          // borderRadius: 6,
        }}
      >
        {showStart && (
          <DateTimePicker
            style={{
              flex: 1,
              //justifyContent: 'center',
              alignItems: 'flex-start',
              paddingHorizontal: '20%',
              // borderColor: theme.red,
              // borderWidth: 1,
              // borderRadius: 6,
            }}
            value={dateStart}
            display="default"
            mode={modeStart}
            onChange={onChangeStart}
          />
        )}
      </View>
      <Text style={[globalStyles.h2Text, globalStyles.inputHeader]}>
        End Date: {formatDate(dateEnd)}
      </Text>
      <View style={styles.horizontal}>
        <Typography id="EDIT_DATE" style={styles.dtpText}/>
        <Icon
          name="today"
          type="material-icons"
          onPress={showDatePickerEnd}
          raised={true}
        />
        <Typography id="EDIT_TIME" style={styles.dtpText}/>
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
          //alignItems: 'center',
          // borderColor: theme.black,
          // borderWidth: 1,
          // borderRadius: 6,
        }}
      >
        {showEnd && (
          <DateTimePicker
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'flex-start',
              paddingHorizontal: '20%',
              // borderColor: theme.red,
              // borderWidth: 1,
              // borderRadius: 6,
            }}
            value={dateEnd}
            display="default"
            mode={modeEnd}
            onChange={onChangeEnd}
          />
        )}
      </View>
    </View>
  );
}
