<template>
  <div class="change-btn" :class="mode">
    <span class="icon iconimage" :class="`icon-${mode}`" @click="switchSong"></span>
  </div>
</template>

<script>
export default {
  name: 'ChangeBtn',
  props: {
    mode: String
  },
  methods: {
    switchSong () {
      this.$emit('switchSong', this.mode)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~styles/mixins.scss';
.change-btn {
  @include vh-center;
  width: .64rem;
  height: .64rem;

  .icon {
    display: block;
    width: .64rem;
    height: .64rem;

    &:active {
      width: .6rem;
      height: .6rem;
    }
  }
}
</style>