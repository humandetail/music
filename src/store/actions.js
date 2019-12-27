/**
 * actions
 */

export default {
  // 添加新歌曲到歌曲列表
  async playListAddSong ({state, commit}, songObj) {
    // console.log(songObj)
    commit('playListAddSong', songObj);
    if (state.playListKind === -1) { // 如果没有当前播放音乐，则把此次音乐作为当前播放音乐
      commit('setPlayListKind', 0);
    }
  },
  // 删除歌曲列表中的歌曲
  playListRemoveSong ({commit}, id) {
    commit('playListRemoveSong', id);
  },
  
  // 添加新歌曲到收藏列表
  collectionListAddSong ({commit}, songObj) {
    commit('collectionListAddSong', songObj);
  },
  // 删除收藏列表中的歌曲
  collectionListRemoveSong ({commit}, id) {
    commit('collectionListRemoveSong', id);
  },
}