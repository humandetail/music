<template>
  <div class="hot-item border-top">
    <span class="index" :class="'index-' + index">{{ index }}</span>
    <span class="name">{{ name }}</span>
  </div>
</template>

<script>
export default {
  name: 'HotItem',
  props: {
    name: {
      type: String,
      default () {
        return '';
      }
    },
    index: Number
  }
}
</script>

<style lang="scss" scoped>
@import '~styles/variables.scss';
@import '~styles/mixins.scss';

.hot-item {
  @include flex-row;
  align-items: center;
  height: $headerHeight;
  font-size: $fs16;

  .index {
    width: .24rem;
    height: .2rem;
    line-height: .2rem;
    text-align: center;
    color: $defaultGray;

    &.index-1 {
      color: $defaultRed;
    }

    &.index-2 {
      color: $defaultOrange;
    }

    &.index-3 {
      color: $defaultYellow;
    }
  }

  .name {
    flex: 1;
    margin-left: .1rem;
    @include ellipsis;
  }
}
</style>