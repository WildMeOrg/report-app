import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export default async function useAsyncStorage(itemKey) {
  const [item, setItem] = useState(null);
  await AsyncStorage.getItem(itemKey, (err, result) => {
    setItem(JSON.parse(result));
  });
  // useEffect(() => {
  //   AsyncStorage.getItem(itemKey, (err, result) => {
  //     setItem(JSON.parse(result));
  //   });
  // }, []);
  return item;
}

// const fetchLoggin = async () => {
//   let loggin = await AsyncStorage.getItem('loggedIn', (err, result) => {
//     return JSON.parse(result);
//   });
//   setFunctionLoggin(loggin);
// };
// fetchLoggin();
