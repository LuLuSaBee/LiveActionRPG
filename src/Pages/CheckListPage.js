import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import {connect} from 'react-redux';
import * as actionCreators from '../redux/actions';
import moment from 'moment';
import {checkPointDataList} from '../data.source';
import Styles from '../Styles/CheckListPage.style';
import {pop} from '../utils/routerAction';

class CheckListPage extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.customStyles = {
      stepIndicatorSize: 40,
      currentStepIndicatorSize: 45,
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
    };
    this.labels = [];
    for (let index = 0; index < checkPointDataList.length - 1; index++) {
      this.labels.push('尚未解鎖');
    }
  }

  render() {
    const {checkPoint} = this.props;
    return (
      <View style={Styles.container}>
        <StepIndicator
          customStyles={this.customStyles}
          currentPosition={checkPoint.length}
          labels={this.labels.map((label, index) =>
            index < checkPoint.length
              ? checkPoint[index].name.padEnd(9, '　') +
                '' +
                moment(
                  checkPoint[index].time.seconds * 1000 +
                    checkPoint[index].time.nanoseconds / 1000000,
                ).format('HH:mm:ss')
              : label,
          )}
          direction={'vertical'}
          stepCount={checkPointDataList.length - 1}
        />
        <TouchableOpacity style={Styles.backButton} onPress={() => pop()}>
          <Text style={Styles.backText}>回到上一頁</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect((store) => store, actionCreators)(CheckListPage);
