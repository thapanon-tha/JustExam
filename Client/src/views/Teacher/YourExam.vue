<template>
  <div>
    <Header/>
    <section class="bg-subColor border rounded-xl border-solid border-editorColor mt-20 mb-56 ml-56 mr-56">
      <div class="flex flex-col justify-center">
        <div v-for="(item, index) in qlist" :key="index" class="mt-10">
          <div class="flex flex-col justify-center">
            <QuestionList
              :no="`Question ${index + 1}`"
              @delete="deleteQuestion(index)"
            />
          </div>
        </div>  

        <action-button
          class="mt-10 ml-13 mr-13 mb-10 bg-white border-orange-200 border border-solid rounded-lg px-3 py-2 font-semilight text-mainColor"
          name="+ Add a question"
          @on-click="addQuestion"
        ></action-button>
      </div>
    </section>
  </div>
  
</template>

<script>

import ActionButton from '@/components/Button/ActionButton.vue';
import Header from '@/components/Header/Header';
import QuestionList from '@/components/Form/QuestionForm/QuestionList';

export default {
  name: 'YourExam',
  components: {
    QuestionList,
    ActionButton,
    Header,
  },
  data() {
    return {
      qlist: [],
    };
  },
  methods: {
    addQuestion() {
      this.qlist.push(
        {
          
        }
      );
    },
    deleteQuestion(index) {
      this.qlist.splice(index, 1);
    }
  },
  mounted() {
    //
  },
};

</script>
