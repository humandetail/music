<template>
  <div class="scroll-wrapper" ref="wrapper">
    <loading :show="showLoading" />
    <div class="wrapper" v-if="!showLoading">
      <!-- 歌手名称 -->
      <singer
        :singer="currentSongInfo.singer"
      />
      <!-- 歌曲封面 -->
      <cover
        :img="currentSongInfo.cover"
        :playing="isPlaying"
      />
      <!-- 歌词 -->
      <lyric
        :lyric="currentSongInfo.lyric"
        :currentTime="currentTime"
        :totalTime="totalTime"
        :id="currentId"
      />
      <!-- 播放控制 -->
      <div class="control-wrapper">
        <progress-bar
          :currentTime="currentTime"
          :totalTime="totalTime"
          :buffered="buffered"
          @changeProgress="changeProgress"
        />
        <volume-bar
          :volume="currentVolume"
          @click.native="toggleRegulator(true)"
        />
      </div>
      <div class="control-wrapper play-control">
        <mode-bar
          :icon="playMode[playModeKind].icon"
          @toggleRegulator="toggleRegulator"
        />
        <change-btn
          mode="prev"
          @switchSong="switchSong"
        />
        <play-btn
          :mode="playBtnMode"
          ref="playBtn"
          @btnClick="handlePlayBtnClick"
        />
        <change-btn
          mode="next"
          @switchSong="switchSong"
        />
        <song-list />
      </div>

      <!-- 调节器 -->
      <regulator
        v-show="showRegulator"
        :show="showRegulator"
        :volume="currentVolume"
        :playMode="playMode"
        :playModeKind="playModeKind"
        @changeVolume="changeVolume"
        @changePlayMode="changePlayMode"
        @hideRegulator="toggleRegulator"
      />
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll';

import utils from 'utils/tools';

import PlayModel from 'models/Play';

import { mapState, mapMutations } from 'vuex';

import Singer from './sub/Singer';
import Cover from './sub/Cover';
import Lyric from './sub/Lyric';
import ProgressBar from './sub/ProgressBar';
import VolumeBar from './sub/VolumeBar';
import ModeBar from './sub/ModeBar';
import ChangeBtn from './sub/ChangeBtn';
import PlayBtn from './sub/PlayBtn';
import SongList from './sub/SongList';
import Regulator from './sub/Regulator';
import Loading from '@/components/scrollWrapper/sub/Loading';

const playModel = new PlayModel();

