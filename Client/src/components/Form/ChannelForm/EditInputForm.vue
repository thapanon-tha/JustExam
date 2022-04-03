<template>
    <div>
        <label class="form-label inline-block mb-2 text-gray-700 font-semilight text-xl">
            {{ label }}
        </label>
        <div class="flex flex-row">
            <div class="w-96">
                <input
                    :type="type"
                    :value="value"
                    ref="new_value"
                    @input="$emit('input', $event.target.value)"
                    :placeholder="label"
                    :disabled="!isEditing"
                    class="w-5/6 px-3 py-3 text-base font-semilight
                    text-gray-700 bg-white bg-clip-padding border border-solid
                    border-mainColor border-opacity-40 rounded-md transition ease-in-out m-0
                    focus:text-black focus:bg-subColor focus:mainColor focus:border-opacity-100
                    focus:outline-none"
                    :class="{view: !isEditing}"
                >
            </div>
            <v-icon
                @click="isEditing = !isEditing" v-if="!isEditing"
                class="ml-5 text-right"
                big
                color="orange darken-2"
            >
                settings
            </v-icon>
            <v-icon
                @click="onClick" v-else-if="isEditing"
                class="ml-5 text-right"
                big
                color="green accent-3"
            >
                check_circle
            </v-icon>
            <v-icon
                v-if="isEditing" @click="isEditing = false"
                class="ml-5 text-right"
                big
                color="deep-orange lighten-1"
            >
                cancel
            </v-icon>
        </div>
    </div>
</template>
<script>

export default {
  name: 'EditInputForm',
  props: {
    label: {
      type: String,
      default: 'Text',
    },
    type: {
      type: String,
      default: 'text',
    },
    value: {
      type: String,
    },
  },
  methods: {
    save() {
      this.value = this.$refs.new_value.value;
      this.isEditing = !this.isEditing;
    },
  },
  emits: ['update:modelValue'],
};
</script>

<style>
.view {
  border-color: transparent;
  background-color: initial;
  color: initial
}
</style>
