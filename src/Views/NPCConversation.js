import React from 'react';
import {View, Text} from 'react-native';
import Styles from '../Styles/NPCConversation.style';
import Button from './Elements/Button';

export default function NPCConversation(props) {
  const {dialogue, options} = props.conversation;

  return (
    <View style={Styles.container} key="option">
      <View style={Styles.dialogueView}>
        <Text style={Styles.dialogueText}>{dialogue}</Text>
      </View>
      <View style={Styles.optionView}>
        {options.map((option, index) => (
          <Button
            key={index}
            text={option}
            style={Styles.optionButton}
            textStyle={Styles.optionText}
            onPress={() => console.log('click')}
          />
        ))}
      </View>
    </View>
  );
}
