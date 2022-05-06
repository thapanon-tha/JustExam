<template>
  <div>
    <v-container>
      <v-row class="justify-center mb-28">
        <h1 class="font-light text-5xl text-center mt-15">Contact us</h1>
      </v-row>
      <v-row class="justify-center mb-6">
        <v-col cols="2">
          <div>
            <p>Thapanon Sodngam</p>
            <p>thapanon.sod@gmail.com</p>
          </div>
        </v-col>

        <v-col cols="2">
          <div>
            <p>Thanaporn Cheenthada</p>
            <p>eye54067@hotmail.com</p>
          </div>
        </v-col>

        <v-col cols="2">
          <div>
            <p>Rungwigrai Payakkanuwat</p>
            <p>newrung@gmail.com</p>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <!-- <Loading v-model="loading"></Loading> -->
  </div>
</template>

<script>
// import Loading from '@/components/Loading.vue';

export default {
  name: 'ContactUs',
  // components: {
  //   Loading,
  // },
  data() {
    return {
      // loading: true,
    };
  },
  mounted() {},
};
</script>
