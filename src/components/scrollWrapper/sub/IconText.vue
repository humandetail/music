<template>
  <div class="icon-text">
    <span class="icon" v-if="icon">
      <svg class="iconfont" aria-hidden="true">
        <use :xlink:href="`#${icon}`"></use>
      </svg>
    </span>
    <span class="text" :style="{color: textColor}">{{ text }}</span>
  </div>
</template>

<script>
export default {
  name: 'IconText',
  props: {
    text: {
      type: String,
      default () {
        return '';
      }
    },
    icon: {
      type: String,
      default () {
        return '';
      }
    },
    textColor: {
      type: String,
      default () {
        return '#ccc';
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.icon-text {
  display: inline-block;
  height: .2rem;
  line-height: .2rem;

  .icon {
    display: inline-block;
    width: .2rem;
    height: .2rem;
    margin-right: .02rem;
    vertical-align: middle;

    .iconfont {
      width: .2rem;
      height: .2rem;
    }
  }

  .text {
    font-size: .14rem;
    visibility: middle;
  }
}
</style>