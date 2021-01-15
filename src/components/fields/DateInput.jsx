//component that returns a DateTimePicker based on the given schema 
import { Text, View } from 'react-native';
import React, {useState} from 'react';
import { Icon } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import globalStyles from '../../styles/globalStyles';
import styles from '../../styles/newSightingStyles';
import Typography from '../../components/Typography';

//TODO: this still needs to be tested and validation added
export default function DateInput(rest){
  const {name, schema, props} = rest;
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show,setShow] = useState(false);
  const showMode = (currMode) =>{
    setShow(true);
    setMode(currMode);
  };
  const showDatePicker = () => {
    showMode('date');
  };
  const showTimePicker = () =>{
    showMode('time');
  };

 function formatDate(date){
    var options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'};
    return new Date(date).toLocaleDateString([],options);
  }
  const onChange = (event,selectedDate) => {
    const currDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currDate);
    //console.log(formatDate(currDate));
  };
    return(
        //TODO Typography
        <View>
            <View style= {styles.horizontal}>
            <Text style={[globalStyles.h2Text, globalStyles.inputHeader]}>Date: {formatDate(date)}</Text>
                <Typography id="EDIT_DATE" style={styles.dtpText}/>
                <Icon name="today" type="material-icons" onPress={showDatePicker} raised={true} /> 
                <Typography id="EDIT_TIME" style={styles.dtpText}/>
                <Icon name="schedule" type="material-icons" onPress={showTimePicker} raised={true}/> 
                { show  && <DateTimePicker 
                value={date}
                display="default"
                mode={mode}
                onChange={onChange}
                />
                }
            </View>
          </View>
    );
}