import React from 'react';
import {Image} from 'react-native';
import {TabData} from '../data.source';

function TabViewIcon(props) {
  const {normal, seleted} = props.source;
  const mode = props.focused ? seleted : normal;
  return <Image source={mode} style={TabData.iconStyle} />;
}

export default TabViewIcon;
