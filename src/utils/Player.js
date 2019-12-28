/**
 * 音乐播放器
 */
import store from '@/store';

import PlayModel from 'models/Play';

import playHandle from '@/decorator/playHandle';

@playHandle
class Player {
  constructor () {
    const instance = this.constructor.instance;
    if (instance) {
      return instance;
    }
    this.constructor.instance = this;

    this.playModel = new PlayModel();

    this.init();
  }

  // 获取是否为静音
  get muted () {
    return this.audio.muted;
  }
  // 设置开启/关闭静音
  set muted (isMuted) {
    this.audio.muted = Boolean(isMuted);
  }

  get volume () {
    return this.audio.volume;
  }

  set volume (val) {
    let volume = Number(val);
    if (!Object.is(NaN, volume)) {
      this.audio.volume = volume;
    }
  }

  // 获取音频是否为暂停状态
  get paused () {
    return this.audio.paused;
  }

  get readyState () {
    return this.audio.readyState;
  }

  get duration () {
    return this.audio.duration;
  }

  get ended () {
    return this.audio.ended;
  }

  get preload () {
    return this.audio.preload;
  }

  get currentTime () {
    return this.audio.currentTime;
  }

  set currentTime (time) {
    this.audio.currentTime = time;
  }

  get buffered () {
    if (this.audio.buffered.length > 0) {
      return this.audio.buffered.end(0)
    } else {
      return 0
    }
  }

  get currentSrc () {
    return this.audio.currentSrc;
  }

  init () {
    this.createPlayer();
    this.bindEvent();
  }

  bindEvent () {
    this.audio.addEventListener('ended', this.handleEnded.bind(this), false);
    this.audio.addEventListener('error', this.handleError.bind(this), false);
    // this.audio.addEventListener('timeupdate', this.handleTimeupdate.bind(this), false);
    this.audio.addEventListener('waiting', this.handleWaiting.bind(this), false);
  }

  // 生成audio对象
  createPlayer () {
    if (!this.audio) {
      this.audio = new Audio();
      this.audio.volume = store.state.userSettings.currentVolume;
      // document.body.appendChild(this.audio);
    }
  }

  handleEnded () {
    let {
      playListKind,
      playList,
      userSettings: {
        playModeKind,
        playMode
      }
    } = store.state,
        mode = playMode[playModeKind].type;

    switch (mode) {
      case 'single':
        break;
      case 'single-cycle':
        this.play();
        break;
      case 'order':
        if (playListKind !== playList.length - 1) {
          this.next();
        }
        break;
      case 'cycle':
        this.next();
        break;
      case 'random':
        this.next();
        break;
      default:
        break;
    }
  }
  
  handleWaiting () {
    console.log('正在缓冲~')
  }

  handleError (err) {
    console.log('音乐无法播放', err);
    // this.next();
    // this.play();
  }

  // 切换url
  changeUrl (id) {
    return new Promise((resolve, reject) => {
      // 获取音乐地址
      this.playModel.getSongUrl(id)
        .then((res) => {
          let {
            code,
            data: [
              { url }
            ]
          } = res;

          if (code !== 200 || !url) {
            resolve(this.next());
          } else {
            this.audio.src = url;
            this.audio.load();

            let _self = this;
            function canplay () {
              _self.audio.removeEventListener('canplay', canplay, false);
              resolve();
            }
            this.audio.addEventListener('canplay', canplay, false)
          }
        }).catch(reject);
    })
  }

  load () {
    if (!this.currentSrc) {
      let {
        playListKind: current,
        playList: list
      } = store.state;
      let url = list[current].url;
      this.changeUrl(url);
    } else {
      this.audio.load();
    }
  }

  play () {
    return new Promise((resolve, reject) => {
      if (!this.currentSrc) {
        let {
          playListKind: current,
          playList: list
        } = store.state;
        let id = list[current].id;
        this.changeUrl(id).then(() => {
          this.audio.play();
          resolve();
        }).catch(reject);
      } else {
        this.audio.play();
        resolve();
      }
    });
  }

  pause () {
    this.audio.pause();
  }

  prev () {
    this.switchSong('prev');
  }

  next () {
    this.switchSong('next');
  }

  switchSong (field) {
    let {playModeKind, playMode} = store.state.userSettings,
        mode = playMode[playModeKind].type;

    let {
      playListKind: current,
      playList: list
    } = store.state;

    let idx;

    switch (field) {
      case 'next':
        idx = Player.getNextSong(list, current, mode);
        break;
      case 'prev':
        idx = Player.getPrevSong(list, current, mode);
      default:
        break;
    }

    store.commit('setPlayListKind', idx);
    this.changeUrl(list[idx].id)
      .then(() => {
        this.play();
      });
  }
}

export default Player;