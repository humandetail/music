<template>
  <div class="mv-item border-bottom">
    <div class="cover">
      <img
        class="cover-img"
        v-lazy="info.cover"
        :alt="info.name"
      />
    </div>
    <h3 class="mv-name">{{ info.name }}</h3>
    <p class="desc" v-if="info.desc">{{ info.desc }}</p>
    <div class="info">
      <icon-text class="item artist" icon="icon-microphone" :text="info.artistName"></icon-text>
      <icon-text class="item count" icon="icon-earphone" :text="info.playCount"></icon-text>
    </div>
  </div>
</template>

<script>
import IconText from '../../sub/IconText';
export default {
  name: 'MvItem',
  props: {
    info: {
      type: Object,
      default () {
        return {};
      }
    }
  },
  components: {
    IconText
  }
}
</script>

<style lang="scss" scoped>
@import '~styles/variables.scss';
@import '~styles/mixins.scss';
.mv-item {
  margin-top: .1rem;
  padding-bottom: .1rem;
  background: #fff;

  .cover {
    width: 100%;
    min-height: 1.5rem;
    max-height: 2rem;
    background: $subGray;
    border-radius: .08rem;
    overflow: hidden;

    .cover-img {
      display: block;
      width: 100%;
    }
  }

  .mv-name {
    padding: .1rem 0;
    font-size: $fs16;
    @include ellipsis;
  }

  .desc {
    padding: .1rem;
    font-size: $fs14;
    @include ellipsis;
  }

  .info {
    .item + .item {
      margin-left: .05rem;
    }
  }
}
</style>