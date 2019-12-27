<template>
  <swiper :options="swiperOptions" ref="mySwiper" v-if="info.length > 0">
    <!-- slides -->
    <swiper-slide
      v-for="item of info"
      :key="item.id"
    >
      <img class="img" :src="item.img" :alt="item.name" />
    </swiper-slide>
    <!-- Optional controls -->
    <div class="swiper-pagination"  slot="pagination"></div>
  </swiper>
</template>

<script>
import 'swiper/dist/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
export default {
  name: 'CommonSwiper',
  components: {
    swiper,
    swiperSlide
  },
  props: {
    info: {
      type: Array,
      default () {
        return [];
      }
    }
  },
  data () {
    return {
      swiperOptions: {
        loop: true,
        autoplay: {
          delay: 3000
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.img {
  height: 100%;
}
</style>