<template>
  <div class="page-mv container">
    <common-header title="MV" :hasBackBtn="true"></common-header>
    <mv-main></mv-main>
    <common-footer></common-footer>
  </div>
</template>

<script>
import CommonHeader from 'components/header/Common';
import MvMain from 'components/scrollWrapper/mv/Index';
import CommonFooter from 'components/footer/Index';
export default {
  components: {
    CommonHeader,
    MvMain,
    CommonFooter
  }
}
</script>