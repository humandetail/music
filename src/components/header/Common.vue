<template>
  <header class="header">
    <span class="icon iconfont icon-back" v-if="hasBackBtn" @click="handleBack"></span>
    <h1 class="title">{{ title }}</h1>
  </header>
</template>

<script>
export default {
  name: 'CommonHeader',
  props: {
    title: {
      type: String,
      default () {
        return '';
      }
    },
    hasBackBtn: {
      type: Boolean,
      default () {
        return false;
      }
    }
  },
  methods: {
    handleBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~styles/variables.scss';
@import '~styles/mixins.scss';

.header {
  position: relative;
  @include vh-center;
  height: $headerHeight;
  background-color: $mainColor;
  
  .icon {
    position: absolute;
    left: 0;
    top: 0;
    width: $headerHeight;
    height: $headerHeight;
    line-height: $headerHeight;
    color: #fff;
    font-size: .22rem;
    text-align: center;
  }

  .title {
    width: 80%;
    height: $headerHeight;
    line-height: $headerHeight;
    font-size: $fs16;
    text-align: center;
    color: #fff;
    @include ellipsis;
  }
}
</style>