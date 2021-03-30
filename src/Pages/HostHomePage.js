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
import {informationPageData as pageData} from '../data.source';
import * as Progress from 'react-native-progress';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {connect} from 'react-redux';
import * as actionCreators from '../redux/actions';
import {addMessage} from '../utils/firebaseActions';

class HostHomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };
  }

  onSummitMessage = (message) => {
    if (message === '') {
      return;
    }
    const {userData, updateChatList, chatList} = this.props;
    const messageData = {sendFrom: userData.type, message: message};
    //redux
    updateChatList(messageData);
    //firebase cloud firestore
    addMessage(userData.uid, chatList, messageData);
    //local state
    this.setState({message: ''});
  };

  onChangeMessage = (message) => {
    this.setState({message: message});
  };

  render() {
    const {message} = this.state;
    const {chatList, userData, progressRate, timeLeft} = this.props;

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
                    <Text style={Styles.text}>{pageData.progress.title}</Text>
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
                      />
                    </View>
                    <Text style={Styles.progressNumber}>{progressRate}%</Text>
                  </View>,
                ]}
              />
              <InfoBox
                boxStyle={[Styles.box, Styles.timeLeftBox]}
                content={<View />}
              />
              <InfoBox
                boxStyle={[Styles.box, Styles.supportRoom]}
                content={
                  <View style={Styles.room}>
                    <View style={Styles.roomHeader}>
                      <Text style={[Styles.roomTitle, Styles.text]}>
                        {pageData.supportRoom.title}
                      </Text>
                    </View>
                    <ScrollView
                      ref={(ref) => {
                        this.scrollView = ref;
                      }}
                      style={Styles.roomBody}
                      contentContainerStyle={Styles.contentContainerStyle}
                      onContentSizeChange={() =>
                        this.scrollView.scrollToEnd({animated: true})
                      }>
                      {chatList.map((chat, index) => (
                        <View
                          key={index}
                          style={[
                            Styles.message,
                            chat.sendFrom === userData.type
                              ? Styles.ownMessage
                              : Styles.otherMessage,
                          ]}>
                          <Text style={Styles.text}>{chat.message}</Text>
                        </View>
                      ))}
                    </ScrollView>
                    <View style={Styles.roomFooter}>
                      <View style={Styles.footerContainer}>
                        <View style={Styles.roomInput}>
                          <TextInput
                            style={Styles.inputBox}
                            onChangeText={(text) => this.onChangeMessage(text)}
                            value={message}
                            placeholder={pageData.supportRoom.placeholder}
                          />
                        </View>
                        <TouchableOpacity
                          style={Styles.roomSubmit}
                          onPress={() => this.onSummitMessage(message)}>
                          <Text style={Styles.text}>
                            {pageData.supportRoom.submit}
                          </Text>
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

export default connect((store) => store, actionCreators)(HostHomePage);
