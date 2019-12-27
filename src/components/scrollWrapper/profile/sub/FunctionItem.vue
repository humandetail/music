<template>
  <section class="function-item border-bottom">
    <h3 class="title">{{ title }}</h3>
    <div
      class="more-btn iconfont icon-more"
      v-if="link + '' != '{}'"
      @click="handleClick"
    ></div>
  </section>
</template>

<script>
export default {
  name: 'FunctionItem',
  props: {
    title: {
      type: String,
      default () {
        return ''
      }
    },
    link: {
      type: Object,
      default () {
        return {}
      }
    }
  },

  methods: {
    handleClick () {
      this.$router.push(this.link);
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~styles/variables.scss';
@import '~styles/mixins.scss';

.function-item {
  @include flex-row;
  align-items: center;
  height: $headerHeight;
  padding: 0 .1rem;
  background-color: #fff;

  .title {
    flex: 1;
    font-size: $fs16;
  }

  .more-btn {
    width: .24rem;
    height: .32rem;
    text-align: center;
    line-height: .32rem;
  }
}
</style>