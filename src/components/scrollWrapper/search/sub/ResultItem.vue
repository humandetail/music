<template>
  <div class="result-item border-bottom">
    <span class="icon iconfont icon-search"></span>
    <div class="info">
      <div class="name" v-html="info.name"></div>
      <div class="artist" v-html="info.artist"></div>
    </div>
    <span
      class="icon iconfont icon-plus"
      :data-id="info.id"
      data-field="playList"
      @click.stop="handlePlus"
    ></span>
    <span
      class="icon iconfont icon-collection"
      :data-id="info.id"
      data-field="collectionList"
      @click.stop="handlePlus"
    ></span>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import PlayModel from 'models/Play';

import utils from 'utils/tools';

const playModel = new PlayModel();

export default {
  name: 'ResultItem',
  props: {
    info: {
      type: Object,
      default () {
        return {};
      }
    }
  },
  computed: {
    ...mapState(['playList', 'collectionList'])
  },
  methods: {
    ...mapActions([
      'playListAddSong',
      'collectionListAddSong',
    ]),

    async handlePlus (ev) {
      let e = ev || window.event,
          tar = e.target || e.srcElement,
          id = tar.getAttribute('data-id'),
          field = tar.getAttribute('data-field');

      if (!id) {
        this.$toast({
          text: '程序出错~',
          icon: 'icon-warning'
        });
      }

      let list,
          addFn;
      switch (field) {
        case 'playList':
          list = this.playList;
          addFn = this.playListAddSong;
          break;
        case 'collectionList':
          list = this.collectionList;
          addFn = this.collectionListAddSong;
          break;
        default:
          break;
      }

      if (!list || !addFn) {
        this.$toast({
          text: '程序出错~',
          icon: 'icon-warning'
        });
      }

      let idx = await list.findIndex((item) => item.id === id);
      if (idx === -1) { // 当前列表中没有该数据，执行添加操作
        let info = this.info;

        // 获取歌曲url
        let url = await this.getSongUrl(id);

        addFn({
          id,
          url,
          name: info.name.replace(utils.tagReg(), ''),
          artist: info.artist.replace(utils.tagReg(), ''),
        });
        this.$toast({
          text: '添加成功~',
          icon: 'icon-checked'
        });
      } else {
        this.$toast({
          text: '歌曲已存在~',
          icon: 'icon-warning'
        });
      }
    },

    async getSongUrl (id) {
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
      ] = await playModel.getSong(id);
      if (success && message === 'ok' && code === 200) {
        return data.url
      } else {
        return ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~styles/variables.scss';
@import '~styles/mixins.scss';

.result-item {
  @include flex-row;
  align-items: center;
  height: .6rem;
  padding: 0 .1rem;
  background-color: #fff;

  .icon {
    width: .32rem;
    height: .32rem;
    line-height: .32rem;
    text-align: center;
    font-size: .2rem;

    &.icon-search {
      width: $fs16;
      font-size: $fs16;
    }
  }

  .info {
    @include flex-column;
    flex: 1;
    min-width: 0;
    margin-left: .1rem;

    .name {
      height: .3rem;
      line-height: .3rem;
      font-size: $fs16;
      @include ellipsis;
    }

    .artist {
      height: .16rem;
      font-size: $fs14;
      color: $defaultGray;
    }
  }
}
</style>