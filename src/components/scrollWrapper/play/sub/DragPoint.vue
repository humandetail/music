<template>
  <div class="drag-point"
    :class="{active}"
    @touchstart.stop="handleDragStart"
  ></div>
</template>

<script>
import utils from 'utils/tools';
export default {
  name: 'DragPoint',
  props: {
    active: {
      type: Boolean,
      default () {
        return false
      }
    }
  },

  methods: {
    // 拖拽播放进度
    handleDragStart () {
      let _handleDrag = utils.throttle(this.handleDrag, 16),
          _self = this;

      this.$emit('changeActive', true);

      document.addEventListener('touchmove', _handleDrag, false);
      document.addEventListener('touchend', _handleDragEnd, false);

      function _handleDragEnd (ev) {
        _self.$emit('changeActive', false);
        
        let e = ev || window.event,
            x = e.changedTouches[0].pageX;

        _self.$emit('changePosition', x, true);


        document.removeEventListener('touchmove', _handleDrag, false);
        document.removeEventListener('touchend', _handleDragEnd, false);
      }
    },

    handleDrag (ev) {
      let e = ev || window.event,
          x = e.touches[0].pageX;

      this.$emit('changePosition', x);
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~styles/variables.scss';
.drag-point {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: $mainColor;
  border-radius: 50%;

  &.active::before {
    content: '';
    position: absolute;
    left: -.04rem;
    top: -.04rem;
    width: 100%;
    height: 100%;
    border: .04rem solid rgba(255, 255, 255, .7);
    border-radius: 50%;
  }

  &.active::after {
    content: '';
    position: absolute;
    left: -.02rem;
    top: -.02rem;
    width: 100%;
    height: 100%;
    border: .02rem solid rgba(255, 255, 255, .3);
    border-radius: 50%;
  }
}
</style>