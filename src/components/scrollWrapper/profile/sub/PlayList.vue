<template>
  <section class="play-list">
    <tab
      :current="tabCurrent"
      :list="tabList"
      @changeTab="changeTab"
    />
    <song-list
      :kind="Number(playListKind)"
      :list="currentList"
      :field="field"
      :playBtn="true"
    ></song-list>
  </section>
</template>

<script>
import { mapState } from 'vuex';

import Tab from 'components/scrollWrapper/sub/Tab';
import SongList from 'components/scrollWrapper/sub/songList/Index';
export default {
  name: 'PlayList',
  components: {
    Tab,
    SongList
  },
  data () {
    return {
      tabCurrent: 0,
      tabList: [{
        type: 'playList',
        text: '本地音乐'
      }, {
        type: 'collectionList',
        text: '个人收藏'
      }]
    }
  },
  computed: {
    ...mapState(['playListKind', 'playList', 'collectionList']),
    currentList () {
      switch (this.tabCurrent) {
        case 0:
          return this.playList;
        case 1:
          return this.collectionList;
        default:
          return [];
      }
    },
    field () {
      switch (this.tabCurrent) {
        case 0:
          return 'playList';
        case 1:
          return 'collectionList';
        default:
          return '';
      }
    }
  },
  methods: {
    changeTab (idx) {
      this.tabCurrent = idx;
    }
  }
}
</script>

<style lang="scss" scoped>
.play-list {
  margin-top: .2rem;
  background-color: #fff;
}
</style>