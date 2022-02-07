<template>
    <section class="bg-subColor border rounded-xl border-orange-200 justify-center mt-5 ml-52 mr-40 mb-1"> 
      <div class="mt-20 mb-20 mr-8 ml-8">
        <h1 class="mr-5 mb-5 text-xl font-semilight text-mainColor">Ex Multiple Choice</h1>
        <div class="flex flex-row  justify-center mb-5">
          <div>
            <text-editor-compo></text-editor-compo>
          </div>
          <div class="ml-5">
            <select-question></select-question>
          </div>
        </div>
        <div>
          <ActionButton
          name="+ Add an option"
          :onClick="addOption"
        />
        </div>
      </div>
      
        
    </section>
</template>

<script>
import TextEditorCompo from '@/components/TextEditor/TextEditorCompo.vue';
import SelectQuestion from '@/components/Form/SelectQuestion.vue';
import ActionButton from '@/components/Button/ActionButton.vue';

export default {
  name: 'MultipleChoice',
  components: {
    TextEditorCompo,
    SelectQuestion,
    ActionButton,
  }, ////mt-40 mb-80 mr-80 ml-40 
  methods: {
    addOption() {

    },
  },
};
</script>
