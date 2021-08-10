<template>
  <VueWinBox ref="winboxRef" :options="options">
    <div id="screen">
      <video id="vdo" autoplay></video>
    </div>
  </VueWinBox>
  <div class="button">
    <button id="capture" v-on:click="capture()">capture</button>
    <button id="stop" v-on:click="stopCapture()">stop</button>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import VueWinBox from "vue-winbox";
// import HelloWorld from './HelloWorld.vue'

export default defineComponent({
  name: "Box",
  props: {
    msg: String,
  },
  components: {
    VueWinBox,
  },
  methods: {
    capture() {
      const meda = document.getElementById("vdo");
      navigator.mediaDevices
        .getDisplayMedia({
          video: {
            width: { max: 350 },
            height: { max: 210 },
            cursor: "always",
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
      const videoElem = document.getElementById("vdo");
      let tracks = videoElem.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
      videoElem.srcObject = null;
    },
  },
  setup() {
    const winboxRef = ref();
    const options = {
      title: "YourScreen",
      width: "350",
      height: "210",
      class: ["no-full", "no-close", "no-max", "no-resize"],
      x: "right",
      y: "bottom",
      background: "black",
    };
    return {
      options,
      winboxRef,
    };
  },
});
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

div.button {
  position: fixed;
}

video#video {
  border: 1px solid rgb(0, 0, 0);
  width: 350px;
  height: 210px;
}
</style>
