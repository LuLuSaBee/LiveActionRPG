import React from 'react';
import {Image, Text, View} from 'react-native';
import {itemsData} from '../data.source';
import Styles from '../Styles/ItemPreview.style';
import Button from './Elements/Button';

export default function ItemPreview(props) {
  const {previewItem, openItem} = props;
  const data = itemsData[previewItem];
  return (
    <View style={Styles.box}>
      <View style={Styles.container}>
        <View style={Styles.imageView}>
          <Image style={Styles.image} source={data.img} />
        </View>
        <View style={Styles.nameView}>
          <Text style={Styles.nameText}>{data.name}</Text>
        </View>
      </View>
      <View style={Styles.descriptionView}>
        <Text style={Styles.descriptionText}>{data.description}</Text>
      </View>
      <View style={Styles.btnView}>
        {data.buttonType !== null ? (
          <Button
            text={'開啟'}
            onPress={openItem[previewItem]}
            style={Styles.button}
            textStyle={Styles.buttonText}
          />
        ) : (
          <View />
        )}
      </View>
    </View>
  );
}
