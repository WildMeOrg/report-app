import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import Sighting from './Sighting';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from '@react-native-community/netinfo';
import useAsyncStorage from '../../hooks/useAsyncStorage';

export default function localSightings() {
  const storedSightings = useAsyncStorage('SightingSubmissions');
  const [isSyncing, setIsSyncing] = useState(false);

  const syncSighting = () => {
    setIsSyncing(true);
    setTimeout(
      () =>
        NetInfo.fetch().then((state) => {
          if (state.isInternetReachable) {
            alert(
              `Sent ${storedSightings.length} locally saved sighting(s) to the server`
            );
            AsyncStorage.removeItem('SightingSubmissions');
          } else {
            alert('No Internet, try again later.');
          }
          setIsSyncing(false);
        }),
      5000
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        {storedSightings !== null ? (
          storedSightings.map((sighting, index) => (
            <Sighting sighting={sighting} key={index} sightingIndex={index} />
          ))
        ) : (
          <Text>
            {' '}
            There are currently no sightings stored locally on the device.
          </Text>
        )}
      </ScrollView>
      <View>
        <Button
          title="Sync"
          onPress={() => syncSighting()}
          loading={isSyncing}
          disabled={isSyncing}
        />
      </View>
    </View>
  );
}
