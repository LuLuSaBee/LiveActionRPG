import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import Styles from '../Styles/BagView.style';
import {itemsData} from '../data.source';

export default function BagView(props) {
  const {backpackItem, onPress, previewItem} = props;
  var newBagView = [];
  for (let index = 0; index < 16; index++) {
    if (index >= backpackItem.length) {
      newBagView.push(<View key={index} style={Styles.itemContainer}></View>);
    } else {
      newBagView.push(
        <TouchableOpacity
          key={backpackItem[index]}
          style={[
            Styles.itemContainer,
            previewItem === backpackItem[index] ? Styles.isChosed : {},
          ]}
          onPress={() => onPress(backpackItem[index])}>
          <Image
            style={Styles.itemImage}
            source={itemsData[backpackItem[index]].img}
          />
        </TouchableOpacity>,
      );
    }
  }

  return newBagView;
}
