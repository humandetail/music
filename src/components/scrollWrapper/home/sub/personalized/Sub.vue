<template>
  <li class="personalized-item">
    <router-link to="/" tag="div" class="cover">
      <img v-lazy="info.img" :alt="info.name" class="cover-img" />
    </router-link>
    <h3 class="name">{{ info.name }}</h3>
    <p class="desc">{{ info.desc }}</p>
    <div class="others">
      <icon-text
        :text='info.playCount'
        :icon="'icon-earphone-green'"
        :textColor="'#49a747'"
      />
    </div>
  </li>
</template>

<script>
import IconText from '../../../sub/IconText';
export default {
  name: 'PersonalizedItem',
  components: {
    IconText
  },
  props: {
    info: {
      type: Object,
      default () {
        return {};
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~styles/variables.scss';
@import '~styles/mixins.scss';

.personalized-item {
  position: relative;
  @include flex-column;
  justify-content: space-between;
  height: 1rem;
  padding: .1rem 0 .1rem 1.15rem;

  .cover {
    position: absolute;
    left: 0;
    top: .1rem;
    width: 1rem;
    height: 1rem;
    border-radius: .08rem;
    overflow: hidden;

    .cover-img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }

  .name {
    @include ellipsis;
    width: 100%;
    height: .2rem;
    line-height: .2rem;
    font-size: $fs16;
  }

  .desc {
    width: 100%;
    max-height: .4rem;
    line-height: .2rem;
    font-size: $fs14;
    color: $defaultGray;
    overflow: hidden;
  }

  .others {
    @include flex-row;
    height: .2rem;
  }
}
</style>