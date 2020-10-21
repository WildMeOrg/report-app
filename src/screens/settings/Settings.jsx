import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import theme from '../../constants/theme';
import globalStyles from '../../styles/globalStyles';
import Typography from '../../components/Typography';

export default function Settings() {
  return (
    <View>
      <TouchableOpacity
        style={styles.settingRow}
        onPress={() => console.log('click')}
      >
        <Typography id="PROFILE" style={globalStyles.h2Text} />
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
        <Typography id="NOTIFICATIONS" style={globalStyles.h2Text} />
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
        <Typography id="PRIVACY" style={globalStyles.h2Text} />
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
        <Typography id="SECURITY" style={globalStyles.h2Text} />
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
        <Typography id="HELP" style={globalStyles.h2Text} />
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
        <Typography id="LOG_OUT" style={globalStyles.h2Text} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
