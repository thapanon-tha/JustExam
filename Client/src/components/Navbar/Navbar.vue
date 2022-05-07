<template>
  <div class="bg-subColor shadow-md flex flex-row justify-between h-16">
    <div class="flex flex-row">
      <img class="p-3 mr-8" src="@/assets/logo.svg" alt="logo" />
      <NavButton name="Home" to="Home" :borderRight="true" />
      <NavButton
        name="Contact us"
        to="ContactUs"
        v-if="!$store.getters.getIsAuth"
      />
      <NavButton
        name="Exam channel"
        to="ExamChannelTeacher"
        v-if="$store.getters.getIsAuth && $store.getters.getIsTeacher"
      />
      <NavButton
        name="Your exam"
        to="YourExam"
        :borderLeft="true"
        :borderRight="false"
        v-if="$store.getters.getIsAuth && $store.getters.getIsTeacher"
      />
      <NavButton
        name="Exam channel"
        to="ExamChannelStudent"
        v-if="$store.getters.getIsAuth && $store.getters.getIsStudent"
      />
      <!-- {{ $store.getters.getIsStudent }} -->
      <NavButton
        name="Exam hub"
        to="ExamHubTeacher"
        :borderLeft="true"
        :borderRight="false"
        v-if="
          $store.getters.getIsAuth &&
          ($store.getters.getIsTeacher || $store.getters.getIsStudent)
        "
      />
    </div>
    <div class="flex flex-row-reverse">
      <NavButton name="Sign up" to="SignUp" v-if="!$store.getters.getIsAuth" />
      <NavButton
        name="Login"
        :borderRight="true"
        to="Login"
        v-if="!$store.getters.getIsAuth"
      />
      <NavButtonAction
        name="Logout"
        :borderLeft="true"
        :onClick="onClick"
        v-if="$store.getters.getIsAuth"
      />
      <div class="my-5 mr-10 text-mainColor">
        <h3>{{ $store.getters.getName }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
import NavButton from '@/components/Button/NavButton.vue';
import NavButtonAction from '@/components/Button/NavButtonAction.vue';

export default {
  name: 'Navbar',
  components: {
    NavButton,
    NavButtonAction,
  },
  methods: {
    onClick() {
      this.$store.dispatch({ type: 'doLogout' });
      this.$router.push({ name: 'Home' }).catch(() => {});
    },
  },
};
</script>
