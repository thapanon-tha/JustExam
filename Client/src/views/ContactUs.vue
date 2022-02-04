<template>
  <div>
    <h1 class="font-light text-5xl text-center mt-15">Contact us</h1>
    <div class="flex flex-row justify-center gap-40 mt-40 mb-80">
      <div>
        <p>Thapanon Sodngam</p>
        <p>Email: thapanon.sodnyam@gmail.com</p>
      </div>
      <div>
        <p>Thanaporn Cheenthada</p>
        <p>Email: thanaporn.7209@mail.kmutt.ac.th</p>
      </div>
      <div>
        <p>Rungwigrai Payakkanuwat</p>
        <p>Email: rung69@gmail.com</p>
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
