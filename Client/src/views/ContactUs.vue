<template>
  <div>
    <v-container>
      <v-row class="justify-center mb-6">
        <h1 class="font-light text-5xl text-center mt-15">Contact us</h1>
      </v-row>
      <v-row>
        <v-col class="flex justify-center" cols="4">
          <div>
          <p class="justify-center">Thapanon Sodngam</p>
          <p class="justify-center">Email: thapanon.sod@gmail.com</p>
          </div>
        </v-col>

        <v-col class="flex justify-center" cols="4">
          <div>
            <p>Thanaporn Cheenthada</p>
            <p>Email: thanaporn.7209@mail.kmutt.ac.th</p>
          </div>
        </v-col>

        <v-col class="flex justify-center" cols="4">
          <div class="justify-center">
            <p>Rungwigrai Payakkanuwat</p>
            <p>Email: newrung@gmail.com</p>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <!-- <Loading v-model="loading"></Loading> -->
  </div>
</template>

<script>
import Loading from '@/components/Loading.vue';

export default {
  name: 'ContactUs',
  components: {
    Loading,
  },
  data() {
    return {
      loading: true,
      //
    };
  },
  mounted() {},
};
</script>
