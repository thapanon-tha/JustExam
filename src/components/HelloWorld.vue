<template>
  <v-container>
    <v-footer
      fixed
      :padless="false"
      class="align-center justify-center"
    >
    <div >
    <VueWinBox class="rounded-lg align-center justify-center" ref="winboxRef" :options="options">
      <div class="align-center" id="screen">
        <video id="selfScreen" autoplay></video>
      </div>
    </VueWinBox>
      <v-btn class="rounded-xl" color="light-green lighten-2" outlined @click="capture()">
        <v-icon>{{ iconScreen }}</v-icon>
      </v-btn>
      <v-btn class="rounded-xl" color="red darken-3"  outlined @click="stopCapture()">
        <v-icon>{{ callClose }}</v-icon>
      </v-btn>
      <v-btn class="rounded-xl" color="red darken-3"  outlined @click="stopCapture()">
        <v-icon>{{ camera }}</v-icon>
      </v-btn>
    </div>
    </v-footer>
  </v-container>

</template>

<script>
import VueWinBox from 'vue-winbox';
import { mdiMonitorShare, mdiPhoneHangup, mdiCameraAccount } from '@mdi/js';

export default {
  components: { VueWinBox },
  data: () => ({
    iconScreen: mdiMonitorShare,
    callClose: mdiPhoneHangup,
    camera: mdiCameraAccount,
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
      const meda = document.getElementById('selfScreen');
      navigator.mediaDevices
        .getDisplayMedia({
          video: {
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
      const videoElem = document.getElementById('selfScreen');
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
