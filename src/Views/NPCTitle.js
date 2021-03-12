import React from 'react';
import {View, Text} from 'react-native';
import Styles from '../Styles/NPCTitle.style';

export default function NPCTitle(props) {
  const {name} = props;
  return (
    <View style={Styles.container}>
      <Text style={Styles.text}>《{name}》</Text>
    </View>
  );
}
