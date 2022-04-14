<template>
  <v-overlay :value="value">
    <v-progress-circular :size="50" indeterminate color="orange accent-3"></v-progress-circular>
  </v-overlay>
</template>

<script>
export default {
  name: 'Loading',
  data() {
    return {};
  },
  props: ['value'],
  methods: {},
};
</script>
