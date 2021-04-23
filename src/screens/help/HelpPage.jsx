import React from 'react';
import { TouchableOpacity, ScrollView, View, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import screens from '../../constants/screens';
import theme from '../../constants/theme';
import globalStyles from '../../styles/globalStyles';
import Typography from '../../components/Typography';

const HelpPage = ({ navigation }) => {
  return (
    <View style={styles.content}>
      <ScrollView style={{ flex: 1 }}>
        <Typography
          id="HOW_TO_USE"
          style={[globalStyles.basicText, styles.headerText]}
        />
        <TouchableOpacity
          style={styles.helpRow}
          onPress={() => navigation.navigate(screens.helpAddSighting)}
        >
          <Typography id="HOW_TO_ADD_SIGHTING" style={globalStyles.h2Text} />
          <Icon
            name="chevron-right"
            type="material-icons"
            color={theme.black}
            onPress={() => navigation.navigate(screens.helpAddSighting)}
            iconStyle={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.helpRow}
          onPress={() => navigation.navigate(screens.helpChangeWildbook)}
        >
          <Typography
            id="HOW_TO_CHANGE_WILDBOOKS"
            style={globalStyles.h2Text}
          />
          <Icon
            name="chevron-right"
            type="material-icons"
            color={theme.black}
            onPress={() => navigation.navigate(screens.helpChangeWildbook)}
            iconStyle={styles.icon}
          />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  image: {
    flex: 1,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  content: {
    flex: 1,
    height: '100%',
    backgroundColor: theme.white,
  },
  infoText: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
  },
  headerText: {
    color: '#2c2c2c',
    fontFamily: 'Lato-Regular',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 15,
    marginLeft: 20,
  },
  icon: {
    marginLeft: 16,
  },
  helpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 36,
    marginRight: 24,
    marginVertical: 12,
  },
  helpText: {
    fontSize: 16,
    color: theme.black,
  },
  helpRowBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 36,
    marginRight: 24,
    marginVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#2C2C2C',
    paddingBottom: 16,
  },
});
export default HelpPage;
