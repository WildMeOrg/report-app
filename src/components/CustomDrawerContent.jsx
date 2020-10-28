import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { Icon } from 'react-native-elements';
import screens from '../constants/screens';
import theme from '../constants/theme';
import Typography from './Typography';

export default function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        style={styles.drawerItemEnd}
        label={() => (
          <View style={styles.drawerHeaderItem}>
            <Icon
              name="user"
              type="antdesign"
              color={theme.black}
              iconStyle={styles.icon}
            />
            {/* Later we will use Redux to store get te users name */}
            <Text style={styles.drawerHeaderName}>Joe Schmoe</Text>
          </View>
        )}
        onPress={() => props.navigation.navigate(screens.profile)}
      />
      <DrawerItem
        label={() => (
          <View style={styles.drawerListItem}>
            <Icon
              name="plus"
              type="antdesign"
              color={theme.black}
              iconStyle={styles.icon}
            />
            <Typography id="NEW_SIGHTING" style={styles.drawerListText} />
          </View>
        )}
        onPress={() => props.navigation.navigate(screens.newSighting)}
      />
      <DrawerItem
        label={() => (
          <View style={styles.drawerListItem}>
            <Icon
              name="setting"
              type="antdesign"
              color={theme.black}
              iconStyle={styles.icon}
            />
            <Typography id="SETTINGS" style={styles.drawerListText} />
          </View>
        )}
        onPress={() => props.navigation.navigate(screens.setings)}
      />
      <DrawerItem
        style={styles.drawerItemEnd}
        label={() => (
          <View style={styles.drawerListItem}>
            <Icon
              name="questioncircleo"
              type="antdesign"
              color={theme.black}
              iconStyle={styles.icon}
            />
            <Typography id="HELP" style={styles.drawerListText} />
          </View>
        )}
      />
      <DrawerItem
        style={styles.drawerItem}
        label={() => (
          <View style={styles.drawerListItem}>
            <Typography id="LOG_OUT" style={styles.drawerListText} />
          </View>
        )}
        onPress={() => props.navigation.navigate(screens.login)}
      />
      {/* Until all screens are linked together this allow us to go to each screen */}
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerItemEnd: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#2C2C2C',
  },
  drawerHeaderItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  drawerHeaderName: {
    marginLeft: 16,
    fontSize: 18,
    fontFamily: 'Lato-Regular',
  },
  drawerListItem: { flexDirection: 'row', alignItems: 'center' },
  drawerListText: { marginLeft: 16, fontSize: 14 },
});
