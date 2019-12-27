<template>
  <footer class="footer border-top">
    <nav class="footer-nav">
      <nav-item
        v-for="item of navList"
        :key="item.name"
        :info="item"
      ></nav-item>
    </nav>
  </footer>
</template>

<script>
import NavItem from './sub/Item';
export default {
  name: 'CommonFooter',
  components: {
    NavItem
  },
  data () {
    return {
      navList: [
        {
          name: 'home',
          text: '首页',
          icon: 'icon-home',
          icon_active: 'icon-home-active'
        },
        {
          name: 'mv',
          text: 'MV',
          icon: 'icon-MV',
          icon_active: 'icon-MV-active'
        },
        {
          name: 'play'
        },
        {
          name: 'radio',
          text: '电台',
          icon: 'icon-radio',
          icon_active: 'icon-radio-active'
        },
        {
          name: 'profile',
          text: '我的',
          icon: 'icon-profile',
          icon_active: 'icon-profile-active'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~styles/mixins.scss';
@import '~styles/variables';

.footer {
  background-color: #fff;

  .footer-nav {
    @include flex-row;
    height: $footerHeight;
  }
}
</style>