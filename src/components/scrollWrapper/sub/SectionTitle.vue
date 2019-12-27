<template>
  <h2 class="title" :class="border">
    <span class="text">{{ text }}</span>
    <router-link
      class="more"
      :to="moreLink"
      v-if="moreLink"
    >
      更多
      <span class="icon iconfont icon-more"></span>
    </router-link>
  </h2>
</template>

<script>
export default {
  name: 'SectionTitle',
  props: {
    border: {
      type: String,
      default () {
        return '';
      }
    },
    moreLink: {
      type: String,
      default () {
        return '';
      }
    },
    text: {
      type: String,
      default () {
        return ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~styles/variables.scss';
@import '~styles/mixins.scss';
.title {
  @include flex-row;
  align-items: center;
  height: $headerHeight;
  background-color: #fff;

  .text {
    flex: 1;
    font-size: .16rem;
    color: $defaultBlack;
    text-indent: .8em;
    border-left: .03rem solid $mainColor;
  }

  .more {
    line-height: .16rem;
    font-size: .12rem;
    color: $defaultGray;

    .icon {
      vertical-align: -1px;
    }
  }
}
</style>