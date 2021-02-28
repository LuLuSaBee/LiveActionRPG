import {Actions} from 'react-native-router-flux';
import {routerKey} from '../data.source';

export function navToLandingPage(props) {
  Actions.push(routerKey.LandingPage, {...props});
}
