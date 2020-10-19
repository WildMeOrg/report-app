import React from 'react';
import { Text } from 'react-native';
import { FormattedMessage } from 'react-intl';

export default function Typography({ id, style, ...rest }) {
  const defaultStyles = {
    fontFamily: 'Lato-Regular'
  }

  const mergedStyles = {...defaultStyles, ...style}

  return (
    <Text style={mergedStyles} {...rest} ><FormattedMessage id={id} /></Text>
  )
}
