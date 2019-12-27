<template>
  <div class="page-search container">
    <search-header
      :keyword="keyword"
      @changeKeyword="changeKeyword"
    ></search-header>
    <search-scroll
      ref="scroll"
      :hots="hots"
      :searchList="searchList"
      :keyword="keyword"
      @changeKeyword="changeKeyword"
      @loadMore="loadMore"
    ></search-scroll>
  </div>
</template>

<script>
import SearchModel from 'models/Search';

import SearchHeader from 'components/header/Search';
import SearchScroll from 'components/scrollWrapper/search/Index'; 

const searchModel = new SearchModel();

export default {
  name: 'Search',
  components: {
    SearchHeader,
    SearchScroll
  },
  data () {
    return {
      keyword: '',
      hots: [],
      searchList: {}
    }
  },
  methods: {
    changeKeyword (val) {
      this.keyword = val;
    },

    async getHotSearch () {
      let {
        code,
        result: {
          hots
        }
      } = await searchModel.getHotSearch();
      if (code === 200) {
        this.hots = hots.map((item) => {
          return item.first
        });
      }
    },

    async handleSearch (isLoad) {
      let keyword = this.keyword;
      
      if (keyword !== '') {
        if (!this.searchList[keyword]) {
          this.searchList = Object.assign(
            {},
            this.searchList,
            {
              [keyword]: {
                count: 0,
                page: 1,
                list: []
              }
            }
          )
        } else {
          if (isLoad) { // 加载更多则page + 1
            this.searchList[keyword].page += 1;
          } else { // 重复搜索直接返回已有数据
            return;
          }
        }
        let {
          code,
          result: {
            songCount,
            songs
          }
        } = await searchModel.getSearch(keyword, this.searchList[keyword].page);

        if (code === 200) {
          if (songCount > 0) {
            this.searchList[keyword].count = songCount;
            this.searchList[keyword].list.push(...songs.map((item) => {
              return {
                id: item.id,
                artist: item.artists[0].name.replace(keyword, `<span style="color: #e72a2a;">${keyword}</span>`),
                name: item.name.replace(keyword, `<span style="color: #e72a2a;">${keyword}</span>`)
              }
            }));
          }
        }
      }
    },

    loadMore () {
      this.handleSearch(true).then(() => {
        this.$refs.scroll.refreshScroll()
        this.$refs.scroll.scroll.finishPullUp(); // 加载完毕
      });
    }
  },
  mounted () {
    this.getHotSearch();
  },
  watch: {
    keyword () {
      this.handleSearch();
    }
  }
}
</script>