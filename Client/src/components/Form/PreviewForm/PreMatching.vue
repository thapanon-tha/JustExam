<template>
    <div class="ml-10 mt-10 mr-10 mb-20">
        <div class="break-words p-3 mb-3">
            {{ questionData.question }}
        </div>
        <div class="ml-5" v-for="(item, index) in questionData.matchs" :key="item.index">
            <p
                class="px-5 py-3 mt-2 mr-10 w-7/8 break-words"

            >
                {{ `${index + 1})` }} {{ item.subquestion }}
            </p>
            <select
                class=" ml-10 border-2 border-solid border-mainColor border-opacity-70
                        rounded-md bg-white px-5 py-2 focus:outline-none"
                v-model="item.matchanswer"
            >
                <option disabled value="">Select matching answer</option>
                <option
                    v-for="item in questionData.listOfMatchsAnswer"
                    :key="item"
                    :value="item"
                >
                    {{ item }}
                </option>
            </select>
        </div>
    </div>
</template>

<script>

export default {
  name: 'PreMatching',
  props: ['value'],
  data() {
    return {
      questionData: this.value,
    };
  },
};

</script>

<style scoped>
select {
  width: 600px;
  max-width: 100%;

}

option {
  -moz-white-space: pre-wrap;
  -o-white-space: pre-wrap;
  white-space: pre-wrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-bottom: 1px solid #DDD;
}
</style>
