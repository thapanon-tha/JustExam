<template>
  <div class="flex">
    <input type="checkbox" class="h-4 w-4 mt-1" v-model="value" @change="onChange()" />
    <p class="text-gray-700 font-semilight text-xl w-auto ml-5">
      {{ textRight }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'Checkbox3',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    textRight: {
      type: String,
      default: '',
    },
    disable: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {};
  },
  methods: {
    onChange() {
      this.$emit('input', this.value);
    },
  },
};
</script>

<style>
.view {
  border-color: transparent;
  background-color: initial;
  color: #ef7f4c;
}
</style>
