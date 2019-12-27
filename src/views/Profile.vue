<template>
  <div class="page-profile container">
    <common-header :hasBackBtn="true" title="个人中心"></common-header>
    <profile-main></profile-main>
    <common-footer></common-footer>
  </div>
</template>

<script>
import CommonHeader from 'components/header/Common';
import ProfileMain from 'components/scrollWrapper/profile/Index';
import CommonFooter from 'components/footer/Index';
export default {
  name: 'Profile',
  components: {
    CommonHeader,
    ProfileMain,
    CommonFooter
  }
}
</script>