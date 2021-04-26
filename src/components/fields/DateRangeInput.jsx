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
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function DateRangeInput(rest) {
  const { name, schema, props, id } = rest;
  const { displayType } = rest;
  const type = (schema && schema.displayType) || displayType;
  //start date constants
  const [dateStart, setDateStart] = useState(new Date());
  const [modeStart, setModeStart] = useState('date');
  const [showStart, setShowStart] = useState(false);
  //end date constants
  const [dateEnd, setDateEnd] = useState(new Date());
  const [modeEnd, setModeEnd] = useState('date');
  const [showEnd, setShowEnd] = useState(false);
  const showModeStart = (currMode) => {
    setShowEnd(false);
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
    props.setFieldValue(`customFields.${name}`, {
      Type: type,
      id,
      Value: [currDate, dateEnd],
    });
    setDateStart(currDate);
  };

  const showModeEnd = (currMode) => {
    setShowStart(false);
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
    props.setFieldValue(`customFields.${name}`, {
      Type: type,
      id,
      Value: [dateStart, currDate],
    });
    setDateEnd(currDate);
  };
  function formatDate(date, num) {
    var options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    if (
      props.values.customFields[name] &&
      props.values.customFields[name]['Value'][num]
    ) {
      return new Date(
        props.values.customFields[name]['Value'][num]
      ).toLocaleDateString({
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
      });
    } else {
      return new Date(date).toLocaleDateString({
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
      });
    }
  }
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: '3%',
        }}
      >
        <View>
          {/* <Text style={[globalStyles.subText, { fontSize: 14 }]}>
            Start date
          </Text> */}
          <TouchableOpacity
            onPress={showDatePickerStart}
            style={[
              globalStyles.inputField,
              { flexDirection: 'row', justifyContent: 'space-between' },
            ]}
          >
            <Text style={[globalStyles.basicText, { margin: '2%' }]}>
              {formatDate(dateStart)}
            </Text>
            <View style={{ alignSelf: 'center' }}>
              <Icon
                name="today"
                type="material-icons"
                onPress={showDatePickerStart}
              />
            </View>
          </TouchableOpacity>
        </View>
        <Text
          style={[globalStyles.h2Text, { fontSize: 16, alignSelf: 'center' }]}
        >
          to
        </Text>
        <View>
          {/* <Text style={[globalStyles.subText, { fontSize: 14 }]}>End date</Text> */}
          <TouchableOpacity
            onPress={showDatePickerEnd}
            style={[
              globalStyles.inputField,
              { flexDirection: 'row', justifyContent: 'space-between' },
            ]}
          >
            <Text style={[globalStyles.basicText, { margin: '2%' }]}>
              {formatDate(dateEnd)}
            </Text>
            <View style={{ alignSelf: 'center' }}>
              <Icon name="today" type="material-icons" />
            </View>
          </TouchableOpacity>
        </View>
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
                props.values.customFields[name]['Value'][0]) ||
              dateStart
            }
            display="default"
            mode={modeStart}
            onBlur={props.handleBlur(`customFields.${name}`)}
            onChange={onChangeStart}
          />
        )}
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
                props.values.customFields[name]['Value'][1]) ||
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
