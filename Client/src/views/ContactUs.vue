<template>
  <div>
    <h1 class="font-light text-5xl text-center mt-15">Contact us</h1>
    <div class="flex flex-row justify-center gap-20 mt-40 mb-80">
      <div>
        <p>Thapanon Sodngam</p>
        <p>6107050xxxx</p>
      </div>
      <div>
        <p>Thanaporn Cheenthada</p>
        <p>61070507209</p>
      </div>
      <div>
        <p>Rungwigrai Payakkanuwat</p>
        <p>61070507219</p>
      </div>
    </div>
  </div>
</template>

<script>
import KnowledgeElement from '@/components/home/KnowledgeElement.vue';

export default {
  name: 'ContactUs',
  components: {
    KnowledgeElement,
  },
  data() {
    return {
      //
    };
  },
  mounted() {},
};
</script>
