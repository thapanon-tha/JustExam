<template>
    <button @click="onClick(to)">
        <div
          class="bg-subColor border-orange-200
          border rounded-lg px-8 py-3
          font-medium text-mainColor"
        >
            {{ name }}
        </div>
    </button>
</template>

<script>

export default {
  name: 'ActionButton',
  props: {
    name: {
      type: String,
      default: 'Button',
    },
    to: {
      type: String,
      // default: 'Home',
    },
    onClick: {
      type: Function,
      default: () => true,
    },
  },
  methods: {
    onClick(pageName) {
      this.$router.push({ name: pageName }).catch(() => {});
    },
  },
};
</script>
