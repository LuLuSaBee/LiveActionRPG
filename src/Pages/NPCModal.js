import React, {useRef, useEffect, useState} from 'react';
import {Dimensions, View} from 'react-native';
import {Modalize} from 'react-native-modalize';
import NPCTitle from '../Views/NPCTitle';
import NPCImage from '../Views/NPCImage';
import NPCConversation from '../Views/NPCConversation';
import {defaultTheme} from '../data.source';

const screenHeight = Dimensions.get('screen').height;

export default function NPCModal(props) {
  //set basic info
  const [isGame, setIsGame] = useState(false);
  const [npcName, setNpcName] = useState('蒙娜麗莎');
  const [imgSource, setImgSource] = useState({
    uri:
      'https://upload.wikimedia.org/wikipedia/commons/7/7e/Walters_Gallery.jpg',
  });
  const [conversation, setConversation] = useState({
    dialogue:
      '謝謝你，你幫了我一個大忙，這樣我就不用冒著風險去賣畫了，我把畫放在修復室裡，真的是太謝謝你了。',
    options: [
      '我是來找遺失的蒙娜麗莎的',
      '沒事，我就只是路過看看你好不好',
      'ㄌㄩㄝ~~鬼臉，打我啊打我啊',
    ],
  });

  //set modal
  const modalizeRef = useRef(null);
  useEffect(() => {
    props.setModalizeRef(modalizeRef);
  });

  //views
  const dialogueView = [
    <NPCTitle key="title" name={npcName} />,
    <NPCImage key="image" img={imgSource} />,
    <NPCConversation key="option" conversation={conversation} />,
  ];
  const gameView = <View />;

  //render
  return (
    <Modalize
      ref={modalizeRef}
      snapPoint={screenHeight * 0.52}
      scrollViewProps={{
        showsVerticalScrollIndicator: false,
        stickyHeaderIndices: [0],
      }}
      modalStyle={{
        backgroundColor: defaultTheme.backgroundColor,
      }}>
      <View style={{height: screenHeight, flex: 1}}>
        {isGame ? gameView : dialogueView}
      </View>
    </Modalize>
  );
}
