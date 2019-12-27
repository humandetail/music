<template>
  <div class="menu-item">
    <p class="icon">
      <svg class="iconfont" aria-hidden="true">
        <use :xlink:href="`#${info.icon}`"></use>
      </svg>
    </p>

    <p class="text">{{ info.text }}</p>

    <p class="count">{{ info.count }}</p>
  </div>
</template>

<script>
export default {
  name: 'MenuItem',
  props: {
    info: {
      type: Object,
      default () {
        return {};
      }
    }
  },
}
</script>

<style lang="scss" scoped>
@import '~styles/variables.scss';
@import '~styles/mixins.scss';

.menu-item {
  @include flex-column;
  align-items: center;
  justify-content: space-between;
  width: 25%;
  height: .7rem;

  .icon {
    width: .32rem;
    height: .32rem;
  }

  .text {
    height: .2rem;
    line-height: .2rem;
    font-size: $fs14;
  }

  .count {
    height: .16rem;
    line-height: .16rem;
    font-size: $fs12;
    color: $subGray;
  }
}
</style>