<template>
  <div class="radio-content" ref="wrapper">
    <div class="wrapper">
      <section
        :id="'mark-' + item.id"
        class="section"
        v-for="item of list"
        :key="item.id"
      >
        <section-title
          :title="item.name"
        />

        <ul class="section-list">
          <section-item
            v-for="info of item.recom"
            :key="info.id"
            :info="info"
            @rendered="_caculatePos"
          ></section-item>
        </ul>
      </section>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
import utils from 'utils/tools';

import SectionTitle from './SectionTitle';
import SectionItem from './SectionItem';

export default {
  name: 'RadioContent',
  components: {
    SectionTitle,
    SectionItem
  },
  props: {
    list: {
      type: Array,
      default () {
        return [];
      }
    },
    current: {
      type: Number,
      default () {
        return 0;
      }
    }
  },
  data () {
    return {
      positions: []
    }
  },
  computed: {
  },
  methods: {
    _initScroll () {
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: 3,
        click: true
      });
      // 监听scroll事件，触发左侧联动效果
      this.scroll.on('scroll', utils.throttle(async (pos) => {
        if (pos.y > -20) {
          return;
        }
        let y = Math.abs(pos.y - 44); // 需要加上44
        let idx = await this.positions.findIndex((item, idx, arr) => {
          return y >= item.start && y < item.end;
        });

        this.$emit('changeMenu', idx);
      }), 16)
    },
    
    // 设置各个section的y值
    _caculatePos () {
      this.positions = this.list.map((item, idx, arr) => {
        let pos = {},
            getElementDocPosition = utils.getElementDocPosition;
        
        
        pos.start = getElementDocPosition(document.getElementById('mark-' + item.id)).top;
        if (!arr[idx + 1]) {
          pos.end = pos.start + utils.getStyles(document.getElementById('mark-' + item.id), 'height');
        } else {
          pos.end = getElementDocPosition(document.getElementById('mark-' + arr[idx + 1].id)).top;
        }
        return pos;
      });
    },
    // 点击左侧栏目实现跳转到当前元素
    handleScrollToElement (idx) {
      let elem = document.getElementById('mark-' + this.list[idx].id);
      if (this.scroll) {
        this.scroll.scrollToElement(elem);
        this.scroll && this.scroll.scrollBy(0, -1);
      }
    }
  },
  mounted () {
    this._initScroll();
  },
  watch: {
    current (newVal) {
      this.handleScrollToElement(newVal);
    }
  }
}
</script>

<style lang="scss" scoped>
.radio-content {
  flex: 1;
  min-width: 0;
  padding: .2rem .1rem .1rem;
  background-color: #fff;
}
</style>