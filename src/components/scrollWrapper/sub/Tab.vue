<template>
  <ul class="tab border-bottom">
    <li
      class="tab-item"
      :class="{active: index === current}"
      v-for="(item, index) of list"
      :key="index"
      @click.stop="handleItemClick(index)"
    >
      <span class="text">{{ item.text }}</span>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Tab',
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
  methods: {
    handleItemClick (idx) {
      if (idx !== this.current) {
        this.$emit('changeTab', idx);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~styles/variables.scss';
@import '~styles/mixins.scss';
.tab {
  @include flex-row;
  align-items: center;
  height: $headerHeight;
  background-color: #fff;

  .tab-item {
    @include vh-center;
    flex: 1;

    .text {
      position: relative;
      text-align: center;
      font-size: $fs16;
    }

    &.active {
      .text {
        color: $mainColor;

        &::before {
          content: '';
          position: absolute;
          left: 0;
          top: .24rem;
          width: 100%;
          height: .03rem;
          background-color: $mainColor;
        }
      }
      
    }
  }
}
</style>