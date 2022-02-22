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
  },
  methods: {
    onClick() {
      this.$emit('on-click');
    },
  },
};

//  class="bg-subColor border-orange-200
//       border rounded-lg px-8 py-3
//       font-semilight text-mainColor"
</script>
