<template>
  <div>
    <input
      type="checkbox"
      class="h-3 w-3 mr-2"
      v-model="valueCorrect"
      @change="onChange($event)"
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
