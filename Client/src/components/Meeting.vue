<template>
  <v-container>
    <Video></Video>
  </v-container>
</template>

<script>
import Video from './video/Video.vue';

export default {
  name: 'Meeting',
  components: { Video },
  data: () => ({
    mediaDisplay: {},
    options: {
      title: 'YourScreen',
      width: '20%',
      height: '25%',
      class: ['no-full', 'no-close', 'no-max', 'no-resize'],
      x: 'right',
      y: 'bottom',
      max: 0,
    },
  }),
  methods: {
    capture() {
      navigator.mediaDevices
        .getDisplayMedia({
          video: {
            cursor: 'always',
          },
          audio: false,
        })
        .then((stream) => {
          this.$refs.mediaDisplay.srcObject = stream;
        })
        .then((resolve) => {
          this.$refs.mediaDisplay.onloadmetadata = resolve;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    stopCapture() {
      const videoElem = document.getElementById('selfScreen');
      const tracks = videoElem.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
      videoElem.srcObject = null;
    },
  },
  watch: {
    mediaDisplay() {
      console.log(this.mediaDisplay);
    },
  },
};
</script>

<style>
#screen {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
.wb-body {
  overflow: hidden;
  background: black;
}

#selfScreen {
  justify-content: center;
  align-content: center;
  width: 100%;
  height:100%;
}
</style>
