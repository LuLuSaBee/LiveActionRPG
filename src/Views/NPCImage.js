import React from 'react';
import {ImageBackground} from 'react-native';
import Styles from '../Styles/NPCImage.style';

export default function NPCImage(props) {
  return (
    <ImageBackground
      style={[Styles.container, Styles.view]}
      imageStyle={[Styles.image, Styles.view]}
      source={props.img}
    />
  );
}
