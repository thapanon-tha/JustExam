<template>
  <div>
    <input
      type="checkbox"
      class="h-4 w-4"
      :value="modelValue"
    />
    <label
      class="ml-2 font-semilight text-grey-700 text-md"
    >
      {{ textCheckbox }}
    </label>
  </div>
</template>

<script>
export default {
  name: 'CheckboxForm',
  props: {
    textCheckbox: {
      type: String,
      default: '',
    },
    textRight: {
      type: String,
      default: '',
    },
    modelValue: {
      type: String,
    },
  },
};
</script>
