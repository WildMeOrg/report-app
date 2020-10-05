import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import theme from '../../constants/theme';
import globalStyles from '../../styles/globalStyles';

export default function Settings() {
  return (
    <View>
      <TouchableOpacity
        style={styles.settingRow}
        onPress={() => console.log('click')}
      >
        <Text style={globalStyles.h2Text}>Profile</Text>
        <Icon
          name='chevron-right'
          type='font-awesome'
          color={theme.black}
          onPress={() => navigation.toggleDrawer()}
          iconStyle={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.settingRow}
        onPress={() => console.log('click')}
      >
        <Text style={globalStyles.h2Text}>Notifications</Text>
        <Icon
          name='chevron-right'
          type='font-awesome'
          color={theme.black}
          onPress={() => navigation.toggleDrawer()}
          iconStyle={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.settingRow}
        onPress={() => console.log('click')}
      >
        <Text style={globalStyles.h2Text}>Privacy</Text>
        <Icon
          name='chevron-right'
          type='font-awesome'
          color={theme.black}
          onPress={() => navigation.toggleDrawer()}
          iconStyle={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.settingRow}
        onPress={() => console.log('click')}
      >
        <Text style={globalStyles.h2Text}>Security</Text>
        <Icon
          name='chevron-right'
          type='font-awesome'
          color={theme.black}
          onPress={() => navigation.toggleDrawer()}
          iconStyle={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.settingRowBottom}
        onPress={() => console.log('click')}
      >
        <Text style={globalStyles.h2Text}>Help</Text>
        <Icon
          name='chevron-right'
          type='font-awesome'
          color={theme.black}
          onPress={() => navigation.toggleDrawer()}
          iconStyle={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.settingRow}
        onPress={() => console.log('click')}
      >
        <Text style={globalStyles.h2Text}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  headerText: {
    fontFamily: 'Lato-Regular',
    fontSize: 14,
  },
  icon: {
    marginLeft: 16,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 24,
    marginVertical: 12,
  },
  settingText: {
    fontFamily: 'Lato-Regular',
    fontSize: 16,
    color: theme.black,
  },
  settingRowBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 24,
    marginVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#2C2C2C',
    paddingBottom: 16,
  },
});
