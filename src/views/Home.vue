<template>
  <div class="home">
    <h1 class="hello">JustExam</h1>
    <HelloWorld/>
  </div>
</template>

<script>
import HelloWorld from '../components/HelloWorld.vue';

export default {
  name: 'Home',
  components: {
    HelloWorld,
  },
};
</script>

<style scoped>
.home{
  background-color:#5e5ef0;
  height:750px;
}
.hello{
  color:#dce3eb;
  text-align: center;
}
</style>
