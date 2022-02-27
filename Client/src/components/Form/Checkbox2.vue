<template>
    <div class="flex justify-between">
        <label
          class="text-gray-700 font-semilight text-xl mr-20"
        >
          {{ textRight }}
        </label>
        <input
          type="checkbox"
          class="h-4 w-4"
        />
       
    </div>
</template>

<script>
export default {
  name: 'Checkbox2',
  props: {
    textRight: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      for: '',
      id: ''
    };
  },
};
</script>
