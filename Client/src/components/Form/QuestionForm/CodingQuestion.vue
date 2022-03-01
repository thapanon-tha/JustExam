<template>
  <div>
    <div class="flex justify-center mb-52">
      <div class="border-l-4 border-mainColor h-10">
        <QuillTextEditor
          placeholder="Type code here"
          theme="snow"
          width="8/9"
          height="40"
          v-model="questionData.code"
          :onChangeFunc="onChange"
        />
      </div>
    </div>
    <div class="ml-3">
      <div class="flex justify-start">
        <div class="shadow-sm border-mainColor border-l-4 mb-3">
          <QuillTextEditor
            :placeholder="`Question`"
            theme="bubble"
            width="96"
            height="2/4"
            v-model="questionData.question"
            :onChangeFunc="onChange"
          />
        </div>
      </div>
      <div class="flex justify-start">
        <div class="shadow-sm border-mainColor border-l-4 mb-3">
          <QuillTextEditor
            :placeholder="`Input`"
            theme="bubble"
            width="96"
            height="2/4"
            v-model="questionData.input"
            :onChangeFunc="onChange"
          />
        </div>
      </div>
      <div class="flex justify-start">
        <div class="shadow-sm border-mainColor border-l-4 mb-3">
          <QuillTextEditor
            :placeholder="`Output`"
            theme="bubble"
            width="96"
            height="2/4"
            v-model="questionData.output"
            :onChangeFunc="onChange"
          />
        </div>
      </div>
      <h1 class="mt-5 mb-1">Example</h1>
      <div v-for="(item, index) in questionData.example" :key="item.id" class="mb-5">
        <div class="flex justify-start">
          <div class="shadow-sm border-mainColor border-l-4 mb-3">
            <QuillTextEditor
              :placeholder="`Testcase Input ${index + 1}`"
              theme="bubble"
              width="96"
              height="2/4"
              :name="`example[${index}][xampleinput]`"
              v-model="item.xampleinput"
              :onChangeFunc="onChange"
            />
          </div>
          <div class="ml-20">
            <ActionButton
              class="text-mainColor flex justify-end"
              name="x"
              @on-click="deleteExample(index)"
            />
          </div>
        </div>
        <div class="flex justify-start">
          <div class="shadow-sm border-mainColor border-l-4 mb-3">
            <QuillTextEditor
              :placeholder="`Testcase Output ${index + 1}`"
              theme="bubble"
              width="96"
              height="2/4"
              :name="`example[${index}][xampleoutput]`"
              v-model="item.xampleoutput"
              :onChangeFunc="onChange"
            />
          </div>
        </div>
      </div>
      <ActionButton
        class="mt-3 bg-subColor border-orange-200 border border-solid rounded-lg px-3 py-2 font-semilight text-mainColor"
        name="+ Add an example"
        @on-click="addExample"
      />
    </div>
  </div>
</template>

<script>
import QuillTextEditor from "@/components/TextEditor/QuillTextEditor.vue";
import ActionButton from "@/components/Button/ActionButton.vue";

export default {
  name: "CodingQuestion",
  components: {
    QuillTextEditor,
    ActionButton,
  },
  prop: { value: Object },
  data() {
    return {
      questionData: this.value,
    };
  },
  methods: {
    addExample() {
      this.questionData.example.push({
        id: this.questionData.example.length + 1,
        xampleinput: "",
        xampleoutput: "",
      });
    },
    deleteExample(index) {
      this.questionData.example.splice(index, 1);
    },
    onChange() {
      this.$emit("input", this.questionData);
    },
  },
};
</script>
