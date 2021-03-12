import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

export default function Button(props) {
  const {text, style, onPress, textStyle} = props;
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <Text style={textStyle}>{text}</Text>
    </TouchableOpacity>
  );
}
