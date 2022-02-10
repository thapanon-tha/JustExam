<template>
    <button @click="onClick">
      <div>
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
    icons: {
    },
  },
  methods: {
    onClick() {
      this.$emit('onClick');
  },
  }
};

//  class="bg-subColor border-orange-200
//       border rounded-lg px-8 py-3
//       font-semilight text-mainColor"
</script>
