<template>
  <div class="mb-96">
    <Header main="Exam channel" current="> Gen301" button="Member" to="ChannelMember" />
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
  </div>
</template>

<script>
import Header from '@/components/Header/Header.vue';
import InputForm from '@/components/Form/InputForm.vue';
import DatePicker from '@/components/Form/DatePicker.vue';
import TimePicker from '@/components/Form/TimePicker.vue';
import Checkbox2 from '@/components/Form/Checkbox2.vue';

export default {
  name: 'InsideChannelTeacher',
  components: {
    DatePicker,
    TimePicker,
    Header,
    InputForm,
    Checkbox2,
  },
};
</script>
