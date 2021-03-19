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

/**
 *
 * start at 1 is normal
 *
 * start at 2 is mission
 *
 * start at 3 is room
 */
export const NPCIDlist = [
  10001, // 耶穌
  10002, // 章魚哥
  10003, // 聖龍
  20001, // 摩艾石像
  20002, // 兵馬俑
  30001, // 館長室
  30002, // 修復室
];

export const npcData = {
  nothing: {
    name: '這邊空蕩蕩',
    img: require('./assets/Walters_Gallery.jpg'),
    lines: '目前沒有展覽品在附近\n｡ﾟヽ(ﾟ´Д`)ﾉﾟ｡',
  },
  10001: {
    name: '耶穌',
    img: require('./assets/npc/10001.jpg'),
    lines:
      '什麼！蒙娜麗莎不見了，我現在才知道耶，搞不好你可以去問問看裡面那些畫，他們也許知道些什麼',
  },
  10002: {
    name: '章魚哥',
    img: require('./assets/npc/10002.jpg'),
    lines:
      '蒙娜麗莎！？我什麼都不知道，你不要來問我，你去問聖龍，你不要來問我（害怕的樣子）',
  },
  10003: {
    name: '聖龍',
    img: require('./assets/Walters_Gallery.jpg'),
    lines:
      '我有聽說過這幅畫曾經在館長室出現過，但我不知道館長室的位置在哪裡，雕像他們可能會知道',
  },
  20001: {
    name: '摩艾石像',
    img: require('./assets/npc/20001.jpg'),
    notInProcess: {
      lines: ['（哼歌）'],
      options: [],
    },
    inProcess: {
      lines: [
        '才不告訴你咧，才不告訴你咧，除非你願意幫我解開這片拼圖，我再告訴你唄',
      ],
      options: ['（進入遊戲）'],
    },
    gameFail: {
      lines: '那我就不能告訴你囉，加油吧～～',
      options: ['這什麼爛拼圖，不解了不解了'],
      then: {
        lines: [
          '你怎麼又來拉，那我只好再給你一次機會囉，解不開我還是不會告訴你的呦^^',
        ],
        options: ['（進入遊戲）'],
      },
    },
    gameSuccess: {
      lines: [
        '欸我這邊還有一組數字，但我不知道是甚麼用途，不如一起給你們好了（得到館長室的密碼）',
      ],
    },
  },
  20002: {
    name: '兵馬俑',
    img: require('./assets/Walters_Gallery.jpg'),
    notInProcess: {
      lines: ['還沒給我'],
      options: [],
    },
    inProcess: [
      {
        lines: ['你找我嗎？有事嗎？'],
        options: [
          '我是來找遺失的蒙娜麗莎的',
          '沒事，我就只是路過看看你好不好',
          'ㄌㄩㄝ~~鬼臉，打我啊打我啊',
        ],
      },
      {
        lines: [
          '（慌張害怕）如果..如果你願意幫助我，我就告訴你發生了什麼事',
          '喔好吧，謝謝你的關心^^ ',
          '（生氣）走開',
        ],
        options: ['我答應你，我會保護你的'],
      },
      {
        lines: ['我被別人威脅，不能把那天晚上看到的說出去'],
        options: [
          '是誰？',
          '你被威脅了什麼？',
          '你放心，我說到的一定會做到，我能幫到你甚麼',
        ],
      },
      {
        lines: [
          '我的小孩被那個人抓走了，我有一個可以救出他的方法，你可以幫幫我嗎？如果你願意的話，我就告訴你我看見了什麼',
        ],
        options: ['（進入遊戲）'],
      },
    ],
    gameFail: {
      lines: '連你都不能成功嗎.....',
    },
    gameSuccess: {
      lines: [
        '謝謝你，你幫了我一個大忙，這樣我就不用冒著風險去賣畫了，我把畫放在修復室裡，真的是太謝謝你了。',
      ],
      options: ['慢著！該告訴我的話呢！'],
    },
    after: {
      lines: [
        '噢，對齁，我那天晚上看到保全一個人鬼鬼祟祟的在藏東西，形狀看起來有點像是畫，你可以去調查他一下。',
      ],
      options: ['保全嗎......我去問問看好了'],
    },
  },
  30001: {
    name: '館長室',
    data: [],
  },
  30002: {
    name: '修復室',
    data: [],
  },
};

export const checkPointDataList = [
  {point: 1, name: '線索一', rate: 10}, //10
  {point: 2, name: '嘗試拼圖', rate: 10}, //20
  {point: 3, name: '拼圖太難', rate: 10}, //30
  {point: 4, name: '拼圖算什麼', rate: 10}, //40
  {point: 5, name: '監視錄影最好看', rate: 20}, //60
  {point: 6, name: '助人為樂', rate: 5}, //65
  {point: 7, name: '嘗試翻牌遊戲', rate: 5}, //70
  {point: 8, name: '嘗試翻牌遊戲', rate: 5}, //75
  {point: 9, name: '感激不盡', rate: 5}, //80
  {point: 10, name: '摩斯本人', rate: 10}, //90
  {point: 11, name: '解碼能手', rate: 5}, //95
  {point: 12, name: '慧眼識畫作', rate: 15}, //>100
];
