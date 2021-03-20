import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Styles from './Style';
import photo1 from './Photo/photo1.jpg';
import photo2 from './Photo/photo2.jpg';
import photo3 from './Photo/photo3.jpg';
import photo4 from './Photo/photo4.jpg';
import photo5 from './Photo/photo5.jpg';
import photo6 from './Photo/photo6.jpg';
import photo7 from './Photo/photo7.jpg';
import photo8 from './Photo/photo8.jpg';
import GameItem from './GameItem';

export default class Game1 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      photos: [
        {id: 1, data: 1, url: photo1, lock: false},
        {id: 2, data: 2, url: photo2, lock: false},
        {id: 3, data: 3, url: photo3, lock: false},
        {id: 4, data: 4, url: photo4, lock: false},
        {id: 5, data: 5, url: photo5, lock: false},
        {id: 6, data: 6, url: photo6, lock: false},
        {id: 7, data: 7, url: photo7, lock: false},
        {id: 8, data: 8, url: photo8, lock: false},
        {id: 9, data: 1, url: photo1, lock: false},
        {id: 10, data: 2, url: photo2, lock: false},
        {id: 11, data: 3, url: photo3, lock: false},
        {id: 12, data: 4, url: photo4, lock: false},
        {id: 13, data: 5, url: photo5, lock: false},
        {id: 14, data: 6, url: photo6, lock: false},
        {id: 15, data: 7, url: photo7, lock: false},
        {id: 16, data: 8, url: photo8, lock: false},
      ],
    };
    const bag = this.state.photos;
    bag.sort(function () {
      return Math.random() - 0.5;
    });

    this.props.start();
  }

  componentDidUpdate() {
    if (this.state.photos.filter((photo) => photo.lock).length === 2) {
      setTimeout(() => {
        this.Test();
      }, 1000);
    }
    if (this.state.photos.filter((photo) => photo.finish).length === 2) {
      this.props.finish();
    }
  }

  Test = () => {
    const newStep = this.state.photos.filter((photo) => photo.lock);
    if (newStep[0].data === newStep[1].data) {
      newStep[0] = {id: newStep[0].id, finish: true};
      newStep[1] = {id: newStep[1].id, finish: true};
    } else {
      newStep[0].lock = false;
      newStep[1].lock = false;
    }
    this.setState((preState) => ({
      photos: preState.photos.map((photo) => {
        if (newStep[0].id === photo.id) {
          return {...newStep[0]};
        } else if (newStep[1].id === photo.id) {
          return {...newStep[1]};
        } else {
          return {...photo};
        }
      }),
    }));
  };

  pressToLock = (id) => {
    if (this.state.photos.filter((photo) => photo.lock).length !== 2) {
      const newPhotos = this.state.photos.map((photo) => {
        return photo.id === id ? {...photo, lock: !photo.lock} : photo;
      });
      this.setState({
        photos: newPhotos,
      });
    }
  };

  render() {
    const {photos} = this.state;
    return (
      <View style={Styles.page}>
        <View style={Styles.titleView}>
          <Text style={Styles.title}>翻牌遊戲</Text>
        </View>
        <View style={Styles.GameView}>
          <View style={Styles.ImgSort}>
            {photos.map((photo) => {
              return (
                <GameItem
                  key={photo.id}
                  photo={photo}
                  onPress={this.pressToLock}
                />
              );
            })}
          </View>
        </View>
        <View style={Styles.btnView}>
          <TouchableOpacity
            style={Styles.backbtn}
            onPress={() => this.props.back()}>
            <Text>回到對話</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
