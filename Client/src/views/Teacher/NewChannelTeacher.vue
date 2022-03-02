<template>
  <div class="mb-96">
    <Header main="Exam channel" current=" > New channel" button="Back" to="ExamChannelTeacher" />
    <div class="mt-20">
      <form>
        <div class="flex flex-row justify-center gap-40">
          <div class="flex flex-col gap-5">
            <h1 class="text-gray-700 font-semibold text-2xl">Channel Information</h1>
            <div class="form-control">
              <InputForm
                inputLabel="Channel Title"
                type="text"
                v-model="title"
              />
            </div>
            <div class="form-control">
              <InputForm
                inputLabel="Channel Description"
                type="text"
                v-model="description"
              />
            </div>
            <div class="form-control">
              <DatePicker
                v-model="datePicked"
              />
            </div>
            <div class="form-control">
              <TimePicker labelText="Time"

              />
            </div>
          </div>
          <div class="form-control">
            <div class="flex flex-col justify-center gap-5">
              <h1 class="text-gray-700 font-semibold text-2xl">Exam setting</h1>
              <div>
                <Checkbox2
                  textRight="Random sections"
                  v-model="examsetting"
                />
              </div>
              <div>
                <Checkbox2
                  textRight="Random questions in section"
                  v-model="examsetting"
                />
              </div>
              <div>
                <Checkbox2
                  textRight="Shuffle choices"
                  v-model="examsetting"
                />
              </div>
              <div>
                <Checkbox2
                  textRight="Show correct answers after submit the exam"
                  v-model="examsetting"
                />
              </div>
              <div>
                <Checkbox2
                  textRight="Show total scores after submit the exam"
                  v-model="examsetting"
                />
              </div>
              <div>
                <Checkbox2
                  textRight="Cannot submit the exam if there are missed answers"
                  v-model="examsetting"
                />
              </div>
              <div> {{ examsetting }} </div>
            </div>
          </div>
        </div>
      </form>
    </div>
    <ActionButton
        class="ml-56 mt-10 bg-white border-orange-200
               border border-solid rounded-lg px-6 py-4
               font-semilight text-mainColor"
        name="+ Add your exam"
        
    />

    <div class="flex justify-end mr-56">
      <ActionButton
        class="bg-white border-orange-200 border
                 border-solid rounded-lg px-8 py-3
                 font-semilight text-grayColor"
        name="Cancel"
        @on-click="onClickCancel"
      />
      <ActionButton
        class="ml-10 bg-white border-orange-200 border
               border-solid rounded-lg px-6 py-4 font-semilight
               text-mainColor"
        name="Create"
        @on-click="submitForm"
      />
    </div>
  </div>
</template>

<script>
import ActionButton from '@/components/Button/ActionButton.vue';
import Header from '@/components/Header/Header.vue';
import InputForm from '@/components/Form/InputForm.vue';
import Checkbox2 from '@/components/Form/Checkbox2.vue';
import DatePicker from '@/components/Form/DatePicker.vue';
import TimePicker from '@/components/Form/TimePicker.vue';

export default {
  name: 'NewChannelTeacher',
  components: {
    ActionButton,
    Header,
    InputForm,
    Checkbox2,
    DatePicker,
    TimePicker,
  },
  data() {
    return {
      title: '',
      description: '',
      examsetting: [],
      datePicked: new Date(),
      

    };
  },
  methods: {
    submitForm() {
      this.title = '';
      this.description = '';
    },
    onClickCancel() {
      this.$router.push({ name: 'ExamChannelTeacher' }).catch(() => true);
    },
  },
};
</script>
