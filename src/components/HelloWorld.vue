<template>
  <v-container>
    <v-btn color="accent" outlined @click="capture()"> <v-icon>{{ iconScreen }}</v-icon></v-btn>
    <VueWinBox class="rounded-lg" ref="winboxRef" :options="options">
      <div id="screen">
        <video id="vdo" autoplay></video>
      </div>
    </VueWinBox>
  </v-container>
</template>

<script>
import VueWinBox from 'vue-winbox';
import { mdiMonitorShare } from '@mdi/js';

export default {
  components: { VueWinBox },
  data: () => ({
    iconScreen: mdiMonitorShare,
    options: {
      title: 'YourScreen',
      width: '350',
      height: '210',
      class: ['no-full', 'no-close', 'no-max', 'no-resize'],
      x: 'right',
      y: 'bottom',
    },
  }),
  methods: {
    capture() {
      const meda = document.getElementById('vdo');
      navigator.mediaDevices
        .getDisplayMedia({
          video: {
            width: { max: 350 },
            height: { max: 210 },
            cursor: 'always',
          },
          audio: false,
        })
        .then((stream) => {
          meda.srcObject = stream;
        })
        .then((resolve) => {
          meda.onloadmetadata = resolve;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    stopCapture() {
      const videoElem = document.getElementById('vdo');
      const tracks = videoElem.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
      videoElem.srcObject = null;
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
  color: #2c3e50;
  width: 350px;
  height: 210px;
  overflow: hidden;
}
.wb-body {
  overflow: hidden;
}

video#video {
  border: 1px solid rgb(0, 0, 0);
  width: 350px;
  height: 210px;
}
</style>
