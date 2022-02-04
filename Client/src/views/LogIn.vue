<template>
  <div class="flex flex-row justify-between">
    <form class="ml-56 mt-28 mb-40 ">
      <h1 class="text-4xl">Login to your account</h1>
      <div class="mt-10">
        <InputForm
        input_label="Email"
        type="email"
        
        />
      </div>
      <div class="mt-6">
        <InputForm
        input_label="Password"
        type="password"
        />
      </div>
      <div class="mt-6">
        <CheckboxForm
        textCheckbox="Remember me"
        />
      </div>
      <div class="mt-6">
        <MainButton
        name="Login"
        to="ExamChannelTeacher"
        class="flex-auto w-5/6"
        />
      </div>
    </form>
    <section class="box-border mt-28 ml-48 mr-52 flex flex-col">
      <v-container class="bg-subColor border-orange-200 border-solid border rounded-lg text-center">
        <img src="@/assets/book.svg" class="w-80 h-80 ml-20">
        <OrangeButton
        name="Login with Google account"
        class="mb-5 mt-5"
        />
      </v-container>
    </section>
  
    
  </div>
</template>

<script>
import LoginElement from '@/components/login/LoginElement.vue';
import InputForm from '@/components/Form/InputForm.vue';
import CheckboxForm from '@/components/Form/CheckboxForm.vue';
import MainButton from '@/components/Button/MainButton.vue';
import OrangeButton from '@/components/Button/OrangeButton.vue';
// import book from '@/assets/book.svg';

export default {
  name: 'Login',
  components: {
    LoginElement,
    InputForm,
    CheckboxForm,
    MainButton,
    OrangeButton,
  },
  data() {
    return {};
  },
  mounted() {},
};
</script>
