import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

export default function Button(props) {
  const {text, style, onPress} = props;
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <Text>{text}</Text>
    </TouchableOpacity>
  );
}
