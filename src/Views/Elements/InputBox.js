import React from 'react';
import {View, TextInput} from 'react-native';

/**
 *
 * @param {*} containerStyle - 容器的style
 * @param {*} inputData - input的data
 * @param {*} inputData.style - input的style
 * @param {*} inputData.value - input的value
 * @param {*} inputData.placeholder - input的預設顯示文字
 * @param {*} inputData.onChangeText - input的callback
 * @param {*} inputData.anyProps - input的選填(like secureTextEntry)
 * @returns
 */
function InputBox(props) {
  const {containerStyle, inputData} = props;
  return (
    <View style={containerStyle}>
      <TextInput {...inputData} />
    </View>
  );
}

export default InputBox;
