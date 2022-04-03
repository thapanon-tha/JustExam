<template>
    <div class="ml-10 mt-10 mr-10 mb-10">
        <div class="break-words p-3 mb-3">
            {{ questionData.question }}
        </div>
        <div class="ml-10">
            <CheckboxForm
                label="True"
                v-model="questionData.true"
            />
            <CheckboxForm
                label="False"
                v-model="questionData.false"
            />
        </div>
    </div>
</template>

<script>
import CheckboxForm from '@/components/Form/CheckboxForm.vue';

export default {
  name: 'PreTrueFalse',
  components: {
    CheckboxForm,
  },
  props: ['value'],
  data() {
    return {
      questionData: this.value,
    };
  },
};
</script>
