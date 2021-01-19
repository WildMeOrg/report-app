import React, { useState } from 'react';
import { Picker } from '@react-native-community/picker';
import globalStyles from '../../styles/globalStyles';
import styles from '../../styles/newSightingStyles';
import { View,TextInput } from 'react-native';

export default function FeetMetersInput(rest){
    const { name, schema, props } = rest;
    const [choice, setChoice] = useState();
    const [measurement,setMeasurement] = useState('0.0');

    return(
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                     <TextInput
                          style={[globalStyles.inputField,{width: '20%'}]}
                          textAlign={'right'}
                          keyboardType={'numeric'}
                          placeholder={'0.0'}
                          autoCorrect={false}
                          value={measurement.toString()}
                          onChangeText={(val) => setMeasurement(val)}
                        />
                      <Picker 
                        selectedValue={choice}
                        style={{height: 50, width: 125}}
                        onValueChange={(val) => setChoice(val)}>
                        <Picker.Item label={"Feet"} value={"Feet"} />
                        <Picker.Item label={"Meters"} value={"Meters"} />
                      </Picker>
                    </View>
    );
}