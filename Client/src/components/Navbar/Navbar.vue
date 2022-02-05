<template>
  <div class="bg-subColor shadow-sm flex flex-row justify-between h-16">
    <div class="flex flex-row">
      <img
        class="p-3 mr-8"
        src="@/assets/logo.svg"
        alt="logo" />
      <NavButton
        name='Home'
        to='Home'
        v-if='!$store.getters.getIsAuth'
      />
      <NavButton
        name='Tutorial'
        :borderLeft=true
        :borderRight=true
        to='Tutorial'
        v-if='!$store.getters.getIsAuth'
      />
      <NavButton
        name='Contact Us'
        to='ContactUs'
        v-if='!$store.getters.getIsAuth'
      />
      <NavButton
        name='Exam channel'
        to='ContactUs'
        v-if='$store.getters.getIsAuth && $store.getters.getIsTeacher'
      />
      <NavButton
        name='Your exam'
        to='ContactUs'
        :borderLeft=true
        :borderRight=true
        v-if='$store.getters.getIsAuth && $store.getters.getIsTeacher'
      />
      <NavButton
        name='Exam hub'
        to='ContactUs'
        v-if='$store.getters.getIsAuth && $store.getters.getIsTeacher'
      />
    </div>
    <div>
      <NavButton
        name='Login'
        :borderRight=true
        to='Login'
        v-if='!$store.getters.getIsAuth'
      />
      <NavButton
        name='Sign up'
        to='SignUp'
        v-if='!$store.getters.getIsAuth'
      />
      <NavButtonAction
        name='Logout'
        :borderLeft=true
        :onClick="onClick"
        v-if='$store.getters.getIsAuth'
      />
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
