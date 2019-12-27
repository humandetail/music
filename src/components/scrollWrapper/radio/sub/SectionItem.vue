<template>
  <li class="section-item">
    <div class="cover">
      <img v-lazy="info.img" :alt="info.name" class="cover-img" />
    </div>
    <div class="name">{{ info.name }}</div>
    <div class="desc">{{ info.desc }}</div>
    <div class="info">
      <text-icon
        icon="icon-listener"
        :text="info.subCount + ''"
      />
    </div>
  </li>
</template>

<script>
import TextIcon from '../../sub/IconText';
export default {
  name: 'SectionItem',
  components: {
    TextIcon
  },
  props: {
    info: {
      type: Object,
      default () {
        return {};
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.$emit('rendered');
    })
  }
}
</script>

<style lang="scss" scoped>
@import '~styles/mixins.scss';
@import '~styles/variables.scss';

.section-item {
  @include flex-column;
  justify-content: space-between;
  position: relative;
  height: 1rem;
  padding: .1rem .1rem .1rem 1.1rem;

  .cover {
    position: absolute;
    left: 0rem;
    top: .1rem;
    width: 1rem;
    height: 1rem;
    border-radius: .04rem;
    overflow: hidden;

    .cover-img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }

  .name {
    height: .2rem;
    line-height: .2rem;
    font-size: $fs16;
    @include ellipsis;
  }

  .desc {
    max-height: .4rem;
    line-height: .2rem;
    font-size: $fs14;
    color: $defaultGray;
    overflow: hidden;
  }
}
</style>