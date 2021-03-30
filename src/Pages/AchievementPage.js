import React from 'react';
import {View, ScrollView, Text, Image, TouchableOpacity} from 'react-native';
import {achievementData} from '../data.source';
import {connect} from 'react-redux';
import * as actionCreators from '../redux/actions';
import Styles from '../Styles/AchievementPage.style';
import InfoBox from '../Views/Elements/InfoBox';
import {pop} from '../utils/routerAction';

class AchievementPage extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    const {achievement} = this.props;
    const filterData = achievement.filter((element) => !element.lock);
    return (
      <View style={Styles.page}>
        <ScrollView style={Styles.container}>
          {filterData.map((element) => (
            <InfoBox
              key={element.id}
              boxStyle={Styles.box}
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
        </ScrollView>
        <TouchableOpacity style={Styles.backButton} onPress={() => pop()}>
          <Text style={Styles.backText}>回到上一頁</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect((store) => store, actionCreators)(AchievementPage);
