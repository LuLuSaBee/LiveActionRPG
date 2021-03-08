import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';

export default class CustomTabBar extends React.Component {
  render() {
    const {state} = this.props.navigation;
    const activeTabIndex = state.index;

    return (
      <View>
        {state.routes.map((element) => {
          console.log('--------------');
          console.log(element);
          console.log('--------------');
          return (
            <TouchableOpacity
              key={element.key}
              onPress={() => Actions[element.key]()}>
              <Text>{element.key.toUpperCase()}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}
