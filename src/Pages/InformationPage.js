import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Styles from '../Styles/InformationPage.style';
import InfoBox from '../Views/Elements/InfoBox';
import {InformationPageData as pageData} from '../data.source';
import * as Progress from 'react-native-progress';
/*
進度
時間
聊天室
*/

export default class InformationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      price: 0,
      progressPersent: 10,
      timeLeft: Date().toLocaleString(),
    };
  }

  componentDidMount() {}

  componentDidUpdate() {
    if (this.state.timeLeft === 0) {
      clearInterval(this.timer);
    }
  }

  render() {
    const {timeLeft} = this.state;
    console.log('--------------');
    console.log(timeLeft);
    console.log('--------------');
    return (
      <View style={Styles.page}>
        <View style={Styles.container}>
          <InfoBox
            boxStyle={[Styles.box, Styles.progressBox]}
            content={[
              <View style={Styles.progressInfoTitle} key={'word'}>
                <Text>{pageData.progress.title}</Text>
              </View>,
              <View style={Styles.progressInfo} key={'bar'}>
                <View style={Styles.progressBar}>
                  <Progress.Bar
                    key={1}
                    progress={0.5}
                    width={null}
                    height={20}
                    borderRadius={40}
                    animationType={'timing'}
                  />
                </View>
                <Text style={Styles.progressNumber}>100%</Text>
              </View>,
            ]}
          />
          <InfoBox
            boxStyle={[Styles.box, Styles.timeLeftBox]}
            content={[
              <Text key={'title'}>{pageData.timeLeft.title}</Text>,
              <Text key={'timerNumber'} style={[Styles.timerNumber]}>
                {timeLeft}
              </Text>,
            ]}
          />
          <InfoBox
            boxStyle={[Styles.box, Styles.supportRoom]}
            content={<View></View>}
          />
        </View>
      </View>
    );
  }
}
