import React, {useRef, useState} from 'react';
import {Router, Scene, Tabs} from 'react-native-router-flux';
import {routerKey} from '../data.source';
import LandingPage from '../Pages/LandingPage';
import BackpackPage from '../Pages/BackpackPage';
import InformationPage from '../Pages/InformationPage';
import StoryRecordPage from '../Pages/StoryRecordPage';
import CustomTabBar from '../utils/CustomTabBar';
import NPCModal from '../Pages/NPCModal';

export default function MainRouter() {
  const [modalizeRef, setModalizeRef] = useState(useRef(null));
  const openModalize = () => {
    modalizeRef.current.open();
  };

  return (
    <>
      <Router>
        <Scene key="root" hideNavBar>
          <Scene key={routerKey.LandingPage} component={LandingPage} />
          <Tabs
            key={routerKey.Tabs}
            showLabel={true}
            tabBarComponent={(props) => (
              <CustomTabBar {...props} openModalize={openModalize} />
            )}
            hideNavBar>
            <Scene
              key={routerKey.InformationPage}
              component={InformationPage}
              hideNavBar
            />
            <Scene key={routerKey.ScanningView} component={<></>} hideNavBar />
            <Scene
              key={routerKey.BackpackPage}
              component={BackpackPage}
              hideNavBar
            />
          </Tabs>
          <Scene key={routerKey.StoryRecordPage} component={StoryRecordPage} />
        </Scene>
      </Router>
      <NPCModal setModalizeRef={setModalizeRef} />
    </>
  );
}
