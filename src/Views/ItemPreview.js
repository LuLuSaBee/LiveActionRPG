import React from 'react';
import {Image, Text, View} from 'react-native';
import {itemsData, videoData} from '../data.source';
import Styles from '../Styles/ItemPreview.style';
import Button from './Elements/Button';
import Video from 'react-native-video';

export default function ItemPreview(props) {
  const {previewItem, openItem} = props;
  const data = itemsData[previewItem];

  return (
    <View style={Styles.box}>
      <View key="title" style={Styles.container}>
        {data.buttonType === 'video' ? (
          <Video
            key={previewItem}
            source={videoData[previewItem].source}
            ref={(ref) => {
              this.player = ref;
            }}
            style={Styles.video}
            controls={true}
            repeat={true}
            fullscreen={true}
          />
        ) : (
          <View style={Styles.imageView}>
            <Image style={Styles.image} source={data.img} />
          </View>
        )}

        <View style={Styles.nameView}>
          <Text style={Styles.nameText}>{data.name}</Text>
        </View>
      </View>
      <View key="description" style={Styles.descriptionView}>
        <Text style={Styles.descriptionText}>{data.description}</Text>
      </View>
      <View key="button" style={Styles.btnView}>
        {data.buttonType === 'open' ? (
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
