/* eslint-disable object-shorthand */
<template>
  <div class="flex justify-center mt-10 mb-10">
    <div>
      <InputForm inputLabel="Exam Title" type="text" v-model="title" />
      <InputForm
        inputLabel="Exam Description"
        type="text"
        v-model="description"
      />
    </div>
    <div class="">
      <div class="mb-3">
        <div
          class="form-label inline-block mb-2 text-gray-700 font-semilight text-xl"
        >
          <label>Publish Option</label>
        </div>
        <div>
          <v-checkbox
            color="#FB8C00"
            v-model="shareQ"
            hide-details
            :label="`Share only questions to Examhub`"
          ></v-checkbox>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InputForm from '@/components/Form/InputForm.vue';

export default {
  name: 'ExamInfoForm',
  components: {
    InputForm,
  },
  props: ['value'],
  data() {
    return {
      title: this.value.title,
      description: this.value.description,
      shareQ: this.value.shareQ,
    };
  },
  watch: {
    /* eslint-disable */
    title(newVal, oldVal) {
      this.$emit('input', {
        title: this.title,
        description: this.description,
        shareQ: this.shareQ,
      });
    },
    description(newVal, oldVal) {
      this.$emit('input', {
        title: this.title,
        description: this.description,
        shareQ: this.shareQ,
      });
    },
    shareQ(newVal, oldVal) {
      this.$emit('input', {
        title: this.title,
        description: this.description,
        shareQ: this.shareQ,
      });
    },
  },
};
</script>
