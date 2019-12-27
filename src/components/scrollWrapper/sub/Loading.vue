<template>
  <div class="loading" v-if="show">
    <img src="~img/loading.gif" class="loading-img" alt="loading...">
  </div>
</template>

<script>
export default {
  name: 'Loading',
  props: {
    show: {
      type: Boolean,
      default () {
        return false;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~styles/mixins.scss';
.loading {
  @include vh-center;
  width: 100%;
  height: 2.4rem;

  .loading-img {
    width: .6rem;
    height: .6rem;
  }
}
</style>