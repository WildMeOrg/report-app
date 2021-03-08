import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import theme from '../../constants/theme';
import placeholderImage from '../../../assets/images/elephant.jpg';

export default function Sighting(props) {
  return (
    <View>
      <View style={cardElementStyles.sightingCard}>
        <Image style={cardElementStyles.imageCover} source={placeholderImage} />
        <View style={cardElementStyles.sightingInfo}>
          <View style={cardElementStyles.sightingText}>
            <Text style={cardElementStyles.sightingTitle}>
              {props.sighting.title}
            </Text>
            <Text style={cardElementStyles.sightingDate}>
              {props.sighting.location}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const cardElementStyles = StyleSheet.create({
  touchableOpacityHolder: {
    width: '95%',
  },
  sightingCard: {
    flexDirection: 'row',
    marginVertical: 7,
    width: '95%',
    height: 80,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#CCC',
    backgroundColor: 'white',
    borderRadius: 6,
    alignSelf: 'center',
    // iOS
    shadowColor: theme.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2.6,
    // Android
    elevation: 3,
  },
  sightingInfo: {
    paddingLeft: 22,
    paddingRight: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 2.5,
    alignItems: 'center',
  },
  sightingText: {
    justifyContent: 'space-around',
    height: 36,
  },
  imageCover: {
    resizeMode: 'cover',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    height: 78,
    flex: 1,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  sightingTitle: {
    fontSize: 18,
    fontFamily: 'Lato-Regular',
  },
  sightingDate: {
    fontSize: 12,
    fontFamily: 'Lato-Regular',
    color: '#777',
  },
});
