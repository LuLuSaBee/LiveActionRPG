export const routerKey = {
  Tabs: 'Tabs',
  LandingPage: 'LandingPage',
  ScanningView: 'ScanningView',
  BackpackPage: 'BackpackPage',
  InformationPage: 'InformationPage',
};

export const landingPageData = {
  teamNamePH: '請輸入團隊名稱',
};

export const TabData = {
  ScanningView: {
    icon: {
      normal: require('./assets/scan.png'),
      seleted: require('./assets/scan-seleted.png'),
    },
  },
  BackpackPage: {
    title: '背包',
    icon: {
      normal: require('./assets/backpack.png'),
      seleted: require('./assets/backpack-seleted.png'),
    },
  },
  InformationPage: {
    title: '資訊',
    icon: {
      normal: require('./assets/info.png'),
      seleted: require('./assets/info-seleted.png'),
    },
  },
};

export const informationPageData = {
  progress: {
    title: '遊戲完成度',
  },
  timeLeft: {
    title: '剩餘時間',
  },
  supportRoom: {
    title: '支援',
  },
};

import {ifIphoneX} from 'react-native-iphone-x-helper';
export const defaultTheme = {
  backgroundColor: '#efefef',
  ...ifIphoneX({marginTop: 0}, {marginTop: 10}),
};
