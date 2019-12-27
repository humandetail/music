<template>
  <div class="nav-item" :class="`nav-item-${info.name}`">
    <router-link :to="{name: info.name}" class="nav-item-lk">
      <span class="icon" v-if="info.name !== 'play'">
        <svg class="iconfont" aria-hidden="true">
          <use :xlink:href="`#${isCurrent ? info.icon_active : info.icon}`"></use>
        </svg>
      </span>
      <span class="text" :class="{active: isCurrent}" v-if="info.name !== 'play'">{{ info.text }}</span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'NavItem',
  props: {
    info: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    isCurrent () {
      return this.$route.name === this.info.name;
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~styles/mixins.scss';
@import '~styles/variables.scss';
.nav-item {
  flex: 1;
  height: 100%;

  .nav-item-lk {
    @include flex-column;
    @include vh-center;
    width: 100%;
    height: 100%;

    .icon {
      width: .22rem;
      height: .22rem;

      .iconfont {
        width: .22rem;
        height: .22rem;
      }
    }

    .text {
      height: .2rem;
      line-height: .2rem;
      font-size: .14rem;

      &.active {
        color: $mainColor;
      }
    }
  }

  &.nav-item-play {
    position: relative;
    
    .nav-item-lk {
      display: block;
      position: absolute;
      left: 50%;
      top: -.05rem;
      width: $footerHeight;
      height: $footerHeight;
      margin-left: -($footerHeight / 2);
      background-image: url('~img/record.png');
      background-size: $footerHeight;
      border-radius: 50%;
    }
  }
}
</style>