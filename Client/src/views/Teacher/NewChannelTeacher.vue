<template>
  <div class="mb-96">
    <Header main="Exam channel" current=" > New channel" button="Back" to="ExamChannelTeacher" />
    <div class="mt-20">
      <form> 
        <div class="flex flex-row justify-center gap-40">
          <div >
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
                
                />
              </div>
              <div class="form-control">
                <TimePicker labelText="Time" 

                />
              </div>
            </div>
          </div>
          <div class="form-control">
            <div class="flex flex-col justify-center gap-5">
              <h1 class="text-gray-700 font-semibold text-2xl">Exam setting</h1>
              <div>
                <Checkbox2
                  textRight="Random sections"
                />
              </div>
              <div>
                <Checkbox2
                  textRight="Random questions in section"
                />
              </div>
              <div>
                <Checkbox2
                  textRight="Shuffle choices"
                />
              </div>
              <div>
                <Checkbox2
                  textRight="Show correct answers after submit the exam"
                />
              </div>
              <div>
                <Checkbox2
                  textRight="Show total scores after submit the exam"
                />
              </div>
              <div>
                <Checkbox2
                  textRight="Cannot submit the exam if there are missed answers"
                />
              </div>
            </div>
          </div> 
        </div>
      </form>
    </div>
    <ActionButton
        class="ml-56 mt-10 bg-white border-orange-200 border border-solid rounded-lg px-6 py-4 font-semilight text-mainColor"
        name="+ Add your exam"
        @on-cick="Add"
    />
    

    <div class="flex justify-end mr-56">
      <OrangeButton
        class=" bg-white border-orange-200 border border-solid rounded-lg px-8 py-3 font-semilight text-grayColor"
        name="Cancel"
        to="ExamChannelTeacher"
      />
      <ActionButton
        class="ml-10 bg-white border-orange-200 border border-solid rounded-lg px-6 py-4 font-semilight text-mainColor"
        name="Create"
        @on-cick="submitForm"
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
import DatePicker from '@/components/Form/DatePicker';
import TimePicker from '@/components/Form/TimePicker';

export default {
  name: 'NewChannelTeacher',
  components: {
    ActionButton,
    OrangeButton,
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

    };
  },
  props: {
    title: {
      type: String,
      default: 'Title'
    },
    description: {
      type: String,
      default: 'Description'
    },
  },
  methods: {
    submitForm() {
      console.log('Title: ' + this.userName);
      this.title = ''; 
      console.log('Description: ' + this.description);
      this.description = '';
      alert('Create Channel Successdul!');
    },
  },
  mounted() {},
};
</script>
