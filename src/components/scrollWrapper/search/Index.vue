<template>
  <div class="scroll-wrapper" ref="wrapper">
    <div class="wrapper">
      <hot-search
        :hots="hots"
        @changeKeyword="changeKeyword"
        v-if="!keyword"
      ></hot-search>
      <template v-else>
        <no-result
          :keyword="keyword"
          v-if="!hasResult"
        ></no-result>
        <search-result
          v-else
          :result="searchList[keyword]"
        ></search-result>
      </template>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll';

import HotSearch from './sub/Hots';
import NoResult from './sub/NoResult';
import SearchResult from './sub/Result.vue';
export default {
  name: 'SearchScroll',
  components: {
    HotSearch,
    NoResult,
    SearchResult
  },
  props: {
    hots: {
      type: Array,
      default () {
        return []
      }
    },
    searchList: {
      type: Object,
      default () {
        return {}
      }
    },
    keyword: {
      type: String,
      default () {
        return ''
      }
    }
  },
  computed: {
    hasResult () {
      return this.searchList[this.keyword].count > 0
    }
  },
  methods: {
    changeKeyword (val) {
      this.$emit('changeKeyword', val);
    },

    handlePullingUp () {
      let item = this.searchList[this.keyword];
      if (item) {
        if (item.page * 30 < item.count) {
          this.$emit('loadMore');
        }
      }
    },

    refreshScroll () {
      this.scroll.refresh();
    }
  },
  mounted () {
    this.scroll = new BScroll(this.$refs.wrapper, {
      pullUpLoad: {
        threshold: 10
      }
    });
    this.scroll.on('pullingUp', this.handlePullingUp);
  }
}
</script>

<style lang="scss" scoped>
.scroll-wrapper {
  background-color: #fff;
}
</style>