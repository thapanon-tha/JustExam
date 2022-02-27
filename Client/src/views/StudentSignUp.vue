<template>
  <div class="flex flex-row justify-between">
    <section class="ml-32 mt-16 mb-40">
      <h1 class="text-4xl mb-10">Sign up for student</h1>
      <form @submit="onSubmit" class="add-form">
        <div class="flex flex-nowrap">
          <div class="form-control">
            <InputForm
              inputLabel="First name"
              type="text"
              v-model.trim="studentform.firstname"
            />
          </div>
          <div class="form-control">
            <InputForm
              inputLabel="Surname"
              type="text"
              v-model.trim="studentform.lastname"
            />
          </div>
        </div>
        <div class="form-control">
          <InputForm
            inputLabel="Email"
            type="email"
            v-model="studentform.email"
          />
        </div>
        <div class="flex flex-nowrap">
          <div class="form-control">
            <InputForm
              inputLabel="Password"
              type="password"
              v-model="studentform.password"
            />
            </div>
            <div class="form-control">
              <InputForm
                inputLabel="Confirm Password"
                type="password"
                v-model="studentform.confirmpassword"
              />
            </div>
        </div>
        <div class="form-control">
          <input type="checkbox" id="student" value="student-user" v-model="checkedNames" />
          <label for="student" class="ml-3 font-light text-sm text-grayColor">Yes, I am a student.</label>
        </div>
        <div class="form-control">
          <input type="checkbox" id="agree" value="agree-with-policy" v-model="checkedNames" />
          <label for="agree" class="ml-3 font-light text-sm text-grayColor">I agree to all the term, Privacy Policy .</label>
          <!-- <div>Checked names: {{ checkedNames }}</div> -->
        </div>
        <div>
          <button 
          type="submit" 
          class="mt-3 flex-auto w-80 bg-subColor border-orange-200 border border-solid rounded-lg 
          px-10 py-3 font-semilight text-mainColor"
          >
            Create Account
          </button>
        </div>
      </form>
      
      
    </section>
    <section class="box-border mt-32 ml-10 mr-32 mb-40 flex flex-col">
      <v-container class="bg-subColor border-orange-200 border-solid border rounded-lg text-center">
        <img src="@/assets/kid.svg" class="w-80 h-80 ml-20">
        <OrangeButton
          name="Sign up with Google account"
          class="mb-5 mt-5 bg-mainColor border-orange-200
          border rounded-lg px-8 py-3
          font-medium text-white"
        />
      </v-container>
    </section>
  </div>

</template>

<script>
import CheckboxForm from '@/components/Form/CheckboxForm.vue';
import ActionButton from '@/components/Button/ActionButton.vue';
import OrangeButton from '@/components/Button/OrangeButton.vue';
import InputForm from '@/components/Form/InputForm.vue';

export default {
  name: 'StudentSignUp',
  components: {
    CheckboxForm,
    ActionButton,
    OrangeButton,
    InputForm,
  },
  data() {
    return {
      studentform: {
        firstname: '',
        lastname: '',
        password: '',
        confirmpassword: '',
        checkedNames: [],
        },
    };
  },
  methods: {
    onSubmit(e) {
      //
      
    },
  },
  mounted() {
    //
  },

};
</script>
