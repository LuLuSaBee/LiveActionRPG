import React, {useRef} from 'react';
import {Router, Scene, Tabs} from 'react-native-router-flux';
import {routerKey} from '../data.source';
import LandingPage from '../Pages/LandingPage';
import PlayerHome from '../Pages/PlayerHome';
import BackpackPage from '../Pages/BackpackPage';
import InformationPage from '../Pages/InformationPage';
import CustomTabBar from '../utils/CustomTabBar';
import {Modalize} from 'react-native-modalize';
import {Text} from 'react-native';

export default function MainRouter() {
  const modalizeRef = useRef(null);
  const openModalize = () => {
    var _a;
    (_a = modalizeRef.current) === null || _a === void 0 ? void 0 : _a.open();
  };

  return (
    <>
      <Router>
        <Scene key="root" hideNavBar modal>
          <Tabs
            key={routerKey.Tabs}
            showLabel={true}
            tabBarComponent={(props) => (
              <CustomTabBar {...props} OpenModalize={openModalize} />
            )}>
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
      <Modalize ref={modalizeRef}>
        <Text>123456789</Text>
      </Modalize>
    </>
  );
}
