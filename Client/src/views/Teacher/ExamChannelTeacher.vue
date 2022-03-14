<template>
  <div class="mb-96">
    <Header main="Exam channel">
      <button
        @click="onClick('NewChannelTeacher')"
        class="mt-3 bg-white border-orange-200
                             border border-solid rounded-lg px-8
                             py-3 font-semilight text-mainColor"
      >
        +  New channel
      </button>
    </Header>
    <div class="grid grid-cols-4 gap-5 ml-40 mr-40 mt-20">
      <div  v-for="box in boxlist" :key="box">
        <div @click="onClick('InsideChannelTeacher')" class="w-60">
          <CardChannel 
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header/Header.vue';
import CardChannel from '@/components/Card/CardChannel.vue';

export default {
  name: 'ExamChannelTeacher',
  components: {
    Header,
    CardChannel,
  },
  data() {
    return {
      boxlist: 4,
    };
  },
  methods: {
    onClick(pageName) {
      this.$router.push({ name: pageName }).catch(() => {});
    },
  },
  mounted() {
    //
  },
};
</script>
