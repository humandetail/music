<template>
  <div class="cover">
    <img
      ref="cover"
      :src="img || require('@/assets/img/record.png')"
      class="cover-img"
    />
  </div>
</template>

<script>
export default {
  name: 'Cover',
  props: {
    img: {
      type: String,
      default () {
        return '';
      }
    },
    playing: {
      type: Boolean,
      default () {
        return false;
      }
    }
  },
  data () {
    return {
      requestId: null,
      angle: 0
    }
  },
  methods: {
    setAnimation () {
      if (this.angle >= 360) {
        this.angle = 0;
      }

      this.$refs.cover.style.transform = `rotate(${this.angle += .5}deg)`;
      this.requestId = requestAnimationFrame(this.setAnimation);
    },
    cancelAnimation () {
      cancelAnimationFrame(this.requestId);
      this.requestId = null;
    }
  },
  beforeDestroy () {
    this.cancelAnimation();
  },
  watch: {
    playing (newVal) {
      if (newVal) {
        this.setAnimation();
      } else {
        this.cancelAnimation();
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~styles/mixins.scss';
.cover {
  @include vh-center;
  height: 2.35rem;

  .cover-img {
    display: block;
    width: 1.8rem;
    height: 1.8rem;
    border: .05rem solid #ccc;
    border-radius: 50%;
  }
}
</style>