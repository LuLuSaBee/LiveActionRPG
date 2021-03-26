import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

export default function Button(props) {
  const {text, style, onPress, textStyle, ...other} = props;
  return (
    <TouchableOpacity style={style} onPress={onPress} {...other}>
      <Text style={textStyle}>{text}</Text>
    </TouchableOpacity>
  );
}
