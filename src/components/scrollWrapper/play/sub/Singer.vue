<template>
  <div class="singer-box">
    <div class="singer">{{ singer }}</div>
  </div>
</template>

<script>
export default {
  name: 'Singer',
  props: {
    singer: {
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

.singer-box {
  padding: 0 .15rem;

  .singer {
    height: $headerHeight;
    line-height: $headerHeight;
    font-size: $fs16;
    text-align: center;
    @include ellipsis;
  }
}
</style>