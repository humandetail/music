<template>
  <h2 class="title">
    <span class="text">{{ title }}</span>
  </h2>
</template>

<script>
export default {
  name: 'SectionTitle',
  props: {
    title: {
      type: String,
      default () {
        return '';
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~styles/variables.scss';
@import '~styles/mixins.scss';
.title {
  @include vh-center;
  height: .32rem;
  overflow: hidden;

  .text {
    position: relative;
    padding: 0 .1rem;
    height: .2rem;
    line-height: .2rem;
    font-size: $fs14;
    color: $subGray;

    &::before {
      content: '';
      position: absolute;
      left: -1.5rem;
      top: .1rem;
      height: .01rem;
      width: 1.5rem;
      background-color: $subGray;
    }

    
    &::after {
      content: '';
      position: absolute;
      right: -1.5rem;
      top: .1rem;
      height: .01rem;
      width: 1.5rem;
      background-color: $subGray;
    }
  }
}
</style>