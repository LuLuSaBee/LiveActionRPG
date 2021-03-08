import React from 'react';
import {Router, Scene, Tabs} from 'react-native-router-flux';
import {routerKey} from '../data.source';
import LandingPage from '../Pages/LandingPage';
import PlayerHome from '../Pages/PlayerHome';
import BackpackPage from '../Pages/BackpackPage';
import InformationPage from '../Pages/InformationPage';
import CustomTabBar from '../utils/CustomTabBar';

export default class MainRouter extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Router>
        <Scene key="root" hideNavBar>
          <Tabs
            key={routerKey.Tabs}
            showLabel={true}
            tabBarComponent={CustomTabBar}>
            <Scene
              key={routerKey.InformationPage}
              component={InformationPage}
              hideNavBar
            />
            <Scene
              key={routerKey.PlayerHome}
              component={PlayerHome}
              hideNavBar
            />
            <Scene
              key={routerKey.BackpackPage}
              component={BackpackPage}
              hideNavBar
            />
          </Tabs>
          <Scene key={routerKey.LandingPage} component={LandingPage} />
        </Scene>
      </Router>
    );
  }
}
