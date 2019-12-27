<template>
  <div class="play-btn" :class="mode">
    <span class="icon iconimage" :class="`icon-${mode}`"></span>
  </div>
</template>

<script>
export default {
  name: 'PlayBtn',
  props: {
    mode: String
  }
}
</script>

<style lang="scss" scoped>
@import '~styles/mixins.scss';
.play-btn {
  @include vh-center;
  width: .8rem;
  height: .8rem;

  .icon {
    display: block;
    width: .8rem;
    height: .8rem;

    &:active {
      width: .72rem;
      height: .72rem;
    }
  }
}
</style>