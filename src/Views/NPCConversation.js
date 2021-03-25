import React from 'react';
import {View, Text} from 'react-native';
import Styles from '../Styles/NPCConversation.style';
import Button from './Elements/Button';
import {playBtnClickMedia} from '../utils/musicPlayer';

export default function NPCConversation(props) {
  const {line, options, onPress} = props.conversation;

  return (
    <View style={Styles.container}>
      <View style={Styles.lineView}>
        <Text style={Styles.lineText}>{line}</Text>
      </View>
      <View style={Styles.optionView}>
        {options === undefined ? (
          <View />
        ) : (
          options.map((option, index) => (
            <Button
              key={index}
              text={option}
              style={Styles.optionButton}
              textStyle={Styles.optionText}
              onPress={() => {
                onPress === undefined ? console.log('click') : onPress(index);
                playBtnClickMedia();
              }}
            />
          ))
        )}
      </View>
    </View>
  );
}
