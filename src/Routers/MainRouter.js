import React from 'react';
import {Image} from 'react-native';
import {Router, Scene, Stack, Tabs} from 'react-native-router-flux';
import {routerKey, TabData} from '../data.source';
import LandingPage from '../Pages/LandingPage';
import PlayerHome from '../Pages/PlayerHome';
import TabViewIcon from '../utils/TabViewIcon';

export default class MainRouter extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Router>
        <Scene key="root" hideNavBar>
          <Tabs key={routerKey.Tabs}>
            <Stack
              key={routerKey.PlayerHome}
              tabBarLabel={TabData.playerHome}
              title={TabData.playerHome}
              icon={(e) => (
                <TabViewIcon
                  source={TabData.playerHomeIcon}
                  focused={e.focused}
                />
              )}>
              <Scene key={routerKey.PlayerHome} component={PlayerHome} />
            </Stack>
            <Scene
              key={routerKey.LandingPage}
              component={LandingPage}
              tabBarLabel={TabData.backpackPage}
              title={TabData.backpackPage}
              icon={(e) => (
                <TabViewIcon
                  source={TabData.backpackPageIcon}
                  focused={e.focused}
                />
              )}
            />
          </Tabs>
          <Scene key={routerKey.LandingPage} component={LandingPage} />
        </Scene>
      </Router>
    );
  }
}
