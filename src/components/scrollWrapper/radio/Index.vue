<template>
  <div class="radio-main scroll-wrapper">
    <template v-if="!showLoading">
      <aside-menu
        ref="menu"
        :list="cateList"
        :current="currentMenu"
        @changeMenu="changeContent"
      ></aside-menu>
      <radio-content
        :list="cateList"
        :current="currentContent"
        @changeMenu="changeMenu"
      ></radio-content>
    </template>
    <loading :show="showLoading" />
  </div>
</template>

<script>
import RadioModel from 'models/Radio';

import AsideMenu from './sub/Menu';
import RadioContent from './sub/RadioContent';
import Loading from '../sub/Loading';

const radioModel = new RadioModel();

export default {
  name: 'RadioMain',
  components: {
    AsideMenu,
    RadioContent,
    Loading
  },
  data () {
    return {
      cateList: [],
      currentContent: 0,
      currentMenu: 0,
      showLoading: false
    }
  },
  methods: {
    async getCateList () {
      if (this.cateList.length <= 0) {
        this.showLoading = true;
        let {
          code,
          categories: cateList
        } = await radioModel.getCateList();
        
        let list = this.cateList;
        
        if (code === 200 && cateList.length > 0) {
          list.push(...cateList.map((item) => {
            return {
              id: item.id,
              name: item.name,
              recom: []
            }
          }));
        }

        list.forEach(async (item, index) => {
          let {
            code: code2,
            djRadios: recom
          } = await radioModel.getRecommend(item.id);
          if (code === 200) {
            list[index].recom.push(...recom.splice(0, 8).map((item) => {
              return {
                id: item.id,
                img: item.picUrl,
                name: item.name,
                desc: item.desc,
                subCount: item.subCount < 10000
                          ? item.subCount
                          : (item.subCount / 10000).toFixed(1) + '万'
              }
            }))
          }
        });

        setTimeout(() => {
          this.showLoading = false;
        }, 300);
      }
    },

    changeMenu (idx) {
      if (this.currentMenu !== idx) {
        this.currentMenu = idx;
        this.$refs.menu.handleScroll(idx);
      }
    },

    changeContent (idx) {
      this.currentMenu = this.currentContent = idx;
    }
  },
  mounted () {
    this.getCateList();
  }
}
</script>

<style lang="scss" scoped>
@import '~styles/mixins.scss';
.radio-main {
  @include flex-row;
  min-width: 0;
}
</style>