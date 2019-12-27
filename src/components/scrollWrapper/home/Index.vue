<template>
  <main class="scroll-wrapper" ref="wrapper">
    <div class="wrapper">
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

        <!-- <loading :show="true" /> -->
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
      personalized: []
    }
  },
  methods: {
    getHomeDatas () {
      const indexModel = new IndexModel();
      
      const getBannner = indexModel.getHomeBanner(2),
            getTopSong = indexModel.getTopSong(0),
            getPersonalized = indexModel.getPersonalized();

      Promise.all([getBannner, getTopSong, getPersonalized])
        .then(([banner, topSong, personalized]) => {
          this.banner = banner.banners.slice(0, 5).map((item) => {
            return {
              id: item.bannerId,
              img: item.pic,
              name: item.TypeTitle
            }
          });
          this.topSong = topSong.data.slice(0, 10).map((item) => {
            return {
              id: item.id,
              img: item.album.blurPicUrl,
              name: item.name
            }
          });
          this.personalized = personalized.result.slice(0, 15).map((item) => {
            return {
              id: item.id,
              name: item.name,
              desc: item.copywriter,
              img: item.picUrl,
              playCount: (item.playCount / 10000).toFixed(1) + '万'
            }
          });
        })
        .catch((err) => {
          console.log(err);
        })
    }
  },
  mounted () {
    this.getHomeDatas();
    this.scroll = new BScroll(this.$refs.wrapper);
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