<template>
  <button class="box-border h-40 w-72 rounded-xl text-white bg-navyColor hover:text-orange-500">
    <div class="flex flex-col m-2">
      <div class="h-32 w-42 p-2 text-left">
        <h1 class="text-sm font-medium ml-2 text-clip overflow-hidden pb-2">{{ detail.title }}</h1>
        <h2 class="text-xs font-semilight ml-2">Modified: {{ detail.updatedAt | moment("D / MM / YYYY h:mm:ss a") }}</h2>
        <h2 class="text-xs font-semilight ml-2">Created: {{ detail.createdAt | moment("D / MM / YYYY h:mm:ss a") }}</h2>
        <h2 class="text-xs font-semilight ml-2">Creator: {{ detail.name }}</h2>
      </div>
    </div>
  </button>
</template>

<script>
export default {
  name: 'CardHub',
  props: ['detail'],
  methods: {
    clickSet() {
      this.$emit('clickSet');
    },
  },
};
</script>
