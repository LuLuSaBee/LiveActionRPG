import React from 'react';
import {Image} from 'react-native';

function TabViewIcon(props) {
  const {iconStyle} = props;
  const {normal, seleted} = props.source;
  const mode = props.focused ? seleted : normal;
  return <Image source={mode} style={iconStyle} />;
}

export default TabViewIcon;
