import React from 'react';
import {View, FlatList, Image, Text, TouchableOpacity} from 'react-native';
import Styles from '../Styles/StoryRecordPage.style';
import InfoBox from '../Views/Elements/InfoBox';
import {pop} from '../utils/routerAction';
import {connect} from 'react-redux';
import * as actionCreators from '../redux/actions';
import {npcData} from '../data.source';
import moment from 'moment';

class StoryRecordPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={Styles.page}>
        <FlatList
          style={Styles.container}
          data={this.props.storyRecord}
          keyExtractor={(item) =>
            (
              item.time.seconds * 1000 +
              item.time.nanoseconds * 1000000
            ).toString()
          }
          renderItem={(item) => {
            const record = item.item;
            return (
              <InfoBox
                key={record.time}
                boxStyle={[Styles.box]}
                content={[
                  <View key="img" style={Styles.imageContainer}>
                    <Image
                      style={Styles.image}
                      source={npcData[record.npcID].img}
                    />
                  </View>,
                  <View key="info" style={Styles.infoContainer}>
                    <View style={Styles.nameContainer}>
                      <Text style={Styles.name}>
                        {npcData[record.npcID].name}
                      </Text>
                    </View>
                    <View style={Styles.linesContainer}>
                      <Text>{record.line}</Text>
                    </View>
                    <View style={Styles.timeContainer}>
                      <Text>
                        {moment(
                          record.time.seconds * 1000 +
                            record.time.nanoseconds / 1000000,
                        ).format('HH:mm:ss')}
                      </Text>
                    </View>
                  </View>,
                ]}
              />
            );
          }}
        />
        <TouchableOpacity style={Styles.backButton} onPress={() => pop()}>
          <Text style={Styles.backText}>回到遊戲</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect((store) => store, actionCreators)(StoryRecordPage);
