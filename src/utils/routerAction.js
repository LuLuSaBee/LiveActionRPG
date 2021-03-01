import {Actions} from 'react-native-router-flux';
import {routerKey} from '../data.scoure';

export function navToLandingPage(props) {
  Actions.push(routerKey.LandingPage, {...props});
}

export function replaceToPlayerHome(props) {
  Actions.replace(routerKey.PlayerHome, {...props});
}
