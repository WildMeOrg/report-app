import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
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
          <View style={styles.drawerListItem}>
            <Icon
              name="person"
              type="material-icons"
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
              name="list"
              type="material-icons"
              color={theme.black}
              iconStyle={styles.icon}
            />
            <Typography id="VIEW_SIGHTINGS" style={styles.drawerListText} />
          </View>
        )}
        onPress={() => props.navigation.navigate('Home')}
      />
      <DrawerItem
        label={() => (
          <View style={styles.drawerListItem}>
            <Icon
              name="add"
              type="material-icons"
              color={theme.black}
              iconStyle={styles.icon}
            />
            <Typography id="NEW_SIGHTING" style={styles.drawerListText} />
          </View>
        )}
        onPress={() => props.navigation.navigate('New Sighting')}
      />
      <DrawerItem
        label={() => (
          <View style={styles.drawerListItem}>
            <Icon
              name="settings"
              type="material-icons"
              color={theme.black}
              iconStyle={styles.icon}
            />
            <Typography id="SETTINGS" style={styles.drawerListText} />
          </View>
        )}
        onPress={() => props.navigation.navigate(screens.setings)}
      />
      <DrawerItem
        style={styles.drawerItem}
        label={() => (
          <View style={styles.drawerListItem}>
            <Icon
              name="book"
              type="material-icons"
              color={theme.black}
              iconStyle={styles.icon}
            />
            <Typography id="CHANGE_WILDBOOK" style={styles.drawerListText} />
          </View>
        )}
        onPress={() => [
          props.navigation.navigate(screens.selection, {
            screen: screens.selection,
            params: { loggedOut: false },
          }),
        ]}
      />
      <DrawerItem
        label={() => (
          <View style={styles.drawerListItem}>
            <Icon
              name="help-outline"
              type="material-icons"
              color={theme.black}
              iconStyle={styles.icon}
            />
            <Typography id="HELP" style={styles.drawerListText} />
          </View>
        )}
        //TODO THIS IS BROKE FOR SOME REASON
        onPress={() => props.navigation.navigate(screens.helpPage)}
      />
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
