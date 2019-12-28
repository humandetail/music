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
          @click.stop="handleClick"
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
          @click.stop="handleClick"
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
    ...mapState(['playListKind', 'playList'])
  },
  methods: {
    ...mapActions([
      'playListAddSong',
      'playListRemoveSong',
      'collectionListRemoveSong'
    ]),
    ...mapMutations([
      'setPlayListKind'
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
      let idx = -1;
      if (field === 'collectionList') {
        // 收藏列表点击的播放
        // 先添加到播放列表
        // let list = this.playList;
        idx = await this.playList.findIndex((item) => item.id === id)

        if (idx === -1) { // 播放列表没有当前音乐，先添加到播放列表
          await this.playListAddSong(this.info);
        }
      }
      idx = await this.playList.findIndex((item) => item.id === id)

      if (idx == this.playListKind) {
        this.audioPlayer.play();
      } else {
        await this.setPlayListKind(idx);
        this.audioPlayer.changeUrl(id).then(() => {
          this.audioPlayer.play();
        });
      }
      
      if (this.$route.name !== 'play') {
        this.$router.push({
          name: 'play'
        });
      }
    },

    // 从列表中删除当前音乐
    handleRemove (id, field) {
      switch (field) {
        case 'playList':
          let idx = this.playList.findIndex((item) => item.id === id);
          console.log(id, idx, this.playListKind)
          this.playListRemoveSong(id)
            .then(() => {
              if (idx == this.playListKind) { // 删除的是当前正在播放的音乐
                this.setPlayListKind(0);
                if (!this.audioPlayer.paused) {
                  // 播放状态
                  this.audioPlayer.changeUrl(this.playList[0].id)
                    .then(() => {
                      this.audioPlayer.play();
                    })
                }
              }
            })
          console.log(idx )
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