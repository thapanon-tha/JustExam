<template>
  <div id="app">
    <Box />
  </div>
</template>

<script>
import Box from "./components/testbox.vue";

export default {
  name: "App",
  components: {
    Box,
  },
};
</script>

<style>
body {
  margin: 0px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  display: flex;
}
</style>
