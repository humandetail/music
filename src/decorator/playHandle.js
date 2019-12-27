
export default (target) => {
  /**
   * @name 获取下一曲
   * @param { Array } playList 当前播放的音乐列表
   * @param { Number } current 当前索引
   * @param { String } mode 当前的播放模式
   */
  target.getNextSong = (playList, current, mode) => {
    if (mode === 'random') {
      let idx = getRandom(0, playList.length, current);
      console.log(idx, current)
      return idx;
    } else {
      if (current === playList.length - 1) {
        return 0;
      } else {
        return current + 1;
      }
    }
  }

  /**
   * @name 获取上一曲
   * @param { Array } playList 当前播放的音乐列表
   * @param { Number } current 当前索引
   * @param { String } mode 当前的播放模式
   */
  target.getPrevSong = (playList, current, mode) => {
    if (mode === 'random') {
      let idx = getRandom(0, playList.length, current);
      return idx;
    } else {
      if (current === 0) {
        return playList.length - 1;
      } else {
        return current - 1;
      }
    }
  }

  function getRandom (min, max, current) {
    let random = Math.floor(Math.random() * (max - min) - min);
    if (random == current) {
      return getRandom(min, max, current);
    } else {
      return random;
    }
  }

}