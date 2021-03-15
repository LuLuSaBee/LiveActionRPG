export const routerKey = {
  Tabs: 'Tabs',
  LandingPage: 'LandingPage',
  ScanningView: 'ScanningView',
  BackpackPage: 'BackpackPage',
  InformationPage: 'InformationPage',
  StoryRecordPage: 'StoryRecordPage',
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
    submit: '發送',
    placeholder: '請輸入...',
    supportItems: ['需要幫忙', '請求支援', '找不到物品', '找不到展覽品'],
  },
};

export const storyRecordPageData = {
  title: '美術館事件簿',
  left: require('./assets/book.png'),
  right: require('./assets/right-arrow.png'),
};

import {ifIphoneX} from 'react-native-iphone-x-helper';
export const defaultTheme = {
  backgroundColor: '#efefef',
  ...ifIphoneX({marginTop: 0}, {marginTop: 10}),
};

export const ckeckPointList = [1001, 1002, 1003, 1004, 1005, 2001, 2002];
export const storyData = {
  1001: {
    name: '耶穌',
    img: '',
    story: [
      '什麼！蒙娜麗莎不見了，我現在才知道耶，搞不好你可以去問問看裡面那些畫，他們也許知道些什麼',
    ],
  },
  1002: {
    name: '章魚哥',
    img: '',
    story: [
      '蒙娜麗莎！?我什麼都不知道，你不要來問我，你去問Ｃ，你不要來問我（害怕的樣子）',
    ],
  },
  1003: {
    name: '聖龍',
    img: '',
    story: [
      '我有聽說過這幅畫曾經在館長室出現過，但我不知道館長室的位置在哪裡，雕像他們可能會知道',
    ],
  },
  1004: {
    name: '摩艾石像',
    img: '',
    story: [
      '（哼歌）',
      '才不告訴你咧，才不告訴你咧，除非你願意幫我解開這片拼圖，我再告訴你唄',
      '那我就不能告訴你囉，加油吧～～',
      '你怎麼又來拉，那我只好再給你一次機會囉，解不開我還是不會告訴你的呦^^',
      '欸我這邊還有一組數字，但我不知道是甚麼用途，不如一起給你們好了（得到館長室的密碼）',
    ],
  },
  1005: {
    name: '兵馬俑',
    img: '',
    story: [],
  },
  2001: {
    name: '館長室',
    img: '',
    story: [],
  },
  2002: {
    name: '修復室',
    img: '',
    story: [],
  },
};
