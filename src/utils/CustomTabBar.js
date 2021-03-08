import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {routerKey, TabData} from '../data.source';
import Styles from '../Styles/CustomTabBar.style';
import TabViewIcon from '../utils/TabViewIcon';

export default class CustomTabBar extends React.Component {
  render() {
    const {state} = this.props.navigation;
    return (
      <View style={Styles.container}>
        <View style={Styles.view}>
          {state.routes.map((element) => (
            <TouchableOpacity
              activeOpacity={0}
              key={element.key}
              onTouchStart={() =>
                element.key === routerKey.PlayerHome
                  ? console.log('click')
                  : Actions[element.key]()
              }
              style={Styles.iconButton}>
              <View style={Styles.iconView}>
                <TabViewIcon
                  source={TabData[element.key].icon}
                  iconStyle={Styles.iconStyle}
                  focused={
                    element.key === routerKey.PlayerHome
                      ? false
                      : this.props.navigation._childrenNavigation[
                          element.key
                        ].isFocused()
                  }
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  }
}
