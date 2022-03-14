<template>
  <div>
    <div class="flex flex-col">
      <label class="text-xl font-semilight">
          Title
      </label>
      <div class="mt-1 box-border h-40 w-60 p-4 rounded-xl text-white bg-navyColor">
        <section class="rounded-md">
          <div class="mb-10 gap-20">
            <div class="flex flex-row">
              <div class="text-md font-semilight w-5/6 truncate">
                Titleeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
              </div>
              <div @click="clickSet">
                <span class="material-icons ml-3" >settings</span>
              </div>
            </div>
            <div>
              <h2 class="text-sm font-semilight">Date</h2>
              <h2 class="text-sm font-semilight">Time</h2>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'CardExam',
  data() {
    return {
      //
    };
  },
  methods: {
    clickSet() {
      this.$emit('clickSet');
    },
  },
};
</script>
