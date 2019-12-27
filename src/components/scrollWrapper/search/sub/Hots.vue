<template>
  <section class="hots-wrapper">
    <section-title text="热搜歌曲"></section-title>

    <hot-item
      v-for="(item, index) of hots"
      :key="index"
      :name="item"
      :index="index + 1"
      @click.native="changeKeyword(item)"
    ></hot-item>
  </section>
</template>

<script>
import SectionTitle from '../../sub/SectionTitle';
import HotItem from './HotItem';
export default {
  name: 'HotSearch',
  components: {
    SectionTitle,
    HotItem
  },
  props: {
    hots: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    changeKeyword (val) {
      this.$emit('changeKeyword', val);
    }
  }
}
</script>

<style lang="scss" scoped>
.hots-wrapper {
  padding: 0 .1rem;
  background-color: #fff;
}
</style>