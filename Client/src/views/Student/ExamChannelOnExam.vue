<template>
  <div class="mb-60">
    <Header main="Exam channel" current="> On Exam" class="mb-10"> </Header>
    <div class="text-center">
      <v-container>
        <v-row justify="center">
          <v-col cols="8">
            <div class="ml-10 mt-10 mr-10 mb-10">
              <div class="break-words p-3 mb-3">HELLO</div>
              <input
                class="ml-5 w-2/6 px-3 py-3 font-semilight text-gray-700 bg-white bg-clip-padding border-2 border-solid border-mainColor border-opacity-70 rounded-md transition ease-in-out m-0 focus:text-black focus:bg-white focus:mainColor focus:border-opacity-100 focus:outline-none"
                placeholder="Type answer here"
                v-model="questionData.answer"
              />
              <p v-html="title"></p>
            </div>
            <v-container class="max-width">
              <v-pagination v-model="page" class="my-4" :length="10" color="green"></v-pagination>
            </v-container>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header/Header.vue';
// import api from '@/services/apis';

export default {
  name: 'ExamChannelOnExam',
  components: {
    Header,
  },
  data() {
    return {
      channelsApiInfo: {},
      channelInfo: {
        title: '',
        description: '',
        datePicked: '',
      },
      title:
        '<p><span class="ql-formula" data-value="\\epsilon">﻿<span contenteditable="false"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>ϵ</mi></mrow><annotation encoding="application/x-tex">\\epsilon</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height: 0.4306em;"></span><span class="mord mathnormal">ϵ</span></span></span></span></span>﻿</span> <span class="ql-formula" data-value="/sumA">﻿<span contenteditable="false"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">/</mi><mi>s</mi><mi>u</mi><mi>m</mi><mi>A</mi></mrow><annotation encoding="application/x-tex">/sumA</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height: 1em; vertical-align: -0.25em;"></span><span class="mord">/</span><span class="mord mathnormal">s</span><span class="mord mathnormal">u</span><span class="mord mathnormal">m</span><span class="mord mathnormal">A</span></span></span></span></span>﻿</span> <span class="ql-formula" data-value="\\sum A">﻿<span contenteditable="false"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>∑</mo><mi>A</mi></mrow><annotation encoding="application/x-tex">\\sum A</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height: 1em; vertical-align: -0.25em;"></span><span class="mop op-symbol small-op" style="position: relative; top: 0em;">∑</span><span class="mspace" style="margin-right: 0.1667em;"></span><span class="mord mathnormal">A</span></span></span></span></span>﻿</span> </p>',
      questionData: {},
      page: 1,
    };
  },
  methods: {
    onClickMember() {},
  },
  //   created() {
  //     this.apiCall();
  //   },
};
</script>
