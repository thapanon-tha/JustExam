<template>
    <div class="ml-10 mt-10 mr-10 mb-10">
        <div class="break-words p-3 mb-3">
            {{ questionData.question }}
        </div>
        <div class="ml-5 break-normal" v-for="item in questionData.answers" :key="item.id">
            <input
            class="h-4 w-4 mr-2"
            type="checkbox"
            v-model="item.correct"
            />
            <label class="break-all">
            {{ item.optionData}}
            </label>
        </div>
    </div>
</template>

<script>

export default {
  name: 'PreMultiple',
  props: ['value'],
  data() {
    return {
      questionData: this.value,
    };
  },
};
</script>
