import React from 'react';
import {View} from 'react-native';

export default function InfoBox(props) {
  const {boxStyle, content} = props;
  return <View style={boxStyle}>{content}</View>;
}
