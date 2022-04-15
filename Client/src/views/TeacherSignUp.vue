<template>
  <div class="flex flex-row justify-between">
    <section class="ml-32 mt-16 mb-40">
      <h1 class="text-4xl mb-10">Sign up for teacher</h1>
      <SignUpForm @on-submit="onSubmit" />
    </section>
    <section class="box-border mt-28 ml-10 mr-32 mb-40 flex flex-col">
      <v-container class="bg-subColor border-orange-200 border-solid border rounded-lg text-center">
        <img src="@/assets/kid.svg" class="w-80 h-80" alt="book" />
        <ActionButton
          class="mb-5 mt-5 bg-mainColor border-orange-200 border rounded-lg px-8 py-3 font-medium text-white"
          name="Sign up with Google account"
          @on-click="onClickSignUpWithGoogle"
        />
      </v-container>
    </section>
    <v-snackbar v-model="snackbar" color="red accent-2" absolute centered top text outlined>
      {{ text }}
    </v-snackbar>
  </div>
</template>

<script>
import SignUpForm from '@/components/Form/SignUpForm.vue';
import ActionButton from '@/components/Button/ActionButton.vue';
import api from '@/services/apis';
import auth from '@/services/authentications';

export default {
  name: 'TeacherSignUp',
  components: {
    SignUpForm,
    ActionButton,
  },

  data() {
    return {
      text: '',
      timeout: 2000,
      snackbar: false,
    };
  },

  methods: {
    async onSubmit(data) {
      // Integrate with API with form validator
      // console.log('submit');
      if (
        data.password !== ''
        && data.email !== ''
        && data.firstname !== ''
        && data.surname !== ''
      ) {
        if (data.password !== data.confirmpassword) {
          this.text = 'password not match';
          this.snackbar = true;
        } else {
          await api
            .register({
              password: data.password,
              email: data.email,
              firstname: data.firstname,
              surname: data.surname,
              type: 'teacher',
            })
            .then((resp) => {
              if (resp.status === 200) {
                auth.setToken(resp.data.token);
                auth.setRole(resp.data.type);
                auth.setfirstname(resp.data.firstname);
                auth.setsurname(resp.data.surname);
                auth.setuid(resp.data.uid);
                auth.setemail(resp.data.email);
                window.location.href = 'http://localhost:8080';
              }
              return resp.data;
            });
        }
      } else {
        this.text = 'please complete form';
        this.snackbar = true;
      }
    },
    onClickSignUpWithGoogle() {
      // Integrate with API with form validator
      window.location.href = 'http://localhost:3000/api/auth/google/createAccount?role=teacher';
    },
  },
};
</script>
