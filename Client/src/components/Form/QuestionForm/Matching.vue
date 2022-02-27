<template>
  <div>
    <div class="flex justify-center mb-52">
      <div class="border-l-4 border-mainColor h-10">
        <QuillTextEditor
          placeholder="Main Question"
          theme="snow"
          width="8/9"
          height="40"
          v-model="mainquestion"
        />
      </div>
    </div>
    <div class= "mb-5 ml-3" v-for="(item, index) in match" :key="item.id" :subquestion="item.subquestion" 
          :matchanswer="item.matchanswer"
    >
      <div class="flex justify-start">
        <div class="shadow-sm border-mainColor border-l-4 mb-3 ">
          <QuillTextEditor
            :placeholder="`Sub-question ${index + 1}`"
            theme="bubble"
            width="96"
            height="2/4"
            :name="`match[${index}][subquestion]`"
            v-model="item.subquestion"
          /> 
        </div>
        <div class="ml-20">
          <ActionButton
            class="text-mainColor"
            name="x"
            @on-click="deleteMatch(index)"
          />
      </div>
      </div>
      <div class="flex justify-start">
        <div class="shadow-sm border-mainColor border-l-4 mb-3">
          <QuillTextEditor
            :placeholder="`Matched Answer ${index + 1}`"
            theme="bubble"
            width="96"
            height="2/4"
            :name="`match[${index}][matchanswer]`"
            v-model="item.matchanswer"
          /> 
        </div>
      </div>
    </div>
    <ActionButton
      class="mt-3 ml-3 bg-subColor border-orange-200
            border border-solid rounded-lg px-3 py-2
            font-semilight text-mainColor"
      name="+ Add a match"
      @on-click="addMatch"
    />
  </div>
</template>

<script>
import QuillTextEditor from '@/components/TextEditor/QuillTextEditor';
import ActionButton from '@/components/Button/ActionButton.vue';
import CheckboxForm from '@/components/Form/CheckboxForm.vue';

export default {
  name: 'Matching',
  components: {
    QuillTextEditor,
    ActionButton,
    CheckboxForm,
  },
  props: {

    no: {
          type: String,
          default: 'no'
        },
  },
  emits: ['delete'],
  data() {
    return {
      mainquestion: '',
      match: [
        {
          id: 1,
          subquestion: "A",
          matchanswer: "A",
        },
      ],
      nextChoiceId: 2,
    };
  },
  methods: {
    addMatch() {
      this.match.push(
        {
          id: this.nextChoiceId++,
          subquestion: this.subquestion,
          matchanswer: this.matchanswer,
        }
      );
    },
    deleteMatch(index) {
      console.log('Delete this index', index);
      console.log(this.match);   
      console.log('Deleting value', this.match[index]);  
      this.match.splice(index, 1);
    },

    
  },

};

</script>

