<template>
  <div class="flex justify-center mt-10 mb-10">
    <div class="">
      <InputForm inputLabel="Exam Title" type="text" v-model="title" />
      <InputForm inputLabel="Exam Description" type="text" v-model="description" />
    </div>
    <div class="">
      <div class="felx flex-row mb-3">
        <div class="form-label inline-block mb-2 text-gray-700 font-semilight text-xl">
          <label>Select Category</label>
        </div>
        <div>
          <select
            class="w-80 px-3 py-3 text-base font-semilight text-gray-700 text-center bg-subColor border border-solid border-mainColor border-opacity-40 rounded-md transition ease-in-out focus:text-black focus:bg-subColor focus:mainColor"
          >
            <option>Select category</option>
            <option>Math</option>
            <option>Data</option>
            <option>English</option>
          </select>
        </div>
      </div>
      <div class="mb-3">
        <div class="form-label inline-block mb-2 text-gray-700 font-semilight text-xl">
          <label>Publish Option</label>
        </div>
        <div>
          <select
            class="w-80 px-3 py-3 text-base font-semilight text-gray-700 text-center bg-subColor border border-solid border-mainColor border-opacity-40 rounded-md transition ease-in-out focus:text-black focus:bg-subColor focus:mainColor"
          >
            <option>Select option</option>
            <option>Share only questions</option>
            <option>Share both questions and answers</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InputForm from "@/components/Form/InputForm.vue";

export default {
  name: "ExamInfoForm",
  components: {
    InputForm,
  },
  props: ["value"],
  data() {
    return {
      title: this.value.title,
      description: this.value.description,
    };
  },
  watch: {
    title: function (newVal, oldVal) {
      this.$emit("input", { title: this.title, description: this.description });
    },
    description: function (newVal, oldVal) {
      this.$emit("input", { title: this.title, description: this.description });
    },
  },
};
</script>
