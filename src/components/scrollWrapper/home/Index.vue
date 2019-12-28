<template>
  <main class="scroll-wrapper" ref="wrapper">
    <loading :show="showLoading"/>
    <div class="wrapper" v-if="!showLoading">
      <div class="content">
        <div class="banner">
          <common-swiper :info="banner"></common-swiper>
        </div>

        <section class="top-song">
          <section-title :text="'新歌速递'"></section-title>
          <top-song-list :list="topSong"></top-song-list>
        </section>

        <section class="personalized">
          <section-title :text="'推荐歌单'" :border="'border-bottom'" :moreLink="'/'"></section-title>
          <personalized-list :list="personalized"></personalized-list>
        </section>
      </div>
    </div>
  </main>
</template>

<script>
import IndexModel from 'models/Index';
import BScroll from 'better-scroll';

import CommonSwiper from '../sub/Swiper';
import SectionTitle from '../sub/SectionTitle';
import TopSongList from './sub/topSongList/Index';
import PersonalizedList from './sub/personalized/Index';

import Loading from '../sub/Loading';

export default {
  name: 'HomeMain',
  components: {
    CommonSwiper,
    SectionTitle,
    TopSongList,
    PersonalizedList,
    Loading
  },
  data () {
    return {
      banner: [],
      topSong: [],
      personalized: [],
      showLoading: true
    }
  },
  methods: {
    getHomeDatas () {
      this.showLoading = true;
      const indexModel = new IndexModel();
      
      indexModel.getHomeBanner(2).then(({code, banners}) => {
        if (code === 200) {
          this.banner = banners.slice(0, 5).map((item) => {
            return {
              id: item.bannerId,
              img: item.pic,
              name: item.TypeTitle
            }
          });
        }
      });

      indexModel.getTopSong().then((res) => {
        if (res.code === 200) {
          this.topSong = res.result.slice(0, 10).map((item) => {
            return {
              id: item.id,
              img: item.picUrl,
              name: item.name
            }
          });
        }
      });

      indexModel.getPersonalized().then((res) => {
        if (res.code === 200) {
          this.personalized = res.result.slice(0, 15).map((item) => {
            return {
              id: item.id,
              name: item.name,
              desc: item.copywriter,
              img: item.picUrl,
              playCount: (item.playCount / 10000).toFixed(1) + '万'
            }
          });
        }
      });
      setTimeout(() => {
        this.showLoading = false;
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.wrapper);
        });
      }, 300)
    }
  },
  mounted () {
    this.getHomeDatas();
  }
}
</script>

<style lang="scss" scoped>
@import '~styles/variables.scss';
.banner {
  height: 1.46rem;
  background-color: $subGray;
}

.top-song {
  padding: 0 .1rem;
  background-color: #fff;
}

.personalized {
  margin-top: .2rem;
  padding: 0 .1rem;
  background-color: #fff;
}
</style>