<template>
  <div class="lyric-wrapper">
    <div class="no-lyric" v-if="lyric.length <= 0">暂无歌词</div>
    <div class="lyric-list" ref="list" v-else>
      <div
        ref="item"
        class="lyric-item"
        :class="curIdx === index ? 'active' : ''"
        v-for="(item, index) of lyric"
        :key="index"
      >{{ item.text }}</div>
    </div>
  </div>
</template>

<script>
import utils from 'utils/tools';
export default {
  name: 'Lyric',
  props: {
    lyric: {
      type: Array,
      default () {
        return []
      }
    },
    currentTime: {
      type: Number,
      default () {
        return 0;
      }
    },
    totalTime: {
      type: Number,
      default () {
        return 0;
      }
    }
  },
  data () {
    return {
      curIdx: -1,
      itemHeight: 0
    }
  },
  methods: {
    // 切换
    switchLrc () {
      let current = this.currentTime * 1000,
          lyric = this.lyric,
          len = lyric.length;

      let idx;
      lyric.forEach(({start, end}, index) => {
        if (current >= lyric[len -1].start) {
          idx = len -1;
        } else {
          if (current >= start && current < end) {
            idx = index;
          }
        }
      });
      this.curIdx = idx;
    },

    handleAnimation () {
      console.log(this.curIdx);
      if (!this.itemHeight) {
        this.itemHeight = utils.getStyles(this.$refs.item[0], 'height');
      }

      if (!isNaN(Number(this.curIdx))) {
        this.$refs.list.style.transform = `translateY(-${this.itemHeight * (this.curIdx - 1)}px)`
      }
    },

    restore () {
      // console.log(this.$refs.list)
      // this.$refs.list.style.transform = `translateY(0px)`
    }
  },
  watch: {
    currentTime (newTime) {
      if (this.lyric.length > 0) {
        this.switchLrc();
      }
    },
    curIdx () {
      this.handleAnimation();
    },
    lyric () {
      this.restore();
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~styles/mixins.scss';
@import '~styles/variables.scss';
.lyric-wrapper {
  @include vh-center;
  flex-wrap: wrap;
  height: 1.6rem;
  margin: .2rem 0;
  padding: 0 .1rem;
  box-sizing: border-box;
  overflow: hidden;
  // background-color: rgba(0, 0, 0, .1);

  .no-lyric {
    font-size: $fs16;
    color: $subGray;
  }

  .lyric-list {
    transition: all .3s;

    .lyric-item {
      width: 100%;
      line-height: .32rem;
      text-align: center;
      font-size: $fs14;

      &.active {
        color: #ff9c82;
      }
    }
  }

}
</style>