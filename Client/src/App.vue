<template>
  <v-app>
    <v-main>
      <Navbar />
      <router-view/>
      <Footer />
    </v-main>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar/Navbar.vue';
import Footer from '@/components/Footer/Footer.vue';

export default {
  name: 'App',
  components: {
    Navbar,
    Footer,
  },
  mounted() {
    this.$store.dispatch({ type: 'restoreLogin' });
  },
  created() {
  },
};
</script>

<style>
html {
  font-family: sans-serif;
}
</style>
