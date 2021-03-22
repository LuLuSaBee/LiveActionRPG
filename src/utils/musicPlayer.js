import Sound from 'react-native-sound';
import {musicData} from '../data.source';

Sound.setCategory('Playback');

var backgroundMusic;
export function playerBackgroundMusic() {
  backgroundMusic = new Sound(musicData.background, (error) => {
    if (error) {
      console.log('failed to load the background music\n', error);
      return;
    }
    // loaded successfully
    console.log('Background music loaded successfully.');

    backgroundMusic.play();
    // Loop indefinitely until stop() is called
    backgroundMusic.setNumberOfLoops(-1);
  });
}

export function pauseBackgroundMusic() {
  backgroundMusic.pause();
}
