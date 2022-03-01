<template>
  <div class="mb-96">
    <Header main="Exam hub" button="Search">
      <input
        class="w-80 h-10 border border-solid rounded-md border-outlineColor border-opacity-40 focus:text-black focus:bg-subColor focus:mainColor
                    focus:border-opacity-100 focus:outline-none px-3"
        name="Channel Title"
        type="text"
        v-model.trim="searchText"
      />
      <button class="mt-3 ml-3 bg-white border-orange-200 border border-solid rounded-lg px-4 py-2 font-semilight text-mainColor">
        Search
      </button>
    </Header>
    <select
      class=" border rounded-md border-solid border-mainColor border-opacity-40 bg-white px-8 py-3
            text-mainColor font-semilight"
      id="type"
      name="type"
    >
      <option></option>
    </select>
    <div>
      <h1></h1>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header/Header';

export default {
  name: 'ExamHubTeacher',
  components: {
    Header,
  },
  data() {
    return {};
  },
  mounted() {},
};
</script>
