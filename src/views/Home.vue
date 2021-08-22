<template>
<v-container>
<<<<<<< HEAD
    <h1>Eye Edition</h1>
=======
<h1>Eye Edition</h1>
>>>>>>> main
    <HelloWorld/>
  <v-row
    class="d-flex"
    justify="center"
  >
    <v-item v-for="item in items" :key="item">
      <v-card id="anathor" class="align-center justify-center rounded-lg">
        <v-avatar
          color="teal"
          size="67"
        >
        Hi {{item}}
        </v-avatar>
      </v-card>
    </v-item>
  </v-row>
</v-container>
</template>

<script>
import HelloWorld from '../components/HelloWorld.vue';

export default {
  name: 'Home',
  components: {
    HelloWorld,
  },
  data: () => ({
    items: [1, 2, 3, 4, 5],
  }),

};
</script>

<style scoped>
#anathor {
  min-width: 100px;
  min-height: 100px;
}
</style>
