<template>
  <div>
    <div class="flex flex-col flex-nowrap">
      <div class="flex flex-row">
        <InputForm inputLabel="First name" type="text" v-model.trim="formData.firstname" />
        <InputForm inputLabel="Surname" type="text" v-model.trim="formData.surname" />
      </div>
      <InputForm inputLabel="Email" type="email" v-model="formData.email" />
      <div class="flex flex-row">
        <InputForm inputLabel="Password" type="password" v-model="formData.password" />
        <InputForm
          inputLabel="Confirm Password"
          type="password"
          v-model="formData.confirmpassword"
        />
      </div>
      <div class="flex flex-row mt-3 mb-3 ml-2">
        <input class="mt-1" type="checkbox" id="agree" v-model="agree" />
        <label for="agree" class="ml-3 font-light text-sm text-grayColor">
          I agree to all the term, Privacy Policy .
        </label>
      </div>
      <button
        v-if="agree"
        class="mt-3 flex-auto w-80 bg-mainColor border-orange-200 border border-solid rounded-lg px-10 py-3 font-semilight text-white"
        @click="onSubmit"
      >
        <div>Create Account</div>
      </button>
    </div>
  </div>
</template>

<script>
import InputForm from '@/components/Form/InputForm.vue';
import ActionButton from '@/components/Button/ActionButton.vue';

export default {
  name: 'SignUpForm',
  components: {
    InputForm,
    ActionButton,
  },
  data() {
    return {
      agree: false,
      formData: {
        firstname: '',
        surname : '',
        password: '',
        confirmpassword: '',
      },
    };
  },
  methods: {
    onSubmit() {
      this.$emit('on-submit', this.formData);
    },
  },
};
</script>
