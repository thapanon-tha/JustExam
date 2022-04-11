<template>
  <v-footer padless absolute color="">
    <v-col class="text-center" cols="12">
      {{ new Date().getFullYear() }} — <strong>JustExam</strong>
    </v-col>
  </v-footer>
</template>

<script>
export default {
  name: 'Footer',
};
</script>
