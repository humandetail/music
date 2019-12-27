<template>
  <div class="play-list">
    <div class="btn" @click.stop="handleShow">
      <svg class="iconfont" aria-hidden="true">
        <use xlink:href="#icon-music-list"></use>
      </svg>
    </div>

    <section class="list-wrapper"
      @click.stop="handleHide"
      v-show="show"
    >
      <transition
        enter-active-class="animated bounceInUp"
        leave-active-class="animated bounceOutDown"
      >
        <div class="inner" v-show="show">
          <h3 class="title border-bottom">播放列表</h3>
          <div class="wrapper" ref="wrapper">
            <play-list
              :playBtn="true"
              field="playList"
              :list="playList"
              :kind="Number(playListKind)"
            ></play-list>
          </div>
          <div
            class="btn btn-close border-top"
            @click.stop="handleHide"
          >关闭</div>
        </div>
      </transition>
    </section>
  </div>
</template>

<script>
import PlayList from '@/components/scrollWrapper/sub/songList/Index';

import BScroll from 'better-scroll';

import { mapState } from 'vuex';

export default {
  name: 'SongList',
  components: {
    PlayList
  },
  data () {
    return {
      show: false
    }
  },
  computed: {
    ...mapState([
      'playListKind',
      'playList'
    ])
  },
  methods: {
    handleShow () {
      this.show = true;
    },

    handleHide () {
      this.show = false;
    }
  },
  mounted () {
    this.scroll = new BScroll(this.$refs.wrapper, {
      stopPropagation: true,
    });
  }
}
</script>

<style lang="scss" scoped>
@import '~styles/mixins.scss';
@import '~styles/variables.scss';

.play-list {
  @include vh-center;
  width: .44rem;
  height: .44rem;

  .btn {
    width: .32rem;
    height: .32rem;
  }

  .list-wrapper {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 998;

    & > .inner {
      @include flex-column;
      position: absolute;
      left: 0;
      bottom: 0;
      z-index: 101;
      width: 100%;
      height: 3.5rem;
      background-color: #fff;

      .title {
        @include flex-row;
        align-items: center;
        height: $headerHeight;
        padding: 0 .1rem;
        font-size: $fs16;
        color: $mainColor;
      }

      .wrapper {
        flex: 1;
        padding: .1rem 0;
        overflow: hidden;
      }

      .btn-close {
        @include vh-center;
        align-items: center;
        width: 100%;
        height: $headerHeight;
        font-size: $fs16;
      }
    }
  }
}
</style>