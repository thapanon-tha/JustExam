<template>
  <div class="flex flex-row justify-between">
    <section class="ml-32 mt-16 mb-40">
      <h1 class="text-4xl mb-10">Sign up for teacher</h1>
      <SignUpForm @on-submit="onSubmit"/>
    </section>
    <section class="box-border mt-32 ml-10 mr-32 mb-40 flex flex-col">
      <v-container class="bg-subColor border-orange-200 border-solid border rounded-lg text-center">
        <img
          src="@/assets/kid.svg"
          class="w-80 h-80 ml-20"
          alt="book"
        >
        <ActionButton
          class="mb-5 mt-5 bg-mainColor border-orange-200
                 border rounded-lg px-8 py-3
                 font-medium text-white"
          name="Sign up with Google account"
          @on-click="onClickSignUpWithGoogle"
        />
      </v-container>
    </section>
  </div>
</template>

<script>
import SignUpForm from '@/components/Form/SignUpForm.vue';
import ActionButton from '@/components/Button/ActionButton.vue';

export default {
  name: 'TeacherSignUp',
  components: {
    SignUpForm,
    ActionButton,
  },
  methods: {
    onSubmit(data) {
      // Integrate with API with form validator
      console.log('submit');
      console.log(data);
    },
    onClickSignUpWithGoogle() {
      // Integrate with API with form validator
      console.log('Signup with google');
    },
  },
};
</script>
