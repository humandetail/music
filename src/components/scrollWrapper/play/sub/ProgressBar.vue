<template>
  <div class="progress-bar">
    <span class="time current">{{ cTime }}</span>
    <div class="progress" @click.stop="handleBarClick">
      <div class="bar" ref="bar">
        <div class="buffer" :style="{width: bufferedWidth}"></div>
        <div class="current" :style="{width: progressPercent}"></div>
      </div>
      <div
        class="control-btn"
        :style="{left: progressPercent}"
      >
        <drag-point
          :active="controlBtnIsActive"
          @changeActive="changePointActive"
          @changePosition="changePosition"
        ></drag-point>
      </div>
    </div>
    <span class="time total">{{ tTime }}</span>
  </div>
</template>

<script>
import utils from 'utils/tools';

import DragPoint from './DragPoint';

export default {
  name: 'ProgressBar',
  components: {
    DragPoint
  },
  data () {
    return {
      progressWidth: 0,
      progressLeft: 0,
      controlBtnIsActive: false
    }
  },

  props: {
    buffered: {
      type: Number,
      default () {
        0
      }
    },
    currentTime: {
      type: [String, Number],
      default () {
        return '0';
      }
    },
    totalTime: {
      type: [String, Number],
      default () {
        return '0';
      }
    }
  },

  computed: {
    cTime () {
      return utils.formatTime(this.currentTime);
    },
    tTime () {
      return utils.formatTime(this.totalTime);
    },

    bufferedWidth () {
      return (this.buffered / this.totalTime) * 100 + '%';
    },
    
    progressPercent () {
      // console.log(this.currentTime)
      return this.currentTime / this.totalTime * 100 + '%';
    }
  },

  methods: {
    handleBarClick (ev) {
      let e = ev || window.event,
          tar = e.target || e.srcElement;

      if (tar !== this.$refs.controlBtn) {
        let { x } = utils.getPagePos(e);
        this.setProgress(x, 'click');
      }
    },

    // 设置播放进度
    setProgress (x, field) {
      if (!this.progressWidth) {
        this.progressWidth = utils.getStyles(this.$refs.bar, 'width');
      }
      if (!this.progressLeft) {
        this.progressLeft = utils.getElementDocPosition(this.$refs.bar).left;
      }
      let percent = (x - this.progressLeft) / this.progressWidth;
      this.$emit('changeProgress', percent > 1 ? 1 : (percent < 0 ? 0 : percent), field);
    },

    
    changePointActive (isActive) {
      this.controlBtnIsActive = isActive;
    },

    changePosition (x) {
      this.setProgress(x);
    }
  },
}
</script>

<style lang="scss" scoped>
@import '~styles/variables.scss';
@import '~styles/mixins.scss';
.progress-bar {
  flex: 1;
  @include flex-row;
  align-items: center;
  height: $headerHeight;
  .time {
    font-size: .14rem;
  }

  .progress {
    position: relative;
    flex: 1;
    height: .08rem;
    margin: 0 .15rem;
    padding: .1rem 0;

    .bar {
      position: relative;
      width: 100%;
      height: .08rem;
      background-color: $defaultGray;
      border-radius: .04rem;

      .buffer,
      .current {
        position: absolute;
        left: 0;
        top: 0;
        height: .08rem;
        border-radius: .04rem;
      }
    
      .buffer {
        z-index: 1;
        width: 0;
        background-color: $subGray;
        opacity: .5;
      }
      .current {
        width: 0%;
        z-index: 2;
        background-image: $gradient;
      }
    }

    .control-btn {
      position: absolute;
      left: 0;
      top: .035rem;
      z-index: 3;
      width: .2rem;
      height: .2rem;
      margin-left: -.1rem;
    }
  }
}
</style>