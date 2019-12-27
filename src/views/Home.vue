<template>
  <div class="page-home container">
    <home-header></home-header>
    <home-main></home-main>
    <common-footer></common-footer>
  </div>
</template>

<script>
import IndexModel from 'models/Index';

import HomeHeader from 'components/header/Home';
import HomeMain from 'components/scrollWrapper/home/Index';
import CommonFooter from 'components/footer/Index';

export default {
  name: 'home',
  components: {
    HomeHeader,
    HomeMain,
    CommonFooter
  },
  mounted () {
  }
}
</script>