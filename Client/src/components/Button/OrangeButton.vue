<template>
    <button @click="clickButton(to)">
        <div
          
        >
          {{ name }}
        </div>
    </button>
</template>

<script>

export default {
  name: 'OrangeButton',
  props: {
    name: {
      type: String,
      default: 'Button',
    },
    to: {
      type: String,
      default: '',
    },
  },
  methods: {
    clickButton(pageName) {
      this.$router.push({ name: pageName }).catch(() => {});
    },
  },
};
</script>
