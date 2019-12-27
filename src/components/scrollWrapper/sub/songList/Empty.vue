<template>
  <div class="list-empty">
    <p class="icon"></p>
    <p class="text">列表空空如也~</p>
  </div>
</template>

<script>
export default {
  name: 'Empty'
}
</script>

<style lang="scss" scoped>
@import '~styles/mixins.scss';
.list-empty {
  @include vh-center;
  background-color: #fff;
  height: 2rem;

  .icon {
    width: .32rem;
    height: .32rem;
    background-image: url('~img/music_off.png');
    background-repeat: no-repeat;
    background-position: center;
  }

  .text {
    margin-left: .05rem;
    font-size: .16rem;
  }
}
</style>