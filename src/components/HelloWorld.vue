<template>
  <div>
    <h1>{{ msg }}</h1>
    <div id="screen">
      <video id="vdo" autoplay></video>
      <div>
        <button id="snap" v-on:click="capture()">Snap Photo</button>
        <button id="snap" v-on:click="stopCapture()">Snap Photo</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data: function () {
    return {
      email: null,
      password: null,
      error: 1,
    };
  },
  methods: {
    capture() {
      const meda = document.getElementById("vdo");
      navigator.mediaDevices
        .getDisplayMedia({
          video: {
            width: { ideal: 500, max: 720 },
            height: { ideal: 500, max: 720 },
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
  computed: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#video {
  border: 1px solid #999;
  width: 98%;
  max-width: 350px;
  max-height: 175px;
}

h3 {
  margin: 0px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 0px;
}
a {
  color: #42b983;
}
</style>
