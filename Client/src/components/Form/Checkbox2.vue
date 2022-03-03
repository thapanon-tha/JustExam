<template>
  <div class="flex flex-row">
    <h1 class="border-mainColor border-l-4 mb-3 px-4 py-2 w-40 ">{{ text }}</h1>
    <input
      type="checkbox"
      class="h-3 w-3 mr-2 mt-3"
      v-model="valueCorrect"
      @change="onChange($event)"
    />
    <label class="ml-2 mt-2">
      {{ label }}
    </label>
  </div>
</template>

<script>
export default {
  name: 'Checkbox2',
  props: {
    text: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    onChangeFunc: {
      type: Function,
      default: () => true,
    },
    value: Boolean,
  },
  data() {
    return {
      valueCorrect: this.value,
    };
  },
  methods: {
    onChange() {
      this.$emit('input', this.valueCorrect);
      this.onChangeFunc();
    },
  },
  model: {
    prop: "value", // บอกว่า v-model ให้เข้า value
    event: "input", // บอกว่า event ที่จะยิงออกไปหาคือตอน blur
  },
};
</script>
