import { Text, View } from 'react-native';
import React, { useState } from 'react';
import { TextInput } from 'react-native';
import globalStyles from '../../styles/globalStyles';
import styles from '../../styles/newSightingStyles';
import { get } from 'lodash-es';
import theme from '../../constants/theme';

export default function AreaInput(rest) {
  const { name, schema, props, id } = rest;
  const [north, setNorth] = useState(null);
  const [east, setEast] = useState(null);
  const [south, setSouth] = useState(null);
  const [west, setWest] = useState(null);
  const { displayType } = rest;
  const type = (schema && schema.displayType) || displayType;
  //TODO test
  return (
    <View>
      <View
        style={[
          {
            flexDirection: 'row',
            justifyContent: 'center',
          },
        ]}
      >
        <View
          style={{
            flexDirection: 'column',
            flex: 1,
            justifyContent: 'space-around',
            marginLeft: '5%',
          }}
        >
          <Text
            style={[
              globalStyles.h2Text,
              globalStyles.inputHeader,
              { fontSize: 16 },
            ]}
          >
            North:
          </Text>
          <Text
            style={[
              globalStyles.h2Text,
              globalStyles.inputHeader,
              { fontSize: 16 },
            ]}
          >
            South:
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'column',
            flex: 1,
            marginRight: '5%',
          }}
        >
          <TextInput
            style={[
              globalStyles.inputField,
              { flex: 1, padding: 10, width: '90%' },
            ]}
            keyboardType={'numeric'}
            placeholder={'0.0'}
            autoCorrect={false}
            value={
              get(
                props,
                ['values', 'customFields', name, 'Value', 'north'],
                ''
              ) || north
            }
            onChangeText={(val) => {
              [
                setNorth(val),
                props.setFieldValue(`customFields.${name}`, {
                  Type: type,
                  id,
                  Value: {
                    north: val,
                    east: east,
                    south: south,
                    west: west,
                  },
                }),
              ];
            }}
            onBlur={props.handleBlur(`customFields.${name}`)}
          />
          <TextInput
            style={[
              globalStyles.inputField,
              { flex: 1, padding: 10, width: '90%' },
            ]}
            keyboardType={'numeric'}
            placeholder={'0.0'}
            autoCorrect={false}
            value={
              get(
                props,
                ['values', 'customFields', name, 'Value', 'south'],
                ''
              ) || south
            }
            onChangeText={(val) => {
              [
                setSouth(val),
                props.setFieldValue(`customFields.${name}`, {
                  Type: type,
                  id,
                  Value: {
                    north: north,
                    east: east,
                    south: val,
                    west: west,
                  },
                }),
              ];
            }}
            onBlur={props.handleBlur(`customFields.${name}`)}
          />
        </View>
        <View
          style={{
            flexDirection: 'column',
            flex: 1,
            justifyContent: 'space-around',
            marginLeft: '5%',
          }}
        >
          <Text
            style={[
              globalStyles.h2Text,
              globalStyles.inputHeader,
              { fontSize: 16 },
            ]}
          >
            East:
          </Text>
          <Text
            style={[
              globalStyles.h2Text,
              globalStyles.inputHeader,
              { fontSize: 16 },
            ]}
          >
            West:
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'column',
            flex: 1,
            marginRight: '5%',
          }}
        >
          <TextInput
            style={[
              globalStyles.inputField,
              { flex: 1, padding: 10, width: '90%' },
            ]}
            keyboardType={'numeric'}
            placeholder={'0.0'}
            autoCorrect={false}
            value={
              get(
                props,
                ['values', 'customFields', name, 'Value', 'east'],
                ''
              ) || east
            }
            onChangeText={(val) => {
              [
                setEast(val),
                props.setFieldValue(`customFields.${name}`, {
                  Type: type,
                  id,
                  Value: {
                    north: north,
                    east: val,
                    south: south,
                    west: west,
                  },
                }),
              ];
            }}
            onBlur={props.handleBlur(`customFields.${name}`)}
          />
          <TextInput
            style={[
              globalStyles.inputField,
              { flex: 1, padding: 10, width: '90%' },
            ]}
            keyboardType={'numeric'}
            placeholder={'0.0'}
            autoCorrect={false}
            value={
              get(
                props,
                ['values', 'customFields', name, 'Value', 'west'],
                ''
              ) || west
            }
            onChangeText={(val) => {
              [
                setWest(val),
                props.setFieldValue(`customFields.${name}`, {
                  Type: type,
                  id,
                  Value: {
                    north: north,
                    east: east,
                    south: south,
                    west: val,
                  },
                }),
              ];
            }}
            onBlur={props.handleBlur(`customFields.${name}`)}
          />
        </View>
      </View>
    </View>
  );
}
