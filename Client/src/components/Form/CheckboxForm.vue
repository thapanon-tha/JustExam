<template>
    <div>
        <input
        type="checkbox"
         class="h-4 w-4"
        />
        <label
          class="ml-2 font-light text-grey-700"
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
      default: 'text',
    },
  },
};
</script>
