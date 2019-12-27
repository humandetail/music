<template>
  <div class="volume-bar" ref="volumeBar">
    <div class="btn">
      <span class="icon iconimage"
        :class="volumeIconClass"
      ></span>
    </div>
  </div>
</template>

<script>
import utils from 'utils/tools';
export default {
  name: 'VolumeBar',

  props: {
    volume: {
      type: Number,
      default () {
        return 0
      }
    }
  },
  data () {
    return {
      volumeIcons: ['icon-volumn-mute', 'icon-volumn-1', 'icon-volumn-2'],
    }
  },
  computed: {
    volumeIconClass () {
      let volume = this.volume,
          idx = 0;
      if (volume <= 0) {
        idx = 0;
      } else if (volume <= 0.32) {
        idx = 1;
      } else {
        idx = 2;
      }
      return this.volumeIcons[idx];
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~styles/mixins.scss';
@import '~styles/variables.scss';

.volume-bar {
  position: relative;
  @include vh-center;
  width: .44rem;
  height: .44rem;

  .btn {
    .icon {
      display: block;
      width: .2rem;
      height: .2rem;
    }
  }
}
</style>

