<template>
  <div class="scroll-wrapper" ref="wrapper">
    <div class="wrapper">
      <tab
        :list="tabList"
        :current="currentTab"
        @changeTab="changeTab"
      />

      <div class="content" v-if="!showLoading && mvList[kind].length > 0">
        <mv-item
          v-for="(item, index) of mvList[kind]"
          :key="index"
          :info="item"
        />
      </div>
      <loading :show="showLoading" />
    </div>
  </div>
</template>

<script>
import MvModel from 'models/Mv';

import BScroll from 'better-scroll';

import Tab from '../sub/Tab';
import MvItem from './sub/MvItem';
import Loading from '../sub/Loading';

const mvModel = new MvModel();

export default {
  name: 'MvMain',
  components: {
    Tab,
    MvItem,
    Loading
  },
  data () {
    return {
      currentTab: 0,
      tabList: [
        {
          type: 'all',
          text: '全部'
        },
        {
          type: 'new',
          text: '最新'
        },
        {
          type: 'personalized',
          text: '推荐'
        }
      ],
      mvList: {
        all: [],
        new: [],
        personalized: []
      },
      showLoading: false
    }
  },
  computed: {
    kind () {
      return this.tabList[this.currentTab].type;
    }
  },
  methods: {
    async getList () {
      let res = null,
          list = this.mvList[this.kind];

      if (list.length > 0) {
        return;
      }
      this.showLoading = true;

      switch (this.currentTab) {
        case 0:
          if (list.length <= 0) {
            res = await mvModel.getAllList()
          }
          break;
        case 1:
          if (list.length <= 0) {
            res = await mvModel.getNewList()
          }
          break;
        case 2:
          if (list.length <= 0) {
            res = await mvModel.getPersonalizedList()
          }
          break;
        default:
          break;
      }

      if (res && res.code === 200) {
        const data = res.data || res.result;
        list.push(...data.map((item) => {
          return {
            id: item.id,
            cover: item.cover || item.picUrl,
            name: item.name,
            desc: item.desc,
            playCount: (item.playCount / 10000).toFixed(1) + '万',
            artistName: item.artistName
          }
        }));
      }
      setTimeout(() => {
        this.showLoading = false;
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.wrapper);
        });
      }, 300);
    },

    changeTab (idx) {
      this.currentTab = idx;
      this.getList();
    }
  },
  mounted () {
    this.getList();
  }
}
</script>

<style lang="scss" scoped>
.content {
  padding: .1rem;
  background-color: #fff;
}
</style>