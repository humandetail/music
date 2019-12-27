<template>
  <div class="top-song-list" ref="list">
    <ul class="scroll" ref="scroll" :style="{width: scrollWidth}">
      <item
        v-lazy-container="{ selector: 'img' }"
        v-for="item of list"
        :key="item.id"
        :info="item"
      />
    </ul>
  </div>
</template>

<script>
import BScroll from 'better-scroll';

import Item from './Sub';
export default {
  name: 'TopSongList',
  components: {
    Item
  },
  props: {
    list: {
      type: Array,
      default () {
        return [];
      }
    }
  },
  computed: {
    scrollWidth () {
      let width = 100,
          offset = 15,
          len = this.list.length;

      return len * parseInt(width) + (len - 1) * offset + 'px';
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.list, {
        // stopPropagation: true,
        scrollX: true,
        scrollY: false
      });
    });
  }
}
</script>

<style lang="scss" scoped>
.top-song-list {
  height: 1.32rem;
  background-color: #fff;
  overflow: hidden;

  .scroll {
    display: flex;
    flex-wrap: nowrap;
    height: 1.32rem;
    // -webkit-overflow-scrolling: touch;
    // overflow-x: scroll;
  }
}
</style>