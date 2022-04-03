<template>
    <div>
        <Header
          main="Your Exam"
        >
            <button
                @click="onClickBack"
                class="mt-3 bg-white border-orange-200 border border-solid
                        rounded-lg px-8 py-3 font-semilight text-mainColor"
            >
                Back
            </button>
        </Header>
        <div>
          <div class="ml-72 mt-10">
            <p class="ml-3 font-semibold text-lg text-black w-4/5 break-all">
              {{ examTitle }}
            </p>
            <p class="ml-3 font-semibold text-lg text-black  w-4/5 break-all">
              {{ description }}
            </p>
          </div>
          <div>
            <PreviewList
            />
          </div>
        </div>
    </div>
</template>

<script>
import Header from '@/components/Header/Header.vue';
import PreviewList from '@/components/Form/PreviewForm/PreviewList.vue';

export default {
  name: 'InsideYourExam',
  components: {
    Header,
    PreviewList,
  },
  data() {
    return {
      examTitle: 'Exam Title Data',
      description: 'Exam Description Data',
    };
  },
  methods: {
    onClickBack() {
      this.$router.push({ name: 'YourExam' }).catch(() => true);
      //
      // ทำให้กด Back แล้วหน้า New Exam ยัง Save Data
    },
  },
};
</script>
