import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import theme from '../../constants/theme';

export default function Settings() {
  return (
    <View>
      <TouchableOpacity
        style={styles.settingRow}
        onPress={() => console.log('click')}
      >
        <Text style={styles.settingText}>Profile</Text>
        <Icon
          name="chevron-right"
          type="font-awesome"
          color={theme.black}
          onPress={() => navigation.toggleDrawer()}
          iconStyle={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.settingRow}
        onPress={() => console.log('click')}
      >
        <Text style={styles.settingText}>Notifications</Text>
        <Icon
          name="chevron-right"
          type="font-awesome"
          color={theme.black}
          onPress={() => navigation.toggleDrawer()}
          iconStyle={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.settingRow}
        onPress={() => console.log('click')}
      >
        <Text style={styles.settingText}>Privacy</Text>
        <Icon
          name="chevron-right"
          type="font-awesome"
          color={theme.black}
          onPress={() => navigation.toggleDrawer()}
          iconStyle={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.settingRow}
        onPress={() => console.log('click')}
      >
        <Text style={styles.settingText}>Security</Text>
        <Icon
          name="chevron-right"
          type="font-awesome"
          color={theme.black}
          onPress={() => navigation.toggleDrawer()}
          iconStyle={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.settingRowBottom}
        onPress={() => console.log('click')}
      >
        <Text style={styles.settingText}>Help</Text>
        <Icon
          name="chevron-right"
          type="font-awesome"
          color={theme.black}
          onPress={() => navigation.toggleDrawer()}
          iconStyle={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.settingRow}
        onPress={() => console.log('click')}
      >
        <Text style={styles.settingText}>Log Out</Text>
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