export default {
  name: 'PlayMain',
  components: {
    Singer,
    Cover,
    Lyric,
    ProgressBar,
    VolumeBar,
    ModeBar,
    ChangeBtn,
    PlayBtn,
    SongList,
    Regulator,
    Loading
  },
  data () {
    return {
      showLoading: true,

      currentTime: 0, // 当前播放的秒数
      totalTime: 0, // 音频总秒数
      buffered: 0, // 缓冲
      showRegulator: false, // 是否显示调节器
      isPlaying: false, // 是否正在播放

      requestId: null, // requestAnimationFrame的ID
      timer: null,
      fps: 1, // 每秒一帧

      songInfo: {},

      // playBtnMode: 'play',
    }
  },
  computed: {
    ...mapState({
      currentVolume: state => state.userSettings.currentVolume,
      playMode: state => state.userSettings.playMode,
      playModeKind: state => state.userSettings.playModeKind,

      playList: state => state.playList,
      playListKind: state => state.playListKind,
    }),

    currentId () {
      return this.playList[this.playListKind].id;
    },

    // 当前音乐
    currentSongInfo () {
      return this.songInfo[this.currentId] || {}
    },

    // 播放按钮模式
    playBtnMode () {
      // console.log(this.audioPlayer.paused)
      return !this.isPlaying ? 'play' : 'pause'
    }
  },
  methods: {
    ...mapMutations({
      setVolume: 'setVolume',
      changePlayMode: 'setPlayModeKind'
    }),
    // 音量设置
    changeVolume (volume) {
      this.setVolume(volume);
      this.audioPlayer.volume = volume;
    },
    // ------------
    toggleRegulator (isShow) {
      this.showRegulator = isShow;
    },

    // 改变当前播放进度
    changeProgress (percent) {
      if (!this.audioPlayer.currentSrc) {
        this.audioPlayer.play()
          .then(() => {
            this.totalTime = Math.ceil(this.audioPlayer.duration)
            this.currentTime = Math.ceil(this.totalTime * percent);
            this.audioPlayer.currentTime = this.currentTime;
          });
      } else {
        this.totalTime = Math.ceil(this.audioPlayer.duration)
        this.currentTime = Math.ceil(this.totalTime * percent);
        this.audioPlayer.currentTime = this.currentTime;
      }
    },

    // 点击播放按钮
    handlePlayBtnClick () {
      if (this.audioPlayer.paused) {
        this.play();
      } else {
        this.pause();
      }
    },

    play () {
      this.audioPlayer.play()
    },
    pause () {
      this.audioPlayer.pause();
    },

    

    // 实时获取播放数据
    playing () {
      this.timer = setTimeout(() => {
        this.isPlaying = true;
        
        this.buffered = this.audioPlayer.buffered;
        // 播放时间
        this.totalTime = this.audioPlayer.duration || 0;
        // 总时长
        this.currentTime = this.audioPlayer.currentTime || 0;

        if (this.currentTime < this.totalTime) {
          this.requestId = requestAnimationFrame(this.playing);
        } else {
          this.cancelAnimation();
        }
      }, 1000 / this.fps);
    },
    // 取消获取播放数据
    cancelAnimation () {
      this.isPlaying = false;
      clearTimeout(this.timer);
      cancelAnimationFrame(this.requestId);
    },

    switchSong (field) {
      this.audioPlayer.switchSong(field);
      this.cancelAnimation();
      this.playing();
    },

    // ----------
    async getDatas () {
      
      this.showLoading = true;

      let playList = this.playList,
          id = this.currentId;

      if (!this.songInfo[id]) {
        let {
          code,
          songs: [
            detail
          ]
        } = await playModel.getDetail(id);

        let lrcRes = await playModel.getLyric(id);

        if (code === 200) {
          let lyric;
          if (lrcRes.code !== 200 || lrcRes.nolyric) {
            // 歌词不存在
            lyric = ''
          } else {
            lyric = lrcRes.lrc.lyric
          }
          this.songInfo = Object.assign({}, this.songInfo, {
            [id]: {
              id: detail.id,
              name: detail.name,
              singer: detail.ar[0].name || '未知',
              cover: detail.al.picUrl,
              lyric: utils.parseLyric(lyric)
            }
          });
        } else {
          console.log('歌曲数据获取失败')
        }
      }
      setTimeout(() => {
        this.showLoading = false;
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.wrapper);
        });
      }, 300)
    },

    addListener () {
      this.audioPlayer.audio.addEventListener('play', this.playing, false);
      this.audioPlayer.audio.addEventListener('pause', this.cancelAnimation, false);
    },

    removeListener () {
    // console.log('destroyed')
      this.cancelAnimation();
      this.audioPlayer.audio.removeEventListener('play', this.playing, false);
      this.audioPlayer.audio.removeEventListener('pause', this.cancelAnimation, false);
    },

    checkStatus () {
      if (!this.audioPlayer.paused) {
        this.playing();
      } else {
        if (this.audioPlayer.currentTime > 0) {
          this.buffered = this.audioPlayer.buffered;
          // 播放时间
          this.currentTime = this.audioPlayer.currentTime || 0;
          // 总时长
          this.totalTime = this.audioPlayer.duration || 0;
        }
      }
    }
  },

  mounted () {
    this.getDatas();
    this.addListener();
    this.checkStatus();
  },

  beforeDestroy () {
    this.removeListener();
  },
  
  watch: {
    currentId (newId) {
      this.getDatas();
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~styles/mixins.scss';
@import '~styles/variables.scss';
.control-wrapper {
  @include flex-row;
  align-items: center;
  height: $headerHeight;
  padding: 0 .1rem;

  &.play-control {
    justify-content: space-between;
    height: 1.1rem;
  }
}
</style>