<template>
    <button @click="onClick()">
        <div
          class="bg-subColor border-orange-200
          border rounded-lg px-8 py-3
          font-semilight text-mainColor"
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
};
</script>
