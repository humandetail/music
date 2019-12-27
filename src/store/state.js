
// 用户设置
let userSettings = {
  currentVolume: .5, // 当前音量
  memoryVolume: 1, // 记忆音量
  playModeKind: 2,
  playMode: [{
    type: 'order',
    text: '顺序播放',
    icon: 'icon-mode-order'
  }, {
    type: 'cycle',
    text: '列表循环',
    icon: 'icon-mode-cycle'
  }, {
    type: 'random',
    text: '随机播放',
    icon: 'icon-mode-random'
  }, {
    type: 'single-cycle',
    text: '单曲循环',
    icon: 'icon-mode-single-cycle'
  }, {
    type: 'single',
    text: '单曲播放',
    icon: 'icon-mode-single'
  }],
}

// 用户歌单
let playListKind = -1, // 当前播放列表索引
    playList = []; // 播放列表

// 收藏歌单
let collectionList = [];

try {
  if (!localStorage.getItem('userSettings')) { // 存储默认设置
    localStorage.setItem('userSettings', JSON.stringify(userSettings));
  } else { // 读取用户设置
    userSettings = JSON.parse(localStorage.getItem('userSettings'));
  }

  if (!localStorage.playListKind) {
    localStorage.playListKind = playListKind;
  } else {
    playListKind = localStorage.playListKind;
  }

  if (!localStorage.playList) {
    localStorage.playList = JSON.stringify(playList);
  } else {
    playList = JSON.parse(localStorage.playList);
  }
  
  if (!localStorage.collectionList) {
    localStorage.collectionList = JSON.stringify(collectionList);
  } else {
    collectionList = JSON.parse(localStorage.collectionList);
  }
} catch {}

const state = () => ({
  userSettings,
  playListKind,
  playList,
  collectionList
})

export default state;