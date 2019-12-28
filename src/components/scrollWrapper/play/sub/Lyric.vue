<template>
  <div class="lyric-wrapper">
    <div class="no-lyric" v-if="lyric.length <= 0">暂无歌词</div>
    <div
      v-else
      ref="list"
      class="lyric-list"
      :style="listStyle"
    >
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
    },
    id: String
  },
  data () {
    return {
      curIdx: -1,
      itemHeight: 0,
      requestId: null,
      timer: null
    }
  },
  computed: {
    dataIdx () {
      let current = this.currentTime * 1000,
          lyric = this.lyric,
          len = lyric.length;

      let idx = 0;
      lyric.forEach(({start, end}, index) => {
        // if (current < lyric[0].start) {
        //   this.curIdx = 0;
        //   return;
        // }
        if (current >= lyric[len -1].start) {
          idx = len -1;
        } else {
          if (current >= start && current < end) {
            idx = index;
          }
        }
      });
      // console.log(idx);
      return idx;
    },
    listStyle () {
      return {
        transform: `translateY(-${this.itemHeight * (this.curIdx <= 0 ? 0 : this.curIdx - 1)}px)`
      }
    }
  },
  methods: {
    // 切换
    switchLrc () {
      this.timer = setTimeout(() => {
        let current = this.currentTime * 1000,
            lyric = this.lyric,
            len = lyric.length;

        let idx = 0;
        lyric.forEach(({start, end}, index) => {
          // if (current < lyric[0].start) {
          //   this.curIdx = 0;
          //   return;
          // }
          if (current >= lyric[len -1].start) {
            idx = len -1;
          } else {
            if (current >= start && current < end) {
              idx = index;
            }
          }
        });
        this.curIdx = idx;
        if (this.$refs.list) {
          this.itemHeight = utils.getStyles(this.$refs.item[0], 'height');
        }
        this.requestId = requestAnimationFrame(this.switchLrc);
      }, 500);
    },

    cancelAnimation () {
      cancelAnimationFrame(this.requestId);
      this.requestId = null;
      clearTimeout(this.timer);
      this.timer = null;
    },
  },
  mounted () {
    this.switchLrc();
  },
  destroyed () {
    this.cancelAnimation();
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
    height: 1.6rem;

    .lyric-item {
      width: 100%;
      line-height: .32rem;
      text-align: center;
      font-size: $fs12;

      &.active {
        color: #ff9c82;
      }
    }
  }

}
</style>