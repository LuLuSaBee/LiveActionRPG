import {Actions} from 'react-native-router-flux';
import {routerKey} from '../data.source';

export function navToLandingPage(props) {
  Actions.push(routerKey.LandingPage, {...props});
}

export function replaceToTabs(props) {
  Actions.replace(routerKey.Tabs, {...props});
}

export function pushToStoryRecordPage(props) {
  Actions.push(routerKey.StoryRecordPage, {...props});
}

export function pop() {
  Actions.pop();
}
