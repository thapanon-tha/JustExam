<template>
  <div class="flex flex-row justify-between">
    <form class="ml-56 mt-28 mb-40">
      <h1 class="text-4xl">Login to your account</h1>
      <div class="mt-10">
        <InputForm inputLabel="Email" type="email" v-model="loginFormData.email" />
      </div>
      <div class="mt-6">
        <InputForm inputLabel="Password" type="password" v-model="loginFormData.password" />
      </div>
      <div class="mt-6 ml-2">
        <!-- eslint-disable max-len -->
        <ActionButton
          class="bg-subColor border-orange-200 border border-solid rounded-lg px-10 py-3 w-4/5 font-semilight text-mainColor"
          name="Log in"
          @on-click="onSubmit"
        />
        <!-- eslint-enable max-len -->
      </div>
    </form>
    <section class="box-border mt-28 ml-48 mr-48 flex flex-col">
      <v-container class="bg-subColor border-orange-200 border-solid border rounded-lg text-center">
        <div class="flex justify-center">
          <img src="@/assets/book.svg" class="w-80 h-80 ml-8" alt="book" />
        </div>
        <!-- eslint-disable max-len -->
        <!-- <ActionButton
          class="mb-5 mt-5 bg-mainColor border-orange-200 border rounded-lg px-8 py-3 font-medium text-white"
          name="Login with Google account"
          @on-click="onClickLoginWithGoogle"
        /> -->
        <!-- eslint-enable max-len -->
      </v-container>
    </section>
    <v-snackbar v-model="snackbar" color="red accent-2" centered top text outlined>
      {{ text }}
    </v-snackbar>
    <Loading v-model="isLoading"></Loading>
  </div>
</template>

<script>
import InputForm from '@/components/Form/InputForm.vue';
import ActionButton from '@/components/Button/ActionButton.vue';
import api from '@/services/apis';
import auth from '@/services/authentications';
import Loading from '@/components/Loading.vue';

export default {
  name: 'Login',
  components: {
    InputForm,
    ActionButton,
    Loading,
  },
  data() {
    return {
      isLoading: false,
      text: '',
      timeout: 2000,
      snackbar: false,
      loginFormData: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    async onSubmit() {
      if (this.loginFormData.email !== '' && this.loginFormData.password !== '') {
        this.isLoading = true;
        const data = await api.login(this.loginFormData.email, this.loginFormData.password);
        // Can refactor it to query from API
        if (data.status === 200) {
          auth.setToken(data.data.token);
          auth.setRole(data.data.type);
          auth.setfirstname(data.data.firstname);
          auth.setsurname(data.data.surname);
          auth.setuid(data.data.uid);
          auth.setemail(data.data.email);
          window.location.href = '/';
        } else {
          this.isLoading = false;
          this.snackbar = true;
          this.text = data.data.message;
        }
      } else {
        this.snackbar = true;
        this.text = 'require email and password';
      }
    },
    onClickLoginWithGoogle() {
      // window.location.href = `${process.env.VUE_APP_API}/api/auth/google`;
    },
  },
};
</script>
