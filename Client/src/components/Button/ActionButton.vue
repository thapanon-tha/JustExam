<template>
    <button :type=type @click="onClick">
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
    type: {
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
</script>
