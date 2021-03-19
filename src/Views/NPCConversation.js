import React from 'react';
import {View, Text} from 'react-native';
import Styles from '../Styles/NPCConversation.style';
import Button from './Elements/Button';

export default function NPCConversation(props) {
  const {lines, options, onPress} = props.conversation;

  return (
    <View style={Styles.container}>
      <View style={Styles.lineView}>
        <Text style={Styles.lineText}>{lines}</Text>
      </View>
      <View style={Styles.optionView}>
        {options.map((option, index) => (
          <Button
            key={index}
            text={option}
            style={Styles.optionButton}
            textStyle={Styles.optionText}
            onPress={() =>
              onPress === undefined ? console.log('click') : onPress()
            }
          />
        ))}
      </View>
    </View>
  );
}
