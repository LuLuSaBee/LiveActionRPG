import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import Styles from '../Styles/ScaningView.style';

export default function ScaningView(props) {
  const {beaconData, openBeacon, closeBeacon} = props;

  const npc_Card = (
    <TouchableOpacity onPress={() => openBeacon()}>
      <View style={Styles.card}>
        <View style={Styles.content}></View>
      </View>
    </TouchableOpacity>
  );

  const scaningGif = (
    <View style={Styles.gifContainer}>
      <Image style={Styles.image} source={require('../assets/scaning.gif')} />
    </View>
  );

  return (
    <View style={Styles.container}>
      {beaconData == null ? scaningGif : npc_Card}
    </View>
  );
}
