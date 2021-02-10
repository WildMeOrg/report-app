import React, { useEffect,  useState } from 'react'
import { ActivityIndicator, View, Text, ScrollView } from 'react-native';
import { Button, CheckBox } from 'react-native-elements';
import Sighting from './Sighting'
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from '@react-native-community/netinfo';


export default function localSightings() {

    const [storedSightings,  setStoredSightings] = useState([]);
    const [isSyncing, setIsSyncing] = useState(false)

    const syncSighting = () => {
      setIsSyncing(true);
      setTimeout(() => (NetInfo.fetch().then((state) => {
        if (state.isInternetReachable) {
          alert(
            `Sent ${storedSightings.length} locally saved sighting(s) to the server`
          );
        } else {
          alert('No Internet');
        }
        setIsSyncing(false);
      })), 5000)
      
    }



    useEffect(() => {
      AsyncStorage.getItem('SightingSubmissions', (err, result) => {
        result != null ? setStoredSightings(JSON.parse(result)) : null
      });
    }, []);

    console.log(storedSightings);
    return (
        <View style={{flex: 1}} >
          <ScrollView style = {{ flex: 1}}>
            {storedSightings.length != 0 ? storedSightings.map((sighting, index) => <Sighting sighting={sighting} key={index} sightingIndex={index} />) : <Text> There are currently no stighting stores locally on the device.</Text>}
          </ScrollView>
         <View>
            <Button
              title="Sync"
              onPress = {() => syncSighting()}
              loading = {isSyncing}
              disabled = {isSyncing}
            />
         </View>
        </View>
    )
}