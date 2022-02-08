<template>
    <div>
        <div class="mb-3 xl:w-96">
            <label
                class="form-label inline-block mb-2
                text-gray-700
                font-semilight
                text-xl">
                {{ inputLabel }}
            </label>
            <input
                :type=type
                :value="value"
                @input="onInput($event)"
                class="
                    form-control flex w-5/6
                    px-3 py-3 text-base font-light
                    text-gray-700 bg-subColor bg-clip-padding
                    border border-solid border-mainColor border-opacity-40
                    rounded-md transition ease-in-out
                    m-0focus:text-black focus:bg-subColor focus:mainColor
                    focus:border-opacity-100 focus:outline-none"
                :placeholder=inputLabel
            />
        </div>
    </div>
</template>

<script>

export default {
  name: 'InputForm',
  props: {
    inputLabel: {
      type: String,
      default: 'Text',
    },
    type: {
      type: String,
      default: 'text',
    },
  },
  data() {
    return {
      value: '',
    };
  },
  methods: {
    onInput(event) {
      this.$emit('input', event.target.value);
    },
  },
};
</script>
