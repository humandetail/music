<template>
  <div class="toast" v-show="isShow">
    <span class="icon iconfont" :class="options.icon" v-if="options.icon"></span>
    <span class="text">{{ options.text }}</span>
  </div>
</template>

<script>
export default {
  name: 'Toast',
  data () {
    return {
      timer: null,
      isShow: false,
      options: {
        duration: 2000,
        text: '',
        icon: ''
      }
    }
  },
  methods: {
    showToast (options = {}) {
      this.options = Object.assign({}, this.options, options);
      this.isShow = true;

      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.isShow = false;
        this.timer = null;
      }, this.options.duration);
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~styles/mixins.scss';
.toast {
  position: fixed;
  left: 50%;
  top: 50%;
  z-index: 9999;
  @include vh-center;
  flex-direction: column;
  width: 1.4rem;
  height: 1rem;
  margin: -0.7rem 0 0 -0.7rem;
  padding: 0 .1rem;
  background-color: rgba(0, 0, 0, .5);
  border-radius: .1rem;
  color: #fff;
  box-sizing: border-box;

  .icon {
    width: .32rem;
    height: .32rem;
    margin-bottom: .1rem;
    font-size: .28rem;
    text-align: center;
    line-height: .32rem;
  }

  .text {
    font-size: .16rem;
  }
}
</style>