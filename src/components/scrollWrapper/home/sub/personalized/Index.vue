<template>
  <ul class="personalized-list">
    <item
      v-for="item of list"
      :key="item.id"
      :info="item"
    />
  </ul>
</template>

<script>
import Item from './Sub';
export default {
  name: 'PersonalizedList',
  components: {
    Item
  },
  props: {
    list: {
      type: Array,
      default () {
        return [];
      }
    }
  }
}
</script>