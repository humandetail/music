<template>
  <div class="false-input" @click.stop="handleClick">
    <span class="icon iconfont icon-search-dark"></span>
    <span class="text">{{ text }}</span>
  </div>
</template>

<script>
export default {
  name: 'FalseInput',
  props: {
    text: {
      type: String,
      default () {
        return '音乐 / 专辑 / 歌手'
      }
    }
  },
  methods: {
    handleClick () {
      this.$router.push({
        name: 'search'
      });
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~styles/variables.scss';
@import '~styles/mixins.scss';
.false-input {
  @include vh-center;
  width: 3.4rem;
  height: .36rem;
  background-color: #fff;
  border-radius: .04rem;
  color: $defaultGray;
  font-size: $fs12;

  .icon {
    width: .2rem;
    height: .2rem;
    margin-right: .1rem;
  }
}
</style>