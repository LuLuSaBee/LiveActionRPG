import React from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Styles from '../Styles/InformationPage.style';
import InfoBox from '../Views/Elements/InfoBox';
import {InformationPageData as pageData} from '../data.source';
import * as Progress from 'react-native-progress';
import moment from 'moment';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
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
      timeLeft: moment(),
    };
  }
  // + 183594
  interval = 1000;

  componentDidMount() {
    this.timer = setInterval(() => {
      const {timeLeft, progressPersent} = this.state;
      this.setState({
        timeLeft: timeLeft + this.interval,
        // progressPersent: progressPersent + 5,
      });
      // console.log('--------------');
      // console.log(timeLeft);
      // console.log('--------------');

      if (timeLeft !== 0) return;
      clearInterval(this.timer);
    }, this.interval);
  }

  render() {
    const {timeLeft, progressPersent} = this.state;

    return (
      <View style={Styles.page}>
        <SafeAreaView>
          <KeyboardAwareScrollView
            resetScrollToCoords={{x: 0, y: 0}}
            contentContainerStyle={Styles.page}
            scrollEnabled={false}>
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
                        progress={progressPersent / 100}
                        width={null}
                        height={20}
                        borderRadius={40}
                        animationType={'timing'}
                      />
                    </View>
                    <Text style={Styles.progressNumber}>
                      {progressPersent}%
                    </Text>
                  </View>,
                ]}
              />
              <InfoBox
                boxStyle={[Styles.box, Styles.timeLeftBox]}
                content={[
                  <Text key={'title'}>{pageData.timeLeft.title}</Text>,
                  <Text key={'timerNumber'} style={[Styles.timerNumber]}>
                    {moment(timeLeft).format('HH:mm:ss')}
                  </Text>,
                ]}
              />
              <InfoBox
                boxStyle={[Styles.box, Styles.supportRoom]}
                content={
                  <View style={Styles.room}>
                    <View style={Styles.roomHeader}>
                      <Text style={Styles.roomTitle}>
                        {pageData.supportRoom.title}
                      </Text>
                    </View>
                    <ScrollView style={Styles.roomBody}>
                      <Text>12346</Text>
                    </ScrollView>
                    <ScrollView horizontal={true} style={{maxHeight: 35}}>
                      <TouchableOpacity style={Styles.supportOption}>
                        <Text>12345</Text>
                      </TouchableOpacity>
                    </ScrollView>
                    <View style={Styles.roomFooter}>
                      <View style={Styles.footerContainer}>
                        <TouchableOpacity style={Styles.roomFunc}>
                          <Text>132</Text>
                        </TouchableOpacity>
                        <View style={Styles.roomInput}>
                          <TextInput style={Styles.inputBox} />
                        </View>
                        <TouchableOpacity style={Styles.roomSubmit}>
                          <Text>132</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                }
              />
            </View>
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </View>
    );
  }
}
