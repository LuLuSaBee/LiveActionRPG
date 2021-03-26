import Sound from 'react-native-sound';
import {musicData} from '../data.source';

Sound.setCategory('Playback');

//Backgaeground
var backgroundMusic;
export function playerBackgroundMusic() {
  backgroundMusic = new Sound(musicData.background, (error) => {
    if (error) {
      console.log('failed to load the background music\n', error);
      return;
    }

    backgroundMusic.play();
    // Loop indefinitely until stop() is called
    backgroundMusic.setNumberOfLoops(-1);
  });
}

export function pauseBackgroundMusic() {
  backgroundMusic.pause();
}

//On botton click
var btnClickMedia = new Sound(musicData.click, (error) => {
  if (error) {
    console.log('failed to load the btnClickMedia\n', error);
    return;
  }
});

export function playBtnClickMedia() {
  btnClickMedia.stop();
  btnClickMedia.play();
}

//LittleGame
var littleGameSuccess = new Sound(musicData.gameSuccess, (error) => {
  if (error) {
    console.log('failed to load the littleGameSuccess Success\n', error);
    return;
  }
});
var littleGameFail = new Sound(musicData.gameFail, (error) => {
  if (error) {
    console.log('failed to load the littleGameFail Fail\n', error);
    return;
  }
});

export function playGameSuccess() {
  littleGameSuccess.stop();
  littleGameSuccess.play();
}

export function playGameFail() {
  littleGameFail.stop();
  littleGameFail.play();
}

//Game(entire)
var gameSuccess = new Sound(musicData.success, (error) => {
  if (error) {
    console.log('failed to load the gameSuccess Success\n', error);
    return;
  }
});
var gameFail = new Sound(musicData.fail, (error) => {
  if (error) {
    console.log('failed to load the gameFail Fail\n', error);
    return;
  }
});
export function playSuccess() {
  gameSuccess.play();
  releaseMemory();
}

export function playFail() {
  gameSuccess.play();
  releaseMemory();
}

function releaseMemory() {
  btnClickMedia.release();
  littleGameSuccess.release();
  littleGameFail.release();
  gameSuccess.release();
  gameFail.release();
}
