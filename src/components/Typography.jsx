import React from 'react';
import { Text } from 'react-native';
import { FormattedMessage } from 'react-intl';

export default function Typography({ id, style, required, ...rest }) {
  const defaultStyles = {
    fontFamily: 'Lato-Regular',
  };

  const mergedStyles = [defaultStyles];
  mergedStyles.push(style);

  return (
    <Text style={mergedStyles} {...rest}>
      <FormattedMessage id={id} />
      {required && ' * '}
    </Text>
  );
}
