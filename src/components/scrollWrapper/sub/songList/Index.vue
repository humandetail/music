<template>
  <empty v-if="isEmpty" />
  <ul class="song-list" v-else>
    <song-item
      v-for="(item, index) of list"
      :key="item.id"
      :index="index"
      :current="kind"
      :info="item"
      :field="field"
    />
  </ul>
</template>

<script>
import Empty from './Empty';
import SongItem from './Sub';
export default {
  name: 'SongList',
  components: {
    Empty,
    SongItem
  },
  props: {
    kind: {
      type: Number,
      default () {
        return 0;
      }
    },
    list: {
      type: Array,
      default () {
        return [];
      }
    },
    playBtn: {
      type: Boolean,
      default () {
        return false;
      }
    },
    field: {
      type: String,
      default () {
        return '';
      }
    }
  },
  computed: {
    isEmpty () {
      return this.list.length <= 0;
    }
  }
}
</script>