<template>
  <form @submit="onSubmit">
    <div class="flex flex-col flex-nowrap">
      <div class="flex flex-row">
        <InputForm
          inputLabel="First name"
          type="text"
          v-model.trim="formData.firstname"
        />
        <InputForm
          inputLabel="Surname"
          type="text"
          v-model.trim="formData.lastname"
        />
      </div>
      <InputForm
        inputLabel="Email"
        type="email"
        v-model="formData.email"
      />
      <div class="flex flex-row">
        <InputForm
            inputLabel="Password"
            type="password"
            v-model="formData.password"
        />
        <InputForm
            inputLabel="Confirm Password"
            type="password"
            v-model="formData.confirmpassword"
        />
      </div>
      <div class="flex flex-row">
        <input
          type="checkbox"
          id="agree"
          :value="agree"
        />
        <label
          for="agree"
          class="ml-3 font-light text-sm text-grayColor"
        >
          I agree to all the term, Privacy Policy .
        </label>
      </div>
      <ActionButton
        class="
          mt-3 flex-auto w-80 bg-subColor
          border-orange-200 border border-solid rounded-lg
          px-10 py-3 font-semilight text-mainColo"
        name="Create Account"
        type="submit"
      />
    </div>
  </form>
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
        lastname: '',
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
