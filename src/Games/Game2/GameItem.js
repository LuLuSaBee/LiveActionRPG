import React from 'react';
import Styles from './Style';
import {View, Image, TouchableOpacity} from 'react-native';
import unknow from './Photo/unknow.jpg';

export default function GameItem(props) {
  const {photo, onPress} = props;

  if (photo.lock === false) {
    return (
      <TouchableOpacity onPress={() => onPress(photo.id)} activeOpacity={1}>
        <View key={photo.id} style={Styles.ImgView}>
          <Image style={Styles.image} key={photo.id} source={unknow} />
        </View>
      </TouchableOpacity>
    );
  } else if (photo.lock === true) {
    return (
      <TouchableOpacity onPress={() => onPress(photo.id)} activeOpacity={1}>
        <View key={photo.id} style={Styles.ImgView}>
          <Image style={Styles.image} key={photo.id} source={photo.url} />
        </View>
      </TouchableOpacity>
    );
  } else {
    return <View style={Styles.ImgView} />;
  }
}
