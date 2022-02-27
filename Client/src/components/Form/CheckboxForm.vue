<template>
  <div>
    <input
      type="checkbox"
      class="h-4 w-4"
      :value="value"
      @change="onChange()"
    />
    <label
      class="ml-2 font-semilight text-grey-700 text-md"
    >
      {{ label }}
    </label>
  </div>
</template>

<script>
export default {
  name: 'CheckboxForm',
  props: {
    label: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      value: true,
    };
  },
  methods: {
    onChange() {
      this.$emit('input', this.value);
    },
  },
};
</script>
