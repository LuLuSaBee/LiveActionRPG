import React from 'react';
import {View, SafeAreaView, Text} from 'react-native';
import Styles from '../Styles/BackpackPage.style';
import {itemsData} from '../data.source';
import {connect} from 'react-redux';
import * as actionCreators from '../redux/actions';
import BagView from '../Views/BagView';
import ItemPreview from '../Views/ItemPreview';
import {Dialog} from 'react-native-simple-dialogs';
import {
  pushToStoryRecordPage,
  pushToCheckListPage,
} from '../utils/routerAction';

class BackpackPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      previewItem: 'terms',
      dialogVisible: false,
    };
    this.openItem = {
      terms: () => this.setState({dialogVisible: true}),
      book: () => pushToStoryRecordPage(),
      checkList: () => pushToCheckListPage(),
    };
  }

  handleItemPress = (key) => {
    this.setState({previewItem: key});
  };

  render() {
    const {backpackItem} = this.props;
    const {previewItem, dialogVisible} = this.state;
    return (
      <View style={Styles.page}>
        <SafeAreaView style={Styles.container}>
          <View style={Styles.previewContainer}>
            <ItemPreview previewItem={previewItem} openItem={this.openItem} />
          </View>
          <View style={Styles.bagContainer}>
            <View style={Styles.bagView}>
              {
                <BagView
                  backpackItem={backpackItem}
                  previewItem={previewItem}
                  onPress={this.handleItemPress}
                />
              }
            </View>
          </View>
        </SafeAreaView>
        <Dialog
          visible={dialogVisible}
          title={itemsData['terms'].content.title}
          animationType={'fade'}
          onTouchOutside={() => this.setState({dialogVisible: false})}>
          <View>
            <Text>{itemsData['terms'].content.text}</Text>
          </View>
        </Dialog>
      </View>
    );
  }
}

export default connect((store) => store, actionCreators)(BackpackPage);
