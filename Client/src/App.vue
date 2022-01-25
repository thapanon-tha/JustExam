<template>
  <v-app>
    <navigation-bar></navigation-bar>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import NavigationBar from '@/components/nav/NavigationBar';

export default {
  components: {
    NavigationBar
  },
  name: 'App',
  data: () => ({
    //
  }),
};
</script>


<style>
* {
  box-sizing: border-box;
}

html {
  font-family: sans-serif;
}

body {
  margin: 0;
}
</style>