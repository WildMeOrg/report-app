import { NativeModules } from 'react-native';
import { get } from 'lodash-es';

const localeMap = {
  'en_US': 'en',
}

export default function getLocale() {
  let systemLocale = get(NativeModules, ['SettingsManager', 'settings', 'AppleLocale'])
  if (!systemLocale) systemLocale = get(NativeModules, ['SettingsManager', 'settings', 'AppleLanguages', '0'])
  if (!systemLocale) systemLocale = get(NativeModules, ['I18nManager', 'localeIdentifier'])

  return get(localeMap, systemLocale, systemLocale);
}