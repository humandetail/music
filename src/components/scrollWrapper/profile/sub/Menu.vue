<template>
  <div class="menu border-top">
    <menu-item
      v-for="item of menuList"
      :key="item.text"
      :info="item"
    ></menu-item>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import MenuItem from './MenuItem';
export default {
  name: 'Menu',
  components: {
    MenuItem
  },

  computed: {
    ...mapState(['playList', 'collectionList']),

    menuList () {
      return [
        {
          icon: 'icon-music',
          text: '本地',
          count: this.playList.length
        },
        {
          icon: 'icon-collection',
          text: '收藏',
          count: this.collectionList.length
        },
        {
          icon: 'icon-download',
          text: '下载',
          count: 0
        },
        {
          icon: 'icon-clock',
          text: '最近',
          count: 0
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~styles/mixins.scss';
.menu {
  @include flex-row;
  padding-top: .1rem;
  overflow: hidden;
}
</style>