<template>
  <div class="page-play container">
    <common-header :title="title" :hasBackBtn="true"></common-header>
    <play-main></play-main>
  </div>
</template>

<script>

import { mapState } from 'vuex';

import CommonHeader from 'components/header/Common';
import PlayMain from 'components/scrollWrapper/play/Index';

export default {
  name: 'Play',
  components: {
    CommonHeader,
    PlayMain
  },
  computed: {
    ...mapState([
      'playListKind',
      'playList'
    ]),

    title () {
      let res = this.playList[this.playListKind];
      return (res && res.name) ? res.name : '';
    }
  },

  methods: {
    checkPlayList () {
      if (this.playListKind === - 1 || this.playList.length <= 0) {
        this.$toast({
          text: '您的播放列表还没有歌曲呢',
          icon: 'icon-warning'
        }).then(() => {
          this.$router.push('/');
        });
        return;
      }
    }
  },

  mounted () {
    this.checkPlayList();
  }
}
</script>