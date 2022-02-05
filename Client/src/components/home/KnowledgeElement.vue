<template>
    <ul class="text-left">
        <h3 class="text-5xl font-medium text-gray-900 pt-20 pb-5">{{ topicName }}</h3>
        <div class="font-medium">
            <p>{{ description }}</p>
        </div>
        <p v-if="detailsAreVisible">{{ text }}</p>
        <button @click="toggleDetails()">
            <div class="bg-subColor border-orange-200 border
                        rounded-lg px-8 py-3 font-medium text-mainColor">
                Read {{ detailsAreVisible ? 'less' : 'more' }}
            </div>
        </button>
    </ul>
</template>

<script>
export default {
  data() {
    return {
      detailsAreVisible: false,
    };
  },
  methods: {
    toggleDetails() {
      this.detailsAreVisible = !this.detailsAreVisible;
    },
  },
  props: ['id', 'topicName', 'description', 'text'],
  // emits: ['reveal-text'],

};
</script>
