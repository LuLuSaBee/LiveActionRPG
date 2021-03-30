import React, {useRef} from 'react';
import {Router, Scene, Tabs} from 'react-native-router-flux';
import {routerKey} from '../data.source';
import LandingPage from '../Pages/LandingPage';
import BackpackPage from '../Pages/BackpackPage';
import InformationPage from '../Pages/InformationPage';
import StoryRecordPage from '../Pages/StoryRecordPage';
import CustomTabBar from '../Views/CustomTabBar';
import NPCModal from '../Pages/NPCModal';
import CheckListPage from '../Pages/CheckListPage';
import HostHomePage from '../Pages/HostHomePage';
import AchievementPage from '../Pages/AchievementPage';

import CustAlert from '../Views/CustAlert';

export default function MainRouter() {
  const custAlertRef = useRef({});
  const openAlert = (data) => {
    custAlertRef.current.open(data);
  };
  const closeAlert = () => {
    custAlertRef.current.close();
  };
  const modalizeRef = useRef(null);
  const openModal = () => {
    modalizeRef.current.open();
  };
  const closeModal = () => {
    modalizeRef.current.close();
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
              <CustomTabBar {...props} openModal={openModal} />
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
          <Scene key={routerKey.CheckListPage} component={CheckListPage} />
          <Scene key={routerKey.AchievementPage} component={AchievementPage} />
          <Scene key={routerKey.HostHomePage} component={HostHomePage} />
        </Scene>
      </Router>
      <NPCModal
        modalizeRef={modalizeRef}
        openModal={openModal}
        closeModal={closeModal}
        openAlert={openAlert}
        closeAlert={closeAlert}
      />
      <CustAlert custAlertRef={custAlertRef} />
    </>
  );
}
