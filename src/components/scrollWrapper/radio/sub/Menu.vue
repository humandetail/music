<template>
  <div class="menu-wrapper" ref="wrapper">
    <nav class="menu-list" ref="list">
      <div
        class="menu-item"
        ref="item"
        :class="{current: index === current}"
        v-for="(item, index) of list"
        :key="item.id"
        @click="handleMenuClick(index)"
      >{{ item.name }}</div>
    </nav>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
import utils from 'utils/tools';
export default {
  name: 'RadioMenu',
  props: {
    list: {
      type: Array,
      default () {
        return [];
      }
    },
    current: {
      type: Number,
      default () {
        return 0;
      }
    }
  },
  data () {
    return {
      wrapperHeight: 0,
      listHeight: 0,
      itemHeight: 0
    }
  },
  methods: {
    handleMenuClick (idx) {
      if (idx !== this.current) {
        this.$emit('changeMenu', idx);
      }
    },
    // 此函数给Index调用实现联动效果
    handleScroll (idx) {
      if (!this.wrapperHeight) {
        this.wrapperHeight = utils.getStyles(this.$refs.wrapper, 'height');
      }
      if (!this.listHeight) {
        this.listHeight = utils.getStyles(this.$refs.list, 'height');
      }
      if (!this.itemHeight) {
        this.itemHeight = utils.getStyles(this.$refs.item[0], 'height');
      }
      
      if (idx * this.itemHeight + this.wrapperHeight > this.listHeight) {
        this.scroll.scrollTo(0, this.wrapperHeight - this.listHeight, 1000);
      } else {
        this.scroll.scrollTo(0, 0, 1000)
      }
      
    }
  },
  mounted () {
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true
    });
  }
}
</script>

<style lang="scss" scoped>
@import '~styles/variables.scss';
@import '~styles/mixins.scss';
.menu-wrapper {
  min-width: .9rem;
  max-width: .9rem;
  height: 100%;
  background-color: #efefef;
  
  .menu-item {
    @include vh-center;
    height: $headerHeight;
    font-size: $fs14;

    &.current {
      color: $mainColor;
      background-color: #fff;
    }
  }
}
</style>