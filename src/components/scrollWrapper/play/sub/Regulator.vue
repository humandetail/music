<template>
  <div class="regulator-wrapper" @click.stop="handleHide">
    <transition
      enter-active-class="animated bounceInUp"
      leave-active-class="animated bounceOutDown"
    >
      <div class="wrapper" v-show="show">
        <!-- 音量控制区域 -->
        <div class="volume-row">
          <div class="btn" @click.stop="handleVolumeMute">
            <span
              class="icon iconimage"
              :class="volumeIconClass"
            ></span>
          </div>

          <div
            class="bar"
            ref="bar"
            @click.stop="handleBarClick"
          >
            <div class="shade"></div>
            <div class="current" :style="{width: currentVolume}"></div>
            <div
              class="control-btn"
              :style="{left: currentVolume}"
            >
              <drag-point
                :active="controlBtnIsActive"
                @changeActive="changePointActive"
                @changePosition="changePosition"
              ></drag-point>
            </div>
          </div>
        </div>

        <!-- 播放模式区域 -->
        <section class="mode-row border-top" @click.stop="">
          <h3 class="title">播放模式</h3>
          <ul class="list">
            <li
              v-for="(item, index) of playMode"
              class="item"
              :class="{current: playModeKind === index}"
              :key="index"
              @click="handleChangeMode(index)"
            >
              <span class="icon iconfont" :class="item.icon"></span>
              <span class="text">{{ item.text }}</span>
            </li>
          </ul>
        </section>

        <div class="close-btn border-top" @click="handleHide">关闭</div>
      </div>
    </transition>
  </div>
</template>

<script>
import utils from 'utils/tools';

import DragPoint from './DragPoint';

export default {
  name: 'Regulator',
  components: {
    DragPoint
  },
  props: {
    show: Boolean,
    volume: {
      type: Number,
      default () {
        return 0;
      }
    },
    playMode: {
      type: Array,
      default () {
        return [];
      }
    },
    playModeKind: {
      type: Number,
      default () {
        return 0
      }
    }
  },
  data () {
    return {
      volumeIcons: ['icon-volumn-mute', 'icon-volumn-1', 'icon-volumn-2'],
      memoryVolume: 0,
      controlBtnIsActive: false,
      barWidth: 0,
      barLeft: 0
    }
  },

  computed: {
    currentVolume () {
      return this.volume * 100 + '%'
    },
    volumeIconClass () {
      let volume = this.volume,
          idx = 0;
      if (volume <= 0) {
        idx = 0;
      } else if (volume <= 0.32) {
        idx = 1;
      } else {
        idx = 2;
      }
      return this.volumeIcons[idx];
    }
  },

  methods: {
    // 音量按钮点击
    handleVolumeMute () {
      if (this.volume > 0) {
        this.memoryVolume = this.volume;
        this.$emit('changeVolume', 0);
      } else {
        this.$emit('changeVolume', this.memoryVolume);
      }
    },
    handleBarClick (ev) {
      let e = ev || window.event,
          x = utils.getPagePos(e).x;
      
      this.setVolume(x);
    },

    handleChangeMode (index) {
      if (index !== this.playModeKind) {
        this.$emit('changePlayMode', index);
      }
    },
    
    setVolume (x) {
      if (!this.barWidth) {
        this.barWidth = utils.getStyles(this.$refs.bar, 'width');
      }
      if (!this.barLeft) {
        this.barLeft = utils.getElementDocPosition(this.$refs.bar).left;
      }
      
      let volume = (x - this.barLeft) / this.barWidth;

      this.$emit('changeVolume', volume > 1 ? 1 : (volume < 0 ? 0 : volume));
    },

    changePointActive (isActive) {
      this.controlBtnIsActive = isActive
    },

    changePosition (x) {
      this.setVolume(x);
    },

    handleHide () {
      this.$emit('hideRegulator', false);
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~styles/variables.scss';
@import '~styles/mixins.scss';
.regulator-wrapper {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 99;

  .wrapper {
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 101;
    width: 100%;
    max-height: 3.5rem;
    background-color: #fff;

    .volume-row {
      @include flex-row;
      align-items: center;
      height: $headerHeight;
      padding: 0 .1rem;
      font-size: $fs16;
      
      .btn {
        @include vh-center;
        width: .24rem;
        height: $headerHeight;

        .icon {
          width: .2rem;
          height: .2rem;
        }
      }

      .bar {
        position: relative;
        flex: 1;
        height: .2rem;
        margin: 0 .15rem;

        .shade,
        .current {
          position: absolute;
          left: 0;
          top: .08rem;
          height: .04rem;
          border-radius: .02rem;
        }

        .shade {
          width: 100%;
          background-color: $subGray;
        }

        .current {
          background-color: $mainColor;
        }

        .control-btn {
          position: absolute;
          left: 0;
          top: 0;
          width: .2rem;
          height: .2rem;
          margin-left: -.1rem;
        }
      }
    }

    .mode-row {
      padding: .1rem;

      .title {
        font-size: $fs16;
      }

      .list {
        @include flex-row;
        justify-content: space-between;
        flex-wrap: wrap;

        .item {
          @include flex-row;
          align-items: center;
          width: 48.5%;
          height: $headerHeight;
          margin-top: .1rem;
          padding: 0 .1rem;
          background-color: rgba(0, 0, 0, .1);
          box-sizing: border-box;

          .icon {
            width: .32rem;
            height: .32rem;
            line-height: .32rem;
            text-align: center;
          }

          .text {
            font-size: $fs16;
          }

          &.current {
            background-color: $mainColor;
            color: #fff;
          }
        }
      }
    }
    
    .close-btn {
      @include vh-center;
      height: $headerHeight;
      font-size: $fs16;
    }
  }
}
</style>