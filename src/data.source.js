export const routerKey = {
  Tabs: 'Tabs',
  LandingPage: 'LandingPage',
  PlayerHome: 'PlayerHome',
  BackpackPage: 'BackpackPage',
  InformationPage: 'InformationPage',
};

export const LandingPageData = {
  teamNamePH: '請輸入團隊名稱',
};

export const TabData = {
  playerHome: '讀取器',
  playerHomeIcon: {
    normal: require('./assets/scan.png'),
    seleted: require('./assets/scan-seleted.png'),
  },
  backpackPage: '背包',
  backpackPageIcon: {
    normal: require('./assets/backpack.png'),
    seleted: require('./assets/backpack-seleted.png'),
  },
  informationPage: '資訊',
  informationPageIcon: {
    normal: require('./assets/info.png'),
    seleted: require('./assets/info-seleted.png'),
  },
  iconStyle: {
    height: '60%',
    width: '60%',
    resizeMode: 'contain',
  },
};

export const InformationPageData = {
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
