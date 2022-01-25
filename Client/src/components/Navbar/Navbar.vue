<template>
  <div class="bg-subColor shadow-sm flex flex-row justify-between">
    <div class="flex flex-row">
      <img
        class="p-5 mr-10 "
        src="@/assets/logo.svg"
        alt="logo" />
      <NavButton
        name='Home'
        to='Home'
        />
      <NavButton
        name='Take a tour'
        :borderLeft=true
        :borderRight=true
        to='TakeATour'
        />
      <NavButton
        name='Abous Us'
        to='AboutUs'
        />
    </div>
    <div>
      <NavButton
        name='Login'
        :borderRight=true
        to='Login'
        />
      <NavButton
        name='Sign up'
        to='SignUp'
        />
    </div>
  </div>
</template>

<script>
import NavButton from '@/components/Button/NavButton.vue';

export default {
  name: 'Navbar',
  components: {
    NavButton,
  },
};
</script>
