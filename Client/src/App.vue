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
import Footer from '@/components/footer/Footer';

export default {
  name: 'App',
  components: {
    Navbar,
    Footer,
  },
  data: () => ({
    //
  }),
};
</script>
