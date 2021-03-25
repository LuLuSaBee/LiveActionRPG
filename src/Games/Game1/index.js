import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import Styles from './Styles';
import photo1 from './photo/photo1.jpg';
import photo2 from './photo/photo2.jpg';
import photo3 from './photo/photo3.jpg';
import photo4 from './photo/photo4.jpg';
import photo5 from './photo/photo5.jpg';
import photo6 from './photo/photo6.jpg';
import photo7 from './photo/photo7.jpg';
import photo8 from './photo/photo8.jpg';
import photo9 from './photo/photo9.jpg';
import GameItem from './GameItem';
import {playGameSuccess, playGameFail} from '../../utils/musicPlayer';

export default class Game1 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      photos: [
        {id: 1, url: photo1, gap: false, move: false},
        {id: 2, url: photo2, gap: false, move: false},
        {id: 3, url: photo3, gap: false, move: false},
        {id: 4, url: photo4, gap: false, move: false},
        {id: 5, url: photo5, gap: false, move: false},
        {id: 6, url: photo6, gap: false, move: false},
        {id: 7, url: photo7, gap: true, move: true},
        {id: 8, url: photo8, gap: false, move: false},
        {id: 9, url: photo9, gap: false, move: false},
      ],
    };
    const random = this.state.photos;
    random.sort(function () {
      return Math.random() - 0.5;
    });
    this.props.start();
  }
  componentDidMount() {
    for (var i = 0; i <= 8; i++) {
      if (this.state.photos[i].gap) {
        this.updateMove(i);
      }
    }
  }
  componentDidUpdate() {
    var end = true;
    for (var i = 1; i <= 9; i++) {
      if (i !== this.state.photos[i - 1].id) {
        end = false;
      }
    }
    if (end) {
      this.props.finish();
      playGameSuccess();
    }
  }

  updateMove = (i) => {
    const photos = this.state.photos;
    for (var j = 0; j <= 8; j++) {
      photos[j].move = false;
    }
    if (i === 0) {
      photos[0].move = true;
      photos[1].move = true;
      photos[3].move = true;
    } else if (i === 1) {
      photos[0].move = true;
      photos[1].move = true;
      photos[2].move = true;
      photos[4].move = true;
    } else if (i === 2) {
      photos[1].move = true;
      photos[2].move = true;
      photos[5].move = true;
    } else if (i === 3) {
      photos[0].move = true;
      photos[3].move = true;
      photos[4].move = true;
      photos[6].move = true;
    } else if (i === 4) {
      photos[1].move = true;
      photos[3].move = true;
      photos[4].move = true;
      photos[5].move = true;
      photos[7].move = true;
    } else if (i === 5) {
      photos[2].move = true;
      photos[4].move = true;
      photos[5].move = true;
      photos[8].move = true;
    } else if (i === 6) {
      photos[3].move = true;
      photos[6].move = true;
      photos[7].move = true;
    } else if (i === 7) {
      photos[4].move = true;
      photos[6].move = true;
      photos[7].move = true;
      photos[8].move = true;
    } else if (i === 8) {
      photos[5].move = true;
      photos[7].move = true;
      photos[8].move = true;
    }
    this.setState({photos: photos});
  };
  pressToLock = (id) => {
    var change = [];
    for (var i in this.state.photos) {
      if (this.state.photos[i].id === id && this.state.photos[i].move) {
        change.push(i);
      }
      if (this.state.photos[i].gap) {
        change.push(i);
      }
    }
    this.Switch(change[0], change[1]);
    for (var i = 0; i <= 8; i++) {
      if (this.state.photos[i].gap) {
        this.updateMove(i);
      }
    }
  };
  Switch(i, j) {
    const newStep = this.state.photos;
    const bag = newStep[i];
    newStep[i] = newStep[j];
    newStep[j] = bag;
    this.setState({photos: newStep});
  }

  render() {
    return (
      <View style={Styles.page}>
        <View style={Styles.titleView}>
          <Text style={Styles.title}>拼圖遊戲</Text>
        </View>
        <View style={Styles.GameView}>
          <View style={Styles.ImgSort}>
            {this.state.photos.map((photo) => {
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
            onPress={() => {
              this.props.back();
              playGameFail();
            }}>
            <Text>回到對話</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
