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
  10000, // 神秘人
  10001, // 耶穌
  10002, // 章魚哥
  10003, // 主席
  10004, // 石像
  10005, // 兵馬俑
  30001, // 館長室
  30002, // 修復室
];

export const npcData = {
  nothing: {
    name: '這邊空蕩蕩',
    img: require('./assets/empty.png'),
    lines: '目前沒有展覽品在附近\n｡ﾟヽ(ﾟ´Д`)ﾉﾟ｡',
  },
  10000: {
    name: '神秘人',
    img: require('./assets/npc/10000.jpg'),
    lines:
      '本次任務為找到美術館遺失的蒙娜麗莎，包包裡有你們接下來將會需 要的物品(手電筒、借到教室的卡片)，祝你們好運!',
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
      '蒙娜麗莎！？我什麼都不知道，你不要來問我，你去問主席，你不要來問我（害怕的樣子）',
  },
  10003: {
    name: '主席',
    img: require('./assets/npc/10003.jpg'),
    lines:
      '我有聽說過這幅畫曾經在館長室出現過，但我不知道館長室的位置在哪裡，雕像他們可能會知道',
  },
  10004: {
    name: '石像',
    img: require('./assets/npc/10004.jpg'),
    notInProcess: {
      lines: '（哼歌）',
      options: [],
    },
    inProcess: {
      lines:
        '才不告訴你咧，才不告訴你咧，除非你願意幫我解開這片拼圖，我再告訴你唄',
      options: ['（進入遊戲）'],
    },
    gameFail: {
      lines: '好笨喔！！這個都解不開，還想找畫阿。',
      options: ['這什麼爛拼圖，不解了不解了'],
    },
    afterGameFail: {
      lines: '那我就不能告訴你囉，加油吧～～',
      options: ['（繼續）'],
    },
    again: {
      lines:
        '你怎麼又來拉，那我只好再給你一次機會囉，解不開我還是不會告訴你的呦^^',
      options: ['（進入遊戲）'],
    },
    gameSuccess: {
      lines: '（居然解開了，這個人還是有兩把刷子的嘛）',
      options: ['這拼圖好難解....', '你看我解開拼圖了！\n快點稱讚我快點稱讚我'],
    },
    finish: {
      lines:
        '真是恭喜你啊，那我就告訴你館長室在MA316吧，但我就只知道這些了，我真的不知道畫在哪裡',
      options: [],
    },
  },
  10005: {
    name: '兵馬俑',
    img: require('./assets/npc/10005.jpg'),
    notInProcess: {
      lines: '你找我嗎？有事嗎？',
      options: ['沒事，我就只是路過看看你好不好', 'ㄌㄩㄝ~~鬼臉，打我啊打我啊'],
    },
    inProcess: [
      {
        lines: '你找我嗎？有事嗎？',
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
    ],
    onProtect: [
      {
        lines: '我被別人威脅，不能把那天晚上看到的說出去',
        options: [
          '是誰？',
          '你被威脅了什麼？',
          '你放心，我說到的一定會做到\n我能幫到你甚麼',
        ],
      },
      {
        lines:
          '我的小孩被那個人抓走了，我有一個可以救出他的方法，你可以幫幫我嗎？如果你願意的話，我就告訴你我看見了什麼',
        options: ['（進入遊戲）'],
      },
    ],
    gameFail: {
      lines: '就快成功了！！再試一次吧！（我終於可以見到我的孩子了嗎ಥ_ಥ）',
      options: ['（再試一次）'],
    },
    gameSuccess: {
      lines: '謝謝你，你幫了我一個大忙（跑去找孩子）',
      options: ['慢著！該告訴我的話呢！'],
    },
    finish: {
      lines:
        '噢，對齁，我那天晚上看到保全一個人鬼鬼祟祟的在藏東西，形狀看起來有點像是畫，你可以去調查他一下。',
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
  {point: 0, name: '線索一', rate: 10}, //10
  {point: 1, name: '嘗試拼圖', rate: 10}, //20
  {point: 2, name: '拼圖算什麼', rate: 10}, //30
  {point: 3, name: '線索二', rate: 10}, //40
  {point: 4, name: '名偵探科科', rate: 20}, //60
  {point: 5, name: '007保護我', rate: 5}, //65
  {point: 6, name: '嘗試翻牌', rate: 5}, //70
  {point: 7, name: '翻牌如翻掌', rate: 5}, //75
  {point: 8, name: '地圖太大了吧', rate: 5}, //80
  {point: 9, name: '摩斯本人', rate: 10}, //90
  {point: 10, name: '解碼能手', rate: 5}, //95
  {point: 11, name: '慧眼識畫作', rate: 15}, //>100
];

export const musicData = {
  background: require('./assets/music/background.mp3'),
  click: require('./assets/music/click.mp3'),
  fail: require('./assets/music/fail.mp3'),
  success: require('./assets/music/success.mp3'),
};
