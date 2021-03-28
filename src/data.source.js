export const routerKey = {
  Tabs: 'Tabs',
  LandingPage: 'LandingPage',
  ScanningView: 'ScanningView',
  BackpackPage: 'BackpackPage',
  InformationPage: 'InformationPage',
  StoryRecordPage: 'StoryRecordPage',
};

export const landingPageData = {
  teamNamePH: '輸入團隊名稱',
  img: require('./assets/startPng.png'),
  background: require('./assets/landingBackground.png'),
};

export const TabData = {
  ScanningView: {
    icon: {
      normal: require('./assets/tabs/scan.png'),
    },
  },
  BackpackPage: {
    title: '背包',
    icon: {
      normal: require('./assets/tabs/backpack.png'),
      seleted: require('./assets/tabs/backpack-seleted.png'),
    },
  },
  InformationPage: {
    title: '資訊',
    icon: {
      normal: require('./assets/tabs/info.png'),
      seleted: require('./assets/tabs/info-seleted.png'),
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

import {ifIphoneX} from 'react-native-iphone-x-helper';
export const defaultTheme = {
  backgroundColor: '#efefef',
  ...ifIphoneX({marginTop: 0}, {marginTop: 10}),
};

export const NPCIDlist = [
  10000, // 神秘人
  10001, // 耶穌
  10002, // 章魚哥
  10003, // 主席
  10004, // 摩艾石像
  10005, // 兵馬俑
  30001, // 館長室
  30002, // 修復室
];

export const npcData = {
  nothing: {
    name: '這邊空蕩蕩',
    img: require('./assets/empty.jpg'),
    line: '目前沒有展覽品在附近\n｡ﾟヽ(ﾟ´Д`)ﾉﾟ｡',
  },
  10000: {
    name: '神秘人',
    img: require('./assets/npc/10000.jpg'),
    line:
      '本次任務為找到美術館遺失的蒙娜麗莎，包包裡有你們接下來將會需要的物品，祝你們好運!',
  },
  10001: {
    name: '耶穌',
    img: require('./assets/npc/10001.jpg'),
    first: [
      {
        line: '請問可以幫忙找一下我的聖經嗎？',
        options: ['博物館的東西失竊了\n我正忙著找呢別吵我'],
      },
      {
        line: '你是說蒙娜麗莎嗎？',
        options: ['對啊難道你有線索嗎？\n(是不是就快找到了啊也太簡單了吧...)'],
      },
      {
        line: '你不幫我我幹嘛幫你，去去去不幫忙別擋路',
        options: ['我幫我幫就是了，不幫你的話就拿不到線索了'],
      },
      {
        line: '謝謝囉，麻煩你了（回頭繼續找書）',
        options: ['（前往尋找聖經）'],
      },
    ],
    beforeBook: {
      line: '你找到我的書了嗎？',
      options: ['（前往尋找聖經）'],
    },
    wrongBook: [
      {
        line: '你找到我的書了嗎？',
        options: ['（交給耶穌）'],
      },
      {
        line: '這才不是我的書，這是什麼，你不能這樣騙我？',
        options: ['對不起對不起'],
      },
    ],
    rightBook: [
      {
        line: '噢，你在哪裡發現這本書的？',
        options: ['痾...在路上撿到的啦...'],
      },
      {
        line: '真是太謝謝你了，我有什麼可以幫忙到你的嗎？',
        options: ['你知道昨晚消失的蒙娜麗莎在哪裡嗎？'],
      },
      {
        line:
          '不太清楚耶，但我最近聽說那個邪惡的小泥偶好像有看到什麼，他最近正在大肆宣揚。',
        options: ['小泥偶，什麼小泥偶？'],
      },
      {
        line:
          '就是小泥偶阿，你自己去找吧，我要去看我的聖經了，上次看到哪裡了咧。',
        options: [
          '（什麼小泥偶阿，算了，在他發現那本書是假的前快走好了）\n你慢慢看書吧，我先走了(跑走)',
        ],
      },
      {
        line:
          '欸這是什麼啊，這才不是聖經，這不是聖經，你給我回來～我要召喚閃電打你',
        options: ['阿～一代一代一代'],
      },
    ],
    finish: {
      line: '你還敢回來啊，你這個騙子ˋˊ',
      options: ['快跑好了.....'],
    },
  },
  10002: {
    name: '章魚哥',
    img: require('./assets/npc/10002.jpg'),
    first: [
      {
        line: '（吹豎笛中）♪♫♬♩♪♫♬♭♫♪♫♬♩',
        options: ['這是甚麼聲音'],
      },
      {
        line: '是我吹的，我吹的很好吧!!',
        options: [
          '呃，還(好)不(難)錯(聽)，不對，我是來找畫作的，你有看到消失的蒙娜麗莎嗎？',
        ],
      },
      {
        line:
          '我不是很清楚欸，但你這麼一說我才發現今天都沒看到我的好朋友蒙娜麗莎，我有點擔心他，你可以幫我把他帶來找我嗎？',
        options: ['要找畫、還要找書，真多東西要找...'],
      },
      {
        line: '交給你了，我先去睡個美容覺',
        options: ['（東西給我找，你去睡覺是怎樣...）'],
      },
      {
        line: '昨天晚上被燈光一直閃來閃去的，害我都沒睡好',
        options: ['（繼續尋找蒙娜麗莎）'],
      },
    ],
    wait: {
      line: '我的好友蒙娜麗莎呢？快把他帶來見我！',
      options: ['（繼續尋找蒙娜麗莎）'],
    },
    final: {
      line: 'Rrrrrrr(打哈欠)，早安，你找到我的好朋友蒙娜麗莎了嗎？',
      code: 1506,
    },
    fail: {
      line: '這不是我的好朋友，你把我的好朋友帶去哪了，給我滾出去',
    },
    success: {
      line: '蒙娜麗莎，你終於回來了，我好想你',
    },
  },
  10003: {
    name: '主席',
    img: require('./assets/npc/10003.jpg'),
    first: [
      {
        line: '（正在看書）',
        options: ['哈囉，請問可以問你幾個問題嗎？'],
      },
      {
        line: '（把書闔上）喔～有什麼事情嗎',
        options: ['（它在看書耶，難道會是耶穌的聖經嗎？）'],
      },
      {
        line: '（把書闔上）喔～有什麼事情嗎',
        options: [
          '請問你有看到耶穌的聖經嗎？',
          '請問你有看到消失的蒙娜麗莎嗎？',
        ],
      },
    ],
    mission: [
      [
        {
          line:
            '你說的是這本書嗎？我可不能這麼簡單的把書交給你，我最近要發表一篇文章，但我需要一張照片來完成，你可以去幫我找到嗎？',
          options: ['（好吧，只好幫忙了）'],
        },
      ],
      [
        {
          line: '蒙娜麗莎？我沒什麼印象耶',
          options: ['（他不知道嗎...\n我問問看關於聖經的事情好了）'],
        },
        {
          line: '蒙娜麗莎？我沒什麼印象耶',
          options: ['那你有看到聖經嗎？'],
        },
        {
          line:
            '你說的是這本書嗎？我可不能這麼簡單的把書交給你，我最近要發表一篇文章，但我需要一張照片來完成，你可以去幫我找到嗎？',
          options: ['（好吧，只好幫忙了）'],
        },
      ],
    ],
    wait: {
      line: '你找到我需要的照片了嗎？',
      options: ['（繼續尋找照片）'],
    },
    afterMission: [
      {
        line:
          '真是謝謝你，這樣我就可以完成我最新的論文了，這本舊書就可以交給你了',
        options: ['什麼，不是聖經，是史書⋯你不是說是聖經嗎?'],
      },
      {
        line: '嗯？我沒跟你說是聖經阿，我只是說一本書而已',
        options: ['怎麼可以這樣...那我要怎麼跟耶穌交代...'],
      },
      {
        line:
          '是你沒聽清楚的，就不關我的事了哈哈，我要去完成我新的論文了，掰掰囉。',
        options: ['什麼跟什麼啊'],
      },
    ],
    finish: {
      line: '謝謝你囉，有你我才能完成這個文章',
      options: ['你這個話術大師......'],
    },
  },
  10004: {
    name: '摩艾石像',
    img: require('./assets/npc/10004.jpg'),
    inProcess: {
      line: '沒有什麼事情是我做不到的，你有什麼事嗎?',
      options: ['有求於你', '你可以自己上廁所嗎？'],
    },
    findPhoto: [
      {
        line: '有什麼事嗎？',
        options: ['我來尋找照片的'],
      },
      {
        line: '有阿，你說的是這個嗎？\n(拿出原圖)',
        options: ['你可以將它給我嗎？'],
      },
      {
        line: '好啊，那你去把它拼起來吧(撕碎)',
        options: ['（進入遊戲）'],
      },
    ],
    gameFail: {
      line: '連這個都解不開，你還想找到畫阿。',
      options: ['居然敢瞧不起我，那我更要把他拼回來了'],
    },
    again: {
      line: '你又來啦，想要照片就把它拼起來吧',
      options: ['（進入遊戲）'],
    },
    gameSuccess: [
      {
        line: '（居然拼起來了，這個人還是有兩把刷子的嘛）',
        options: ['我記住你了，你這個壞石像', '你看我把它拼起來了！'],
      },
      {
        line: '你通過了我的考驗，接下來如果你遇到了什麼困難，我都會盡力幫你的',
        options: ['太好了'],
      },
    ],
    changeBible: [
      {
        line: '有什麼事嗎？',
        options: ['史書變聖經'],
      },
      {
        line: '霹靂卡霹靂拉拉，波波莉娜貝貝魯多，史書變聖經',
        options: ['這是什麼狀況...\n小魔女DOREMI?'],
      },
      {
        line: '完成了，遇到困難隨時都可以再來找我喔',
        options: ['（獲得聖經）'],
      },
    ],
    clearVideo: [
      [
        {
          line: '有什麼事嗎？',
          options: ['幫我把影片變得清晰'],
        },
        {
          line: '可是我現在不想幫，我心情不好',
          options: ['為甚麼不好？'],
        },
        {
          line: '我剛剛跟我的好朋友兵馬俑吵架了',
          options: ['為什麼吵架？'],
        },
        {
          line: '不關你的事，我不想告訴你',
          options: ['兇什麼阿，不說就不說，我去問問兵馬俑'],
        },
      ],
      [
        {
          line: '你怎麼又回來了',
          options: ['為甚麼你要去告密'],
        },
        {
          line:
            '我這是為了他好，我要是不說的話，我怕兵馬俑下次會再做出一樣的事情，我可以幫你把影片變得清晰，作為答謝，我希望你可以代替我去跟兵馬俑道歉',
          options: ['(繼續)'],
        },
        {
          line: '霹靂卡霹靂拉拉，波波莉娜貝貝魯多，影片變清晰',
          options: ['你到底是石像還是小魔女DoReMi啊'],
        },
        {
          line: '完成了，希望你答應我的事你會做到',
          options: ['我會完成它的'],
        },
      ],
    ],
    notInProcess: {
      line: '沒有什麼事情是我做不到的，你有什麼事嗎?',
      options: ['沒甚麼事，有事再來找你', '你可以自己上廁所嗎？'],
    },
    angry: {
      line: '（生氣）給我滾開',
    },
  },
  10005: {
    name: '兵馬俑',
    img: require('./assets/npc/10005.jpg'),
    notInProcess: {
      line: '捏泥巴，捏泥巴，捏捏捏捏捏泥巴',
      options: ['（這個東西在幹嘛...捏泥巴？？？）'],
    },
    inProcess: [
      {
        line: '捏泥巴，捏泥巴，捏捏捏捏捏泥巴',
        options: ['（小泥偶...邪惡的小泥偶...該不會是這個吧）'],
      },
      {
        line: '捏泥巴，捏泥巴，捏捏捏捏捏泥巴',
        options: ['你是兵馬俑嗎？', '你是邪惡的小泥偶嗎？'],
      },
    ],
    answer: [
      [
        {
          line: '哈哈哈，我是偉大的兵馬俑，你有什麼事嗎？',
          options: ['我聽說你有一些關於消失的蒙娜麗莎的線索'],
        },
        {
          line: '噢，過來一點，我小聲的告訴你',
          options: ['（靠近兵馬俑）'],
        },
        {
          line: '（小聲的說）我不知道',
          options: ['你在跟我開什麼玩笑？我要走了'],
        },
        {
          line:
            '好啦好啦，我告訴你，我前幾天偷拿秦始皇的牌出來打，但是不小心弄亂了，你可以幫我把他整理好嗎？',
          options: ['整理牌那麼簡單的事你都不會，放心交給我吧'],
        },
      ],
      [
        {
          line:
            '什麼小泥偶，你全家都小泥偶，我是偉大的兵馬俑，小心我把你變成小泥偶',
          options: [
            '對不起對不起，我只是聽說你有一些關於消失的蒙娜麗莎的線索，想來問問看',
          ],
        },
        {
          line: '噢，過來一點，我小聲的告訴你',
          options: ['（靠近兵馬俑）'],
        },
        {
          line: '（小聲的說）我不知道',
          options: ['你在跟我開什麼玩笑？我要走了'],
        },
        {
          line:
            '好啦我告訴你，但你要幫我把這副牌整理好，前幾天不小心把牌弄亂了，到現在都還沒整理好，再不整理好秦始皇會把我殺掉的',
          options: ['我最喜歡玩牌了，讓我試試看'],
        },
      ],
    ],
    gameFail: {
      line: '你也整理不好啊，還敢說我啊。',
      options: ['再試一次'],
    },
    gameSuccess: [
      {
        line: '真是謝謝你，這樣我就不會被秦始皇殺掉了，我要趕快去告訴他(跑走)',
        options: ['欸，等一下，你還沒告訴我關於畫作的線索耶'],
      },
      {
        line:
          '對齁，真是抱歉，我其實那天晚上有看到一個很奇怪的人，不過我沒有看清楚，館長室裡面有監視器的畫面，你可以去看看',
        options: ['館長室在哪裡啊？'],
      },
      {
        line: '我不太清楚欸，但是博物館裡一直流傳著一段關於館長室的傳說',
        options: ['什麼傳說？'],
      },
      {
        line:
          '在博物館三樓的最深處，有一個亮亮的東西，只要你找到了它，你就可以知道這個博物館發生的事情',
        options: ['（什麼意思啊...）'],
      },
      {
        line: '你就自己想想吧，我要趕快把牌放回去，不然被發現就糟糕了。',
        options: ['（前往尋找）'],
      },
    ],
    fighting: [
      [
        {
          line: '你怎麼又回來找我，有什麼事嗎',
          options: ['聽說你跟石像吵架了，發生什麼事了'],
        },
        {
          line: '因為石像偷偷去跟秦始皇告狀，害我被秦始皇臭罵一頓',
          options: ['那有什麼我可以幫到你們的嗎？'],
        },
        {
          line: '我希望石像可以來跟我道歉',
          options: ['（這兩個怎麼這麼麻煩阿...）'],
        },
      ],
      [
        {
          line: '原來是這樣，我誤會他了，真是謝謝你幫我把這封信帶來',
          options: ['沒事就好'],
        },
      ],
    ],
    finish: {
      line: '兵馬俑目前不在線，去跟秦始皇打牌了',
      options: ['這小泥偶下線了...'],
    },
  },
  30001: {
    name: '館長室',
    data: [],
  },
  30002: {
    name: '修復室',
    tip:
      '此處有六幅相同的畫，不同的地方只有畫的編碼，其中只有一幅畫的編碼是正確的，編碼的提示就在這裡，不過只有一次機會可以拿走畫。',
  },
};

export const checkPointDataList = [
  {id: 0, name: '基督教', rate: 5, point: 5}, //5
  {id: 1, name: '我滴朋朋', rate: 5, point: 10}, //10
  {id: 2, name: '作家', rate: 5, point: 15}, //15
  {id: 3, name: '拼圖好手', rate: 10, point: 25}, //25
  {id: 4, name: '話術大師', rate: 10, point: 35}, //35
  {id: 5, name: '小魔女DoReMi', rate: 5, point: 40}, //40
  {id: 6, name: '100萬伏特', rate: 5, point: 45}, //45
  {id: 7, name: '翻牌如翻掌', rate: 10, point: 55}, //55
  {id: 8, name: '解密大師', rate: 20, point: 75}, //75
  {id: 9, name: '高清無碼影片', rate: 5, point: 80}, //80
  {id: 10, name: '差之分毫', rate: 10, point: 90}, //90
  {id: 11, name: '慧眼識畫作', rate: 20, point: 100}, //100
];

export const achievementData = [
  {id: 0, name: checkPointDataList[0], img: '', description: ''},
  {id: 1, name: checkPointDataList[1], img: '', description: ''},
  {id: 2, name: checkPointDataList[2], img: '', description: ''},
  {id: 3, name: checkPointDataList[3], img: '', description: ''},
  {id: 4, name: checkPointDataList[4], img: '', description: ''},
  {id: 5, name: checkPointDataList[5], img: '', description: ''},
  {id: 6, name: checkPointDataList[6], img: '', description: ''},
  {id: 7, name: checkPointDataList[7], img: '', description: ''},
  {id: 8, name: checkPointDataList[8], img: '', description: ''},
  {id: 9, name: checkPointDataList[9], img: '', description: ''},
  {id: 10, name: checkPointDataList[10], img: '', description: ''},
  {id: 11, name: checkPointDataList[11], img: '', description: ''},
  {id: 12, name: '小白目', img: '', description: ''},
  {id: 13, name: '嘗試拼圖', img: '', description: ''},
  {id: 14, name: '乖小孩是不可以騙人的喔', img: '', description: ''},
  {id: 15, name: '記憶力待加強', img: '', description: ''},
  {id: 16, name: '和事佬', img: '', description: ''},
];

export const musicData = {
  background: require('./assets/music/background.mp3'),
  click: require('./assets/music/click.mp3'),
  fail: require('./assets/music/fail.mp3'),
  success: require('./assets/music/success.mp3'),
  gameSuccess: require('./assets/music/gameSuccess.wav'),
  gameFail: require('./assets/music/gameFail.mp3'),
};

export const videoData = {
  firstHalfInterference: {
    key: 'firstHalfInterference',
    name: '模糊的前半段',
    source: require('./assets/video/first-half-interference.mp4'),
    img: require('./assets/item/video.png'),
    description: '在館長室獲得的模糊的前半段\n（輕觸影片即可放大）',
    buttonType: 'video',
  },
  firstHalf: {
    key: 'firstHalf',
    name: '清晰的前半段',
    source: require('./assets/video/first-half.mp4'),
    img: require('./assets/item/video.png'),
    description: '從摩艾石像那邊拿到的清晰的前半段\n（輕觸影片即可放大）',
    buttonType: 'video',
  },
  secondHalf: {
    key: 'secondHalf',
    name: '模糊的後半段',
    source: require('./assets/video/second-half.mp4'),
    img: require('./assets/item/video.png'),
    description: '在館長室獲得的模糊的後半段\n（輕觸影片即可放大）',
    buttonType: 'video',
  },
};

export const itemsData = {
  terms: {
    key: 'terms',
    name: '注意事項',
    img: require('./assets/item/terms.png'),
    description: '【消失的畫作】遊玩注意事項，請詳細閱讀，並牢記於腦海中',
    buttonType: 'open',
    content: {
      title: '遊戲注意事項',
      text: `
遊戲注意事項：\n
１. 遊戲範圍為管一2～3樓，遊戲時間為50分鐘
２. 嚴禁破壞道具及設備，若惡意破壞遊戲道具，將以原價要求賠償
３. 請勿攻擊工作人員
４. 遊戲過程中若有任何疑問可以詢問身旁的工作人員
５. 遊戲過程中若感到身體不適，請告知身旁工作人員
６. 遊戲結束後將袋子裡原有道具歸位
７. 為留存遊戲資料，遊戲過程中將會進行錄影及攝影
８. 過程中有2次的提示機會，若需要提示請告知隨行的工作人員
９. 若進入遊戲中保全的手電筒範圍則整組定格10秒鐘，若聽到鈴聲請小心避開`,
    },
  },
  checkList: {
    key: 'checkList',
    name: '進度紀錄',
    img: require('./assets/item/checklist.png'),
    description: 'description',
    buttonType: 'open',
  },
  achievement: {
    key: 'achievement',
    name: '成就',
    img: require('./assets/item/achievement.png'),
    description: 'description',
    buttonType: 'open',
  },
  book: {
    key: 'book',
    name: '事件記錄簿',
    img: require('./assets/item/book.png'),
    description: '此行在博物館的遭遇紀錄',
    buttonType: 'open',
  },
  image: {
    key: 'image',
    name: '照片',
    img: require('./assets/item/image.png'),
    description: '印有內容的照片',
    buttonType: null,
  },
  history: {
    key: 'history',
    name: '史書',
    img: require('./assets/item/history.png'),
    description: '《資治通鑑》司馬光著',
    buttonType: null,
  },
  bible: {
    key: 'bible',
    name: '假聖經',
    img: require('./assets/item/bible.png'),
    description:
      '    觀自在菩薩，行深般若波羅蜜多時，照見五蘊皆空，度一切苦厄。',
    buttonType: null,
  },
  lightning: {
    key: 'lightning',
    name: '閃電',
    img: require('./assets/item/lightning.png'),
    description: '把玩家電到一代一代的東西',
    buttonType: null,
  },
  cardGames: {
    key: 'cardGames',
    name: '撲克牌',
    img: require('./assets/item/card-games.png'),
    description: '秦始皇的撲克牌',
    buttonType: null,
  },
  paper: {
    key: 'paper',
    name: '道歉信',
    img: require('./assets/item/paper.png'),
    description: '摩艾石像的道歉信',
    buttonType: null,
  },
  ...videoData,
};
