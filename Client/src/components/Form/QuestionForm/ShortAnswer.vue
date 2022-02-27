<template>
  <div>
    <div class="flex justify-center gap-5 mb-52">
      <div class="border-l-4 border-mainColor h-10">
        <QuillTextEditor
          placeholder="Question"
          theme="snow"
          width="8/9"
          height="40"
          v-model="question"
        />
      </div>
    </div>
    <div  class="flex flex-row ml-3" v-for="(item, index) in keyans" :key="item.id" :ans="item.ans">
      <div class="shadow-sm border-mainColor border-l-4 mb-3 ">
        <QuillTextEditor
          class="bg-mainColor"
          :placeholder="`Key answer ${index + 1}`"
          theme="bubble"
          width="60"
          height="2/4"
          :name="`keyans[${index}][ans]`"
          v-model="item.ans"
        /> 
      </div>
      <div class="ml-20">
        <ActionButton
          class="text-mainColor"
          name="x"
          @on-click="deleteChoice(index)"
        />
      </div>
    </div>
    <ActionButton
      class="mt-3 ml-3 bg-subColor border-orange-200
            border border-solid rounded-lg px-3 py-2
            font-semilight text-mainColor"
      name="+ Add a key answer"
      @on-click="addKey"
    />
  </div>
</template>

<script>
import QuillTextEditor from '@/components/TextEditor/QuillTextEditor';
import ActionButton from '@/components/Button/ActionButton.vue';
import CheckboxForm from '@/components/Form/CheckboxForm.vue';

export default {
  name: 'ShortAnswer',
  components: {
    QuillTextEditor,
    ActionButton,
    CheckboxForm,
  },
  emits: ['delete'],
  data() {
    return {
      question: '',
      keyans: [
        {
          id: 1,
          ans: "A",
        },
      ],
      nextkeyId: 2,
    };
  },
  methods: {
    addKey() {
      this.keyans.push(
        {
          id: this.nextkeyId++,
          ans: this.ans,
        }
      );
    },
    deleteChoice(index) {
      console.log('Delete this index', index);
      console.log(this.keyans);   
      console.log('Deleting value', this.keyans[index]);  
      this.keyans.splice(index, 1);
    },

    
  },

};

</script>

