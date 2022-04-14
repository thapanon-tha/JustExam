<template>
  <button :type="type" @click="onClick" :loading="isLoading">
    <div>
      {{ name }}
    </div>
  </button>
</template>

<script>
export default {
  name: "ActionButton",
  props: {
    name: {
      type: String,
      default: "Button",
    },
    type: {
      type: String,
      default: "Button",
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onClick() {
      this.$emit("on-click");
    },
  },
};
</script>
