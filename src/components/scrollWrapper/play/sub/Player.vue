<template>
  <div class="player-wrapper">
    <audio ref="audio" controls loop>
      <p>您的浏览器不支持audio播放，请升级浏览器后再次尝试~</p>
    </audio>
  </div>
</template>

<script>
export default {
  name: 'AudioPlayer',
  props: {
    url: {
      type: String,
      default () {
        return ''
      }
    }
  },
  data () {
    return {
      audio: null
    }
  },
  methods: {
    handleLoadAudio (url) {
      if (!this.audio) {
        this.audio = this.$refs.audio;
      }
      let oAudio = this.audio;

      oAudio.src = url;
      oAudio.load();

      // window.onload = function () {
      //   console.log(1)
      //   oAudio.play();
      // }

      // const _self = this;
      window.addEventListener('load', function () {
        oAudio.play();
      });
      
    }
  },
  watch: {
    url (newUrl, oldUrl) {
      if (newUrl !== oldUrl) {
        this.handleLoadAudio(newUrl);
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>