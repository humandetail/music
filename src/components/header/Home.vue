<template>
  <header class="header">
    <falseInput />
  </header>
</template>

<script>
import FalseInput from './sub/FalseInput';

export default {
  name: 'HomeHeader',
  components: {
    FalseInput
  }
}
</script>

<style lang="scss" scoped>
@import '~styles/variables.scss';
@import '~styles/mixins.scss';

.header {
  @include vh-center;
  height: $headerHeight;
  background-color: $mainColor;
}
</style>