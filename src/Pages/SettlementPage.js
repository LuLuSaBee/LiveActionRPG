import React from 'react';
import {View, Text, SafeAreaView, ScrollView, Image} from 'react-native';
import {connect} from 'react-redux';
import * as actionCreators from '../redux/actions';
import InfoBox from '../Views/Elements/InfoBox';
import * as Progress from 'react-native-progress';
import Styles from '../Styles/SettlementPage.style';
import {SettlementPageData as pageData} from '../data.source';
import {checkPointDataList} from '../data.source';
import StepIndicator from 'react-native-step-indicator';
import moment from 'moment';
import {achievementData} from '../data.source';

class SettlementPage extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.customStyles = {
      stepIndicatorSize: 20,
      currentStepIndicatorSize: 25,
      separatorStrokeWidth: 10,
      currentStepStrokeWidth: 3,
      stepStrokeCurrentColor: '#4F6D7A',
      stepStrokeWidth: 3,
      stepStrokeFinishedColor: '#4F6D7A',
      stepStrokeUnFinishedColor: '#aaaaaa',
      separatorFinishedColor: '#4F6D7A',
      separatorUnFinishedColor: '#aaaaaa',
      stepIndicatorFinishedColor: '#4F6D7A',
      stepIndicatorUnFinishedColor: '#ffffff',
      stepIndicatorCurrentColor: '#ffffff',
      stepIndicatorLabelFontSize: 13,
      currentStepIndicatorLabelFontSize: 13,
      stepIndicatorLabelCurrentColor: '#4F6D7A',
      stepIndicatorLabelFinishedColor: '#ffffff',
      stepIndicatorLabelUnFinishedColor: '#aaaaaa',
      labelSize: 20,
      labelAlign: 'flex-start',
      currentStepLabelColor: 'black',
    };
    this.labels = [];
    for (let index = 0; index < checkPointDataList.length - 1; index++) {
      this.labels.push('尚未解鎖');
    }
  }

  render() {
    const {progressRate, checkPoint, startTime, achievement} = this.props;
    const filterData = achievement.filter((element) => !element.lock);
    const length = checkPoint.length;

    return (
      <SafeAreaView style={Styles.page}>
        <View style={Styles.container}>
          <InfoBox
            boxStyle={[Styles.box, Styles.progressBox]}
            content={[
              <View style={Styles.progressInfoTitle} key={'word'}>
                <Text style={Styles.progressInfoText}>
                  {pageData.progress.title}
                </Text>
              </View>,
              <View style={Styles.progressInfo} key={'bar'}>
                <View style={Styles.progressBar}>
                  <Progress.Bar
                    key={1}
                    progress={progressRate / 100}
                    width={null}
                    height={20}
                    borderRadius={40}
                    animationType={'timing'}
                    color={'#4F6D7A'}
                  />
                </View>
                <Text style={Styles.progressNumber}>{progressRate}%</Text>
              </View>,
            ]}
          />
          <InfoBox
            boxStyle={[Styles.box, Styles.checkBox]}
            content={
              <StepIndicator
                customStyles={this.customStyles}
                currentPosition={length}
                labels={this.labels.map((label, index) =>
                  index < length
                    ? checkPoint[length - index - 1].name.padEnd(9, '　') +
                      '' +
                      moment(
                        checkPoint[length - index - 1].time.seconds * 1000 +
                          checkPoint[length - index - 1].time.nanoseconds /
                            1000000 -
                          startTime -
                          28800000,
                      ).format('mm:ss')
                    : label,
                )}
                direction={'vertical'}
                stepCount={checkPointDataList.length - 1}
              />
            }
          />
          <InfoBox
            boxStyle={Styles.achievementBox}
            content={[
              <View key="title" style={Styles.achievementTitle}>
                <Text style={Styles.achievementTitleText}>成就</Text>
              </View>,
              <ScrollView
                key="scrollView"
                style={[Styles.container, Styles.achievementContainer]}>
                {filterData.map((element) => (
                  <InfoBox
                    key={element.id}
                    boxStyle={Styles.achievementView}
                    content={[
                      <View key="image" style={Styles.imageContainer}>
                        <Image
                          style={Styles.image}
                          source={achievementData[element.id].img}
                        />
                      </View>,
                      <View key="info" style={Styles.infoContainer}>
                        <Text style={Styles.text}>
                          {achievementData[element.id].name}
                        </Text>
                        <Text style={Styles.description}>
                          {achievementData[element.id].description}
                        </Text>
                      </View>,
                    ]}
                  />
                ))}
              </ScrollView>,
            ]}
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default connect((store) => store, actionCreators)(SettlementPage);
