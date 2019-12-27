/**
 * mutations
 */
export default {
  // 设置音量
  setVolume (state, volume) {
    let userSettings = Object.assign({}, state.userSettings, {
      currentVolume: volume
    });
    state.userSettings = userSettings;
    try {
      localStorage.userSettings = JSON.stringify(state.userSettings);
    } catch (e) {};
  },
  // 设置记忆音量
  setMemoryVolume (state, volume) {
    let userSettings = Object.assign({}, state.userSettings, {
      memoryVolume: volume
    });
    state.userSettings = userSettings;
    try {
      localStorage.userSettings = JSON.stringify(state.userSettings);
    } catch (e) {};
  },
  // 设置当前播放模式
  setPlayModeKind (state, modeKind) {
    let userSettings = Object.assign({}, state.userSettings, {
      playModeKind: modeKind
    });
    state.userSettings = userSettings;
    try {
      localStorage.userSettings = JSON.stringify(state.userSettings);
    } catch (e) {};
  },

  // 切换歌单当前播放
  setPlayListKind (state, idx) {
    state.playListKind = Number(idx);
    try {
      localStorage.playListKind = Number(idx);
    } catch (e) {};
  },
  // 歌单添加新音乐
  playListAddSong (state, songObj) {
    let list = [...state.playList, songObj]
    state.playList = list;
    try {
      localStorage.playList = JSON.stringify(list);
    } catch (e) {};
  },
  // 歌单删除音乐
  playListRemoveSong (state, songId) {
    let list = [...state.playList.filter((item) => item.id !== songId)];
    
    state.playList = list;
    try {
      localStorage.playList = JSON.stringify(list);
    } catch (e) {};
  },
  
  // 用户收藏添加新音乐
  collectionListAddSong (state, songObj) {
    let list = [...state.collectionList, songObj]
    state.collectionList = list;
    try {
      localStorage.collectionList = JSON.stringify(list);
    } catch (e) {};
  },
  // 用户收藏删除音乐
  collectionListRemoveSong (state, songId) {
    let list = [...state.collectionList.filter((item) => item.id !== songId)];
    
    state.collectionList = list;
    try {
      localStorage.collectionList = JSON.stringify(list);
    } catch (e) {};
  },
}