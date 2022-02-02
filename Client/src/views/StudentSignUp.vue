<template>
  <div class="flex flex-row justify-between">
    <section class="ml-32 mt-16 mb-40">
      <h1 class="text-4xl mb-10">Sign up for student</h1>
      <sign-up-form></sign-up-form>
      <div>
        <CheckboxForm
        textCheckbox="Yes, I am a student."
        class="mt-3"
        />
      </div>
      <div>
        <CheckboxForm
        textCheckbox="I agree to all the term, Privacy Policy ."
        class="mt-3"
        />
      </div>        
      <div>
        <MainButton
        class="mt-3 flex-auto w-80"
        name="Create Account"
        to="Login"
        />
      </div>
    </section>
    <section class="box-border mt-32 ml-10 mr-32 mb-40 flex flex-col">
      <v-container class="bg-subColor border-orange-200 border-solid border rounded-lg text-center">
        <img src="@/assets/kid.svg" class="w-80 h-80 ml-20">
        <OrangeButton
        name="Sign up with Google account"
        class="mb-5 mt-5"
        />
      </v-container>
    </section>
  </div>
  
</template>

<script>
import SignUpForm from '@/components/signup/SignUpForm.vue';
import CheckboxForm from '@/components/Form/CheckboxForm.vue';
import MainButton from '@/components/Button/MainButton.vue';
import OrangeButton from '@/components/Button/OrangeButton.vue';

export default {
  name: 'StudentSignUp',
  components: {
    SignUpForm,
    CheckboxForm,
    MainButton,
    OrangeButton,

  },
  data() {
    return {};
  },
  mounted() {
    // 
  },

};
</script>