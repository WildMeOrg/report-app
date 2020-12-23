//component that returns 2 DateTimePickers based on the given schema 
import React, {Fragment} from 'react';
import { Icon } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import globalStyles from '../../styles/globalStyles';
import styles from '../../styles/newSightingStyles';

export default function DateRangeInput(rest){
    const {name,schema,props} = rest;
    //start date constants 
    const [dateStart, setDateStart] = useState(new Date());
    const [modeStart, setModeStart] = useState('date');
    const [showStart,setShowStart] = useState(false);
    const showModeStart = (currMode) =>{
        setShowStart(true);
        setModeStart(currMode);
      };
      const showDatePickerStart = () => {
        showModeStart('date');
      };
      const showTimePickerStart = () =>{
        showModeStart('time');
      };
      const onChangeStart = (event,selectedDate) => {
        const currDate = selectedDate || dateStart;
        setShowStart(Platform.OS === 'ios');
        setDateStart(currDate);
      };
    //end date constants 
    const [dateEnd, setDateEnd] = useState(new Date());
    const [modeEnd, setModeEnd] = useState('date');
    const [showEnd,setShowEnd] = useState(false);
    const showModeEnd = (currMode) =>{
        setShowEnd(true);
        setModeEnd(currMode);
      };
      const showDatePickerEnd = () => {
        showModeEnd('date');
      };
      const showTimePickerEnd = () =>{
        showModeEnd('time');
      };
      const onChangeEnd = (event,selectedDate) => {
        const currDate = selectedDate || dateEnd;
        setShowEnd(Platform.OS === 'ios');
        setDateEnd(currDate);
      };
      return(
          <Fragment>
               <Text style={[globalStyles.h2Text, globalStyles.inputHeader]}>Start Date: {formatDate(dateStart)}</Text>
                    <View style = {styles.horizontal}>
                      <Text style={styles.dtpText}>Edit Date:</Text>
                      <Icon name="today" type="material-icons" onPress={showDatePickerStart} raised={true} /> 
                      <Text style={styles.dtpText}>Edit Time:</Text>
                      <Icon name="schedule" type="material-icons" onPress={showTimePickerStart} raised={true}/> 
                      { showStart  && <DateTimePicker 
                      value={dateStart}
                      display="default"
                      mode={modeStart}
                      onChange={onChangeStart}
                      />
                      }
                    </View>
                    <Text style={[globalStyles.h2Text, globalStyles.inputHeader]}>End Date: {formatDate(dateEnd)}</Text>
                    <View style = {styles.horizontal}>
                      <Text style={styles.dtpText}>Edit Date:</Text>
                      <Icon name="today" type="material-icons" onPress={showDatePickerEnd} raised={true} /> 
                      <Text style={styles.dtpText}>Edit Time:</Text>
                      <Icon name="schedule" type="material-icons" onPress={showTimePickerEnd} raised={true}/> 
                      { showEnd  && <DateTimePicker 
                      value={dateEnd}
                      display="default"
                      mode={modeEnd}
                      onChange={onChangeEnd}
                      />
                      }
                    </View>
          </Fragment>
      );
}