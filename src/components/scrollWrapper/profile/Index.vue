<template>
  <div class="profile-main">
    <sub-header></sub-header>

    <div class="scroll-wrapper" ref="wrapper">
      <div class="wrapper">
        <function-item
          v-for="item of functionList"
          :key="item.title"
          :title="item.title"
          :link="item.link"
        />

        <play-list />
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll';

import SubHeader from './sub/SubHeader';
import FunctionItem from './sub/FunctionItem';
import PlayList from './sub/PlayList';
export default {
  name: 'ProfileMain',
  components: {
    SubHeader,
    FunctionItem,
    PlayList
  },
  data () {
    return {
      functionList: [
        {
          title: '音乐圈',
          link: {
            path: '/'
          }
        },
        {
          title: '推荐mv',
          link: {
            name: 'mv'
          }
        },
        {
          title: '推荐电台',
          link: {
            name: 'radio'
          }
        }
      ]
    }
  },
  mounted () {
    this.scroll = new BScroll(this.$refs.wrapper);
  }
}
</script>

<style lang="scss" scoped>
@import '~styles/mixins.scss';
.profile-main {
  flex: 1;
  @include flex-column;
  min-height: 0;
}
</style>