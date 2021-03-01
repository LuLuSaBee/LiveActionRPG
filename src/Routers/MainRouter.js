import React from 'react';
import {Router, Scene, Stack} from 'react-native-router-flux';
import {routerKey} from '../data.scoure';
import LandingPage from '../Pages/LandingPage';
import PlayerHome from '../Pages/PlayerHome';

export default class MainRouter extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Router>
        <Stack key="root">
          <Scene
            key={routerKey.LandingPage}
            component={LandingPage}
            hideNavBar
          />
          <Scene key={routerKey.PlayerHome} component={PlayerHome} hideNavBar />
        </Stack>
      </Router>
    );
  }
}
