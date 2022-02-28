<template>
  <div>
    <input
      type="checkbox"
      class="h-3 w-3 mr-2"
      :value="value"
      @change="onChange()"
    />
    <label>
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
