<template>
  <div class="mb-96">
    <Header main="Exam hub" button="Search">
      <input
        class="w-80 h-10 border border-solid rounded-md border-outlineColor border-opacity-40 focus:text-black focus:bg-subColor focus:mainColor
                    focus:border-opacity-100 focus:outline-none px-3"
        name="Channel Title"
        type="text"
        placeholder="Search exam"
      
      />
      <button class="mt-3 ml-3 bg-white border-orange-200 border border-solid rounded-lg px-4 py-2 font-semilight text-mainColor">
        Search
      </button>
    </Header>
    <div class="flex justify-end mr-15 mt-5">
      <select
        class="border rounded-md border-solid border-mainColor border-opacity-40 bg-white
              text-mainColor font-semilight text-sm text-center p-2"
        id="sort"
        name="sort"
        v-model="sort"
      >
        <option value="" disabled>Sort by</option>
        <option
          v-for="(item, index) in sortlist"
          :key="index"
          :value="item.value"
        >{{ item.name }}</option>
      </select>
    </div>
    <div class="grid grid-cols-4 gap-5 ml-40 mr-40 mt-10">
      <div v-if="showSetting" class="w-auto bg-white border-2 border-orange-200 rounded-lg text-xs ml-52 absolute">
        <div class="p-1 border-b-2 border-orange-200 rounded-t-lg hover:bg-mainColor hover:text-white">Edit Channel</div>
        <div class="p-1 rounded-b-lg hover:bg-mainColor hover:text-white">Delete Channel</div>
      </div>
      <div  v-for="box in boxlist" :key="box">
        <div class="w-60">
          <CardHub/> 
           
        </div>
      </div>
    </div>
    <div>
      
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header/Header';
import CardHub from '@/components/Card/CardHub';

export default {
  name: 'ExamHubTeacher',
  components: {
    Header,
    CardHub,
  },
  data() {
    return {
      sort: '',
      boxlist: 5,
      sortlist: [
        {
          name: "Incoming exam",
          value: "comin"
        },
        {
          name: "Alphabetical",
          value: "alpha"
        },
      ],
    };
  },
  mounted() {},
};
</script>
