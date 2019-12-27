<template>
  <div class="page-radio container">
    <common-header title="电台" :hasBackBtn="true"></common-header>
    <radio-main></radio-main>
    <common-footer></common-footer>
  </div>
</template>

<script>
import CommonHeader from 'components/header/Common';
import RadioMain from 'components/scrollWrapper/radio/Index';
import CommonFooter from 'components/footer/Index';
export default {
  components: {
    CommonHeader,
    RadioMain,
    CommonFooter
  }
}
</script>