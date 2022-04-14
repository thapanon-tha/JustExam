<template>
  <div class="flex justify-center">

  </div>
</template>

<script>
import InputForm from '@/components/Form/InputForm.vue';
import Checkbox3 from '@/components/Form/Checkbox3.vue';
import DatePicker from '@/components/Form/DatePicker.vue';
import TimePicker from '@/components/Form/TimePicker.vue';

export default {
  name: 'ChannelForm',
  components: {
    InputForm,
    Checkbox3,
    DatePicker,
    TimePicker,
  },
  props: ['value'],
  data() {
    return {
      title: this.value.title,
      description: this.value.description,
      datePicked: this.value.datePicked,
      settingData: {
        randomSec: this.value.randomSec,
        randomQuestion: this.value.randomQuestion,
        shuffleChoices: this.value.shuffleChoices,
        showCAnswer: this.value.showCAnswer,
        showTotalScore: this.value.showTotalScore,
        cantSubmitEmpty: this.value.cantSubmitEmpty,
      },
    };
  },
};
</script>
