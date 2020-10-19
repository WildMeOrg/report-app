import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { Icon } from 'react-native-elements';
import screens from '../constants/screens';
import theme from '../constants/theme';

export default function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        style={styles.drawerItemEnd}
        label={() => (
          <View style={styles.drawerHeaderItem}>
            <Icon
              name="user"
              type="font-awesome"
              color={theme.black}
              iconStyle={styles.icon}
            />
            {/* Later we will use Redux to store get te users name */}
            <Text style={styles.drawerHeaderName}>Joe Schmoe</Text>
          </View>
        )}
      />
      <DrawerItem
        label={() => (
          <View style={styles.drawerListItem}>
            <Icon
              name="plus"
              type="font-awesome"
              color={theme.black}
              iconStyle={styles.icon}
            />
            <Text style={styles.drawerListText}>New Sighting</Text>
          </View>
        )}
        onPress={() => props.navigation.navigate(screens.newSightings[0])}
      />
      <DrawerItem
        label={() => (
          <View style={styles.drawerListItem}>
            <Icon
              name="cog"
              type="font-awesome"
              color={theme.black}
              iconStyle={styles.icon}
            />
            <Text style={styles.drawerListText}>Settings</Text>
          </View>
        )}
        onPress={() => props.navigation.navigate(screens.setings)}
      />
      <DrawerItem
        style={styles.drawerItemEnd}
        label={() => (
          <View style={styles.drawerListItem}>
            <Icon
              name="question-circle"
              type="font-awesome"
              color={theme.black}
              iconStyle={styles.icon}
            />
            <Text style={styles.drawerListText}>Help</Text>
          </View>
        )}
      />
      <DrawerItem
        style={styles.drawerItem}
        label={() => (
          <View style={styles.drawerListItem}>
            <Text style={styles.drawerListText}>Log Out</Text>
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
  drawerListText: { marginLeft: 16, fontSize: 14, fontFamily: 'Lato-Regular' },
});
