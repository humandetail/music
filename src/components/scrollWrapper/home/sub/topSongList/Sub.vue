<template>
  <li class="top-song-item" v-if="info.img">
    <router-link to="/" class="item-link">
      <div class="item-img">
        <img :data-src="info.img" :alt="info.name" class="img" />
      </div>
      <p class="item-name">{{ info.name }}</p>
    </router-link>
  </li>
</template>

<script>
export default {
  name: 'TopSongItem',
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
.top-song-item {
  width: 1rem;
  background-color: #fff;
  margin-left: .15rem;

  &:first-child {
    margin-left: 0;
  }

  .item-link {
    @include flex-column;
    width: 1rem;
    height: 1.32rem;

    .item-img {
      display: block;
      width: 1rem;
      height: 1rem;
      background-color: $subGray;

      .img {
        width: 100%;
        height: 100%;
      }
    }

    .item-name {
      height: .32rem;
      line-height: .32rem;
      text-align: center;
      font-size: $fs16;
      @include ellipsis;
    }
  }
}
</style>