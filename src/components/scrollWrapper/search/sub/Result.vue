<template>
  <section class="section-result">
    <result-item
      v-for="item of result.list"
      :key="item.id"
      :info="item"
    ></result-item>
  </section>
</template>

<script>
import ResultItem from './ResultItem';

export default {
  name: 'SearchResult',
  components: {
    ResultItem
  },
  props: {
    result: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>