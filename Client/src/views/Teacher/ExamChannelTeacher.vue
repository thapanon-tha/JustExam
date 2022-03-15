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
      <div v-if="showSetting" class="w-auto bg-white border-2 border-orange-200 rounded-lg text-xs ml-52 absolute">
        <div class="p-1 border-b-2 border-orange-200 rounded-t-lg hover:bg-mainColor hover:text-white">Edit Channel</div>
        <div class="p-1 rounded-b-lg hover:bg-mainColor hover:text-white">Delete Channel</div>
      </div>
      <div  v-for="box in boxlist" :key="box">
        <div @click="onClick('InsideChannelTeacher')" class="w-60">
          <CardChannel 
            @clickSet="clickSetting"
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
      showSetting: false,
      boxlist: 4,
    };
  },
  methods: {
    onClick(pageName) {
      this.$router.push({ name: pageName }).catch(() => {});
    },
    clickSetting() {
      this.showSetting = !this.showSetting;
    },
  },
  mounted() {
    //
  },
};
</script>
