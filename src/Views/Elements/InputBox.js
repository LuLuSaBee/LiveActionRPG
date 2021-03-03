import React from 'react';
import {View, TextInput} from 'react-native';

function InputBox(props) {
  ///參數說明
  ///containerStyle   -> 容器的style
  ///inputData        -> input的data，可能包含：
  ///    style        -> input的style
  ///    value        -> input的value
  ///    placeholder  -> input的預設顯示文字
  ///    onChangeText -> input的callback
  ///    anyProps     -> input的選填(like secureTextEntry)

  const {containerStyle, inputData} = props;
  return (
    <View style={containerStyle}>
      <TextInput {...inputData} />
    </View>
  );
}

export default InputBox;
