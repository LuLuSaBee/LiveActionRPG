import React from 'react';
import {View, ScrollView, Image, Text, TouchableOpacity} from 'react-native';
import Styles from '../Styles/StoryRecordPage.style';
import InfoBox from '../Views/Elements/InfoBox';
import {pop} from '../utils/routerAction';
import {connect} from 'react-redux';
import * as actionCreators from '../redux/actions';

class StoryRecordPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={Styles.page}>
        <ScrollView style={Styles.container}>
          <InfoBox
            boxStyle={[Styles.box]}
            content={[
              <View key="img" style={Styles.imageContainer}>
                <Image
                  style={Styles.image}
                  source={{
                    uri:
                      'https://upload.wikimedia.org/wikipedia/commons/7/7e/Walters_Gallery.jpg',
                  }}
                />
              </View>,
              <View key="info" style={Styles.infoContainer}>
                <View style={Styles.nameContainer}>
                  <Text>12345</Text>
                </View>
                <View style={Styles.linesContainer}>
                  <Text>1234567</Text>
                </View>
                <View style={Styles.timeContainer}>
                  <Text>time</Text>
                </View>
              </View>,
            ]}
          />
        </ScrollView>
        <TouchableOpacity style={Styles.backButton} onPress={() => pop()}>
          <Text style={Styles.backText}>回到遊戲</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect((store) => store, actionCreators)(StoryRecordPage);
