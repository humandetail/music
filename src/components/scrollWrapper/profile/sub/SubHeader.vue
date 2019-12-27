<template>
  <div class="sub-header border-bottom">
    <div class="backdrop"></div>
    <div class="infomation">
      <manager />
      <manager-menu />
    </div>
  </div>
</template>

<script>
import Manager from './Manager';
import ManagerMenu from './Menu';
export default {
  name: 'SubHeader',
  components: {
    Manager,
    ManagerMenu
  }
}
</script>

<style lang="scss" scoped>
@import '~styles/variables.scss';
.sub-header {
  position: relative;
  padding-bottom: 2rem;
  background-color: #fff;

  .backdrop {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: .6rem;
    background-color: $mainColor;
    border-bottom-left-radius: .6rem .3rem;
    border-bottom-right-radius: .6rem .3rem;
  }

  .infomation {
    position: absolute;
    left: .1rem;
    top: .1rem;
    width: calc(100% - .2rem);
    height: 1.6rem;
    padding: .1rem;
    background-color: #fff;
    border-radius: .08rem;
    box-shadow: 0 2px 5px rgba(0, 0, 0, .2);
    box-sizing: border-box;
    overflow: hidden;
  }
}
</style>