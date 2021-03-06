import React from 'react';
import {Text, View} from 'react-native';

export default function InfoBox(props) {
  const {boxStyle} = props;
  return (
    <View style={boxStyle}>
      <Text>123456</Text>
    </View>
  );
}
