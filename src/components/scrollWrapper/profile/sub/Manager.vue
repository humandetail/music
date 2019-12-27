<template>
  <div class="manager-wrapper">
    <div class="avatar">
      <svg class="iconfont" aria-hidden="true">
        <use xlink:href="#icon-user-avatar"></use>
      </svg>
    </div>
    <span class="tips">点击登录，享精准歌曲推荐</span>
  </div>
</template>

<script>
export default {
  name: 'Manager'
}
</script>

<style lang="scss" scoped>
@import '~styles/variables.scss';
@import '~styles/mixins.scss';
.manager-wrapper {
  @include flex-row;
  align-items: center;
  height: .6rem;

  .avatar {
    width: 25%;
    text-align: center;
    .iconfont {
      width: .44rem;
      height: .44rem;
    }
  }
  .tips {
    flex: 1;
    font-size: $fs16;
  }
}
</style>