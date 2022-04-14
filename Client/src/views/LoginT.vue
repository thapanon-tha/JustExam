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
      <div class="mt-6">
        <CheckboxForm label="Remember me" class="ml-2 font-light text-grey-700 text-sm" />
      </div>
      <div class="mt-6 ml-2">
        <ActionButton
          class="bg-subColor border-orange-200 border border-solid rounded-lg px-10 py-3 w-4/5 font-semilight text-mainColor"
          name="Log in"
          @on-click="onSubmit"
        />
      </div>
    </form>
    <section class="box-border mt-28 ml-48 mr-48 flex flex-col">
      <v-container class="bg-subColor border-orange-200 border-solid border rounded-lg text-center">
        <img src="@/assets/book.svg" class="w-80 h-80 ml-8" alt="book" />
        <ActionButton
          class="mb-5 mt-5 bg-mainColor border-orange-200 border rounded-lg px-8 py-3 font-medium text-white"
          name="Login with Google account"
          @on-click="onClickLoginWithGoogle"
        />
      </v-container>
    </section>
  </div>
</template>

<script>
import InputForm from '@/components/Form/InputForm.vue';
import CheckboxForm from '@/components/Form/CheckboxForm.vue';
import ActionButton from '@/components/Button/ActionButton.vue';
import api from '@/services/apis';
import auth from '@/services/authentications';

export default {
  name: 'Login',
  components: {
    InputForm,
    CheckboxForm,
    ActionButton,
  },
  data() {
    return {
      loginFormData: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    onSubmit() {
      const data = api.login(this.loginFormData);
      // Can refactor it to query from API
      auth.setToken(data.token);
      auth.setRole(data.role);
      auth.setName(data.name);
      this.$router.push({ name: 'ExamChannelTeacher' }).catch(() => true);
    },
    onClickLoginWithGoogle() {
      window.location.href = 'http://localhost:3000/api/auth/google';
    },
  },
};
</script>
