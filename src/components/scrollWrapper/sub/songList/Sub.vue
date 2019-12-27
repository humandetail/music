<template>
  <div class="song-item">
    <div class="index">
      <span class="icon" v-if="index === current">
        <svg class="iconfont" aria-hidden="true">
          <use xlink:href="#icon-playing"></use>
        </svg>
      </span>
      <span class="number" v-else>{{ index + 1 }}</span>
    </div>
    <div class="inner border-bottom">
      <div class="info">
        <p class="name">{{ info.name }}</p>
        <p class="artist">{{ info.artist }}</p>
      </div>
      <div class="btn-groups">
        <div
          class="btn"
          :data-id="info.id"
          :data-field="field"
          data-handle="play"
          @click="handleClick"
        >
          <svg class="iconfont" aria-hidden="true">
            <use xlink:href="#icon-play"></use>
          </svg>
        </div>
        <div
          class="btn iconfont icon-remove"
          :data-id="info.id"
          :data-field="field"
          data-handle="remove"
          @click="handleClick"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

import PlayModel from 'models/Play';

const playModel = new PlayModel();

export default {
  name: 'SongItem',
  props: {
    info: {
      type: Object,
      default () {
        return {};
      }
    },
    index: Number,
    current: Number,
    field: {
      type: String,
      default () {
        return '';
      }
    }
  },
  computed: {
    ...mapState(['playList'])
  },
  methods: {
    ...mapActions([
      'playListAddSong',
      'playListRemoveSong',
      'collectionListRemoveSong'
    ]),
    ...mapMutations([
      'setPlayListCurrent'
    ]),

    handleClick (ev) {
      let e = ev || window.event,
          tar = e.target || e.srcElement;

      while (!tar.getAttribute('data-id')) {
        tar = tar.parentNode;
      }
      let id = tar.getAttribute('data-id'),
          field = tar.getAttribute('data-field'),
          handle = tar.getAttribute('data-handle');
          
      switch (handle) {
        case 'play':
          this.handlePlay(id, field);
          break;
        case 'remove':
          this.handleRemove(id, field);
          break;
        default:
          break;
      }
    },
    // 播放当前音乐
    async handlePlay (id, field) {
      if (this.$route.name !== 'play') {
        this.$router.push({
          name: 'play'
        });
      }
      if (field === 'collectionList') {
        // 收藏列表点击的播放
        // 先添加到播放列表
        let list = this.playList.list;
        let idx = await list.findIndex((item) => item.id === id)
        if (idx !== -1) {
          // 当前播放列表并没有该音乐
          // 执行添加操作
          await this.playListAddSong(this.info);
          await this.setPlayListCurrent(id);
        }
      }
      let [
        {
          code,
          data: [
            data
          ]
        },
        {
          success,
          message
        }
      ] = await playModel.getSong(id)
      
      if (!success || message !== 'ok') {
        console.log(message); // 音乐地址不合法
      } else if (code !== 200) {
        console.log('音乐地址获取失败')
      } else {
        this.audioPlayer.changeUrl(data.url);
      }
    },

    // 从列表中删除当前音乐
    handleRemove (id, field) {
      console.log(id)
      switch (field) {
        case 'playList':
          this.playListRemoveSong(id);
          break;
        case 'collectionList':
          this.collectionListRemoveSong(id);
          break;
        default:
          break;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~styles/mixins.scss';
@import '~styles/variables.scss';

.song-item {
  @include flex-row;
  align-items: center;

  .index {
    @include vh-center;
    width: $headerHeight;
    font-size: $fs16;
    color: $defaultGray;

    .icon {
      width: .24rem;
      height: .24rem;

      .iconfont {
        width: .24rem;
        height: .24rem;
      }
    }
  }

  .inner {
    flex: 1;
    @include flex-row;
    align-items: center;
    min-width: 0;
    margin-right: .1rem;

    .info {
      flex: 1;
      min-width: 0;
      padding: .05rem 0;

      .name {
        height: .2rem;
        line-height: .2rem;
        font-size: $fs16;
        @include ellipsis;
      }

      .artist {
        height: .2rem;
        line-height: .2rem;
        font-size: $fs14;
        color: $subGray;
        @include ellipsis;
      }
    }

    .btn-groups {
      @include vh-center;
      .btn {
        width: .32rem;
        height: .32rem;
        margin-left: .05rem;
        line-height: .32rem;
        font-size: .24rem;
      }
    }
  }
}
</style>