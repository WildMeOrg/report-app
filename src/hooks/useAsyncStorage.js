import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export default async function useAsyncStorage(itemKey) {
  const [item, setItem] = useState(null);
  useEffect(() => {
    AsyncStorage.getItem(itemKey, (err, result) => {
      setItem(JSON.parse(result));
    });
  }, []);
  return item;
}
