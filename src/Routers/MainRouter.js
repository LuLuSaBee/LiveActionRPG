import React from 'react';
import {Router, Scene, Stack, Tabs} from 'react-native-router-flux';
import {routerKey, TabData} from '../data.source';
import LandingPage from '../Pages/LandingPage';
import PlayerHome from '../Pages/PlayerHome';
import BackpackPage from '../Pages/BackpackPage';
import InformationPage from '../Pages/InformationPage';
import TabViewIcon from '../utils/TabViewIcon';

import CustomTabBar from '../CustomTabBar';
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
              tabBarLabel={TabData.informationPage}
              title={TabData.informationPage}
              icon={(e) => (
                <TabViewIcon
                  source={TabData.informationPageIcon}
                  focused={e.focused}
                />
              )}
              hideNavBar
            />
            <Stack
              key={routerKey.PlayerHome}
              tabBarLabel={TabData.playerHome}
              title={TabData.playerHome}
              icon={(e) => (
                <TabViewIcon
                  source={TabData.playerHomeIcon}
                  focused={e.focused}
                />
              )}
              initial
              hideNavBar>
              <Scene key={routerKey.PlayerHome} component={PlayerHome} />
            </Stack>
            <Scene
              key={routerKey.BackpackPage}
              component={BackpackPage}
              tabBarLabel={TabData.backpackPage}
              title={TabData.backpackPage}
              icon={(e) => (
                <TabViewIcon
                  source={TabData.backpackPageIcon}
                  focused={e.focused}
                />
              )}
              hideNavBar
            />
          </Tabs>
          <Scene key={routerKey.LandingPage} component={LandingPage} />
        </Scene>
      </Router>
    );
  }
}
