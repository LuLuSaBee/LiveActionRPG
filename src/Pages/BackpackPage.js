import React from 'react';
import {View, SafeAreaView, Image, Text, TouchableOpacity} from 'react-native';
import Styles from '../Styles/BackpackPage.style';
import InfoBox from '../Views/Elements/InfoBox';
import {storyRecordPageData as storyRecordData} from '../data.source';
import {pushToStoryRecordPage} from '../utils/routerAction';
import {connect} from 'react-redux';
import * as actionCreators from '../redux/actions';

class BackpackPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={Styles.page}>
        <SafeAreaView style={Styles.container}>
          <TouchableOpacity
            style={[Styles.box, Styles.record]}
            onPress={() =>
              pushToStoryRecordPage({storyRecord: this.props.storyRecord})
            }>
            <View style={Styles.bookView}>
              <Image style={Styles.bookIcon} source={storyRecordData.left} />
            </View>
            <View style={Styles.textView}>
              <Text style={Styles.text}>{storyRecordData.title}</Text>
            </View>
            <View style={Styles.arrowView}>
              <Image style={Styles.arrowIcon} source={storyRecordData.right} />
            </View>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    );
  }
}

export default connect((store) => store, actionCreators)(BackpackPage);
