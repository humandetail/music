<template>
  <div class="mode-bar">
    <div class="btn" @click="toggleRegulator">
      <svg class="iconfont" aria-hidden="true">
        <use :xlink:href="`#${icon}`"></use>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModeBar',
  props: {
    icon: {
      type: String,
      default () {
        return '';
      }
    }
  },
  methods: {
    toggleRegulator () {
      this.$emit('toggleRegulator', true);
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~styles/mixins.scss';

.mode-bar {
  @include vh-center;
  width: .44rem;
  height: .44rem;

  .btn {
    width: .32rem;
    height: .32rem;
  }
}
</style>