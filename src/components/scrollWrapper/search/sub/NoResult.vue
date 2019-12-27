<template>
  <div class="no-result">
    <div class="tip">
      很抱歉，没有找到与
      <span class="keyword">“{{ keyword }}”</span>
      匹配的结果~
    </div>
  </div>
</template>

<script>
export default {
  name: 'NoResult',
  props: {
    keyword: {
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
.no-result {
  @include vh-center;
  height: 2rem;
  font-size: $fs16;

  .tip {
    width: 80%;
    line-height: 1.5;
    text-align: center;

    .keyword {
      color: $defaultRed;
    }
  }
}
</style>