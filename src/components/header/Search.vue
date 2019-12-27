<template>
  <header class="header search-header">
    <search-input
      :keyword="keyword"
      @changeKeyword="changeKeyword"
    ></search-input>
    <span class="cancel-btn" @click="handleCancel">
      取消
    </span>
  </header>
</template>

<script>
import SearchInput from './sub/SearchInput';
export default {
  name: 'SearchHeader',
  components: {
    SearchInput
  },
  props: {
    keyword: {
      type: String,
      default () {
        return '';
      }
    }
  },
  methods: {
    changeKeyword (val) {
      this.$emit('changeKeyword', val);
    },
    handleCancel () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~styles/variables.scss';
@import '~styles/mixins.scss';

.header {
  position: relative;
  @include flex-row;
  align-items: center;
  height: $headerHeight;
  padding: 0 .1rem;
  background-color: $mainColor;

  .cancel-btn {
    width: .44rem;
    text-align: center;
    font-size: $fs16;
    color: #fff;
  }
}
</style>