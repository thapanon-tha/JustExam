<template>
  <div>
    <div class="flex flex-col">
      <label class="text-xl font-semilight"> {{ detail.title }} </label>
      <div
        class="mt-1 box-border h-40 w-60 p-4 rounded-xl text-white bg-gradient-to-tl from-gray-800 via-gray-800 to-yellow-700"
      >
        <section class="border-r-4 rounded-md border-red-600">
          <div class="mb-10 gap-20">
            <h1 class="text-md font-semilight">{{ detail.title }}</h1>
            <div class="mt-15">
              <h2 class="text-md font-semilight">
                {{ detail.updatedAt | moment("Do / MMMM / YYYY") }}
              </h2>
              <h2 class="text-md font-semilight">
                {{ detail.updatedAt | moment("h:mm:ss a") }}
              </h2>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardExam",
  props: {
    detail: Object,
    to: {
      type: String,
      default: "YourExam",
    },
  },
  data() {
    return {};
  },
};
</script>
