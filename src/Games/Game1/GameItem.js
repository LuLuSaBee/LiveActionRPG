import React from 'react';
import {Image, View, TouchableOpacity} from 'react-native';
import Styles from './Styles';

export default function GameItem(props) {
  const {photo, onPress} = props;
  if (photo.gap === false && photo.move) {
    return (
      <TouchableOpacity onPress={() => onPress(photo.id)} activeOpacity={1}>
        <View key={photo.id}>
          <Image style={Styles.ImgView} key={photo.id} source={photo.url} />
        </View>
      </TouchableOpacity>
    );
  } else if (photo.gap === false) {
    return (
      <TouchableOpacity activeOpacity={1}>
        <View key={photo.id}>
          <Image style={Styles.ImgView} key={photo.id} source={photo.url} />
        </View>
      </TouchableOpacity>
    );
  } else {
    return <View style={Styles.ImgView} key={photo.id} />;
  }
}
