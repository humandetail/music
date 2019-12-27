<template>
  <div class="input-wrapper">
    <div class="placeholder" v-show="!keyword">
      <span class="icon iconfont icon-search"></span>
      <span class="text">{{ placeholder }}</span>
    </div>
    <input type="text" class="search" :value="keyword" @input="handleInput" />
  </div>
</template>

<script>
import utils from 'utils/tools';
export default {
  name: 'SearchInput',
  props: {
    keyword: {
      type: String,
      default () {
        return '';
      }
    }
  },
  data () {
    return {
      placeholder: '音乐 / 专辑 / 歌手'
    }
  },
  methods: {
    handleInput: utils.debounce(function (ev) {
        let e = ev || window.event,
            tar = e.target || e.srcElement,
            value = tar.value.trim();
        
        if (value !== this.keyword) {
          this.$emit('changeKeyword', value)
        }
    }, 300)
  }
}
</script>

<style lang="scss" scoped>
@import '~styles/variables.scss';
@import '~styles/mixins.scss';
.input-wrapper {
  position: relative;
  flex: 1;
  @include vh-center;
  height: .36rem;
  background-color: #fff;
  border-radius: .03rem;

  .placeholder {
    height: .24rem;
    line-height: .24rem;
    font-size: $fs14;
    color: $defaultGray;

    .icon {
      margin-right: .05rem;
    }
  }

  .search {
    position: absolute;
    left: 0;
    top: .06rem;
    width: 100%;
    height: .24rem;
    padding: 0 .1rem;
    line-height: .24rem;
    font-size: $fs14;
    background-color: transparent;
    box-sizing: border-box;
    color: $defaultGray;
  }
}
</style>