<template>
  <div class="mb-96">
    <Header main="Exam channel" current=" > New channel" name="Back" to="ExamChannelTeacher" />
    <div class="mt-20  flex flex-row justify-center">
      <form> 
        <div class="flex flex-col gap-5">
          <h1 class="text-gray-700 font-semibold text-2xl">Channel Information</h1>
          <InputForm
            inputLabel="Channel Title"
            type="text"
          />
          <InputForm
            inputLabel="Channel Description"
            type="text"
          />
          <InputForm
            inputLabel="Schedule"
            type="text"
          />
          <InputForm
            inputLabel="Time"
            type="text"
          />
        </div>
      </form>
      <form>
        <div class="flex flex-col justify-center gap-5 ml-32">
          <h1 class="text-gray-700 font-semibold text-2xl">Exam setting</h1>
          <Checkbox2
            textRight="Random sections"
          />
          <Checkbox2
            textRight="Random questions in section"
          />
          <Checkbox2
            textRight="Shuffle choices"
          />
          <Checkbox2
            textRight="Show correct answers after submit the exam"
          />
          <Checkbox2
            textRight="Show total scores after submit the exam"
          />
          <Checkbox2
            textRight="Cannot submit the exam if there are missed answers"
          />
        </div> 
    </form>
    </div>
    <ActionButton
        class="ml-56 mt-10 bg-white border-orange-200 border border-solid rounded-lg px-6 py-4 font-semilight text-mainColor"
        name="+ Add your exam"
        @on-cick="addExam"
    />
    

    <div class="flex justify-end mb-60 mr-56">
      <OrangeButton
        class=" bg-white border-orange-200 border border-solid rounded-lg px-8 py-3 font-semilight text-grayColor"
        name="Cancel"
        to="ExamChannelTeacher"
      />
      <ActionButton
        class="ml-10 bg-white border-orange-200 border border-solid rounded-lg px-6 py-4 font-semilight text-mainColor"
        name="Create"
        @on-cick="deleteQuestion(index)"
      />
    </div>
  </div>
</template>

<script>
import ActionButton from '@/components/Button/ActionButton.vue';
import OrangeButton from '@/components/Button/OrangeButton.vue';
import Header from '@/components/Header/Header';
import InputForm from '@/components/Form/InputForm';
import Checkbox2 from '@/components/Form/Checkbox2';
import CheckboxForm from '@/components/Form/CheckboxForm';

export default {
  name: 'NewChannelTeacher',
  components: {
    ActionButton,
    OrangeButton,
    Header,
    InputForm,
    Checkbox2,
    CheckboxForm,
  },
  data() {
    return {};
  },
  methods: {
    addChannel() {},
  },
  mounted() {},
};
</script>
