<template>
  <div class="flex justify-center">
    <div v-if=!imageLeft class="mr-60 my-10">
      <div class="flex flex-row pt-20">
        <h3 class="text-5xl font-medium text-mainColor">
          {{ title[0] }}
        </h3>
        <h3 class="text-5xl font-medium text-gray-900">
          {{ title.slice(1) }}
        </h3>
      </div>
      <div class="w-96 font-light whitespace-normal">
        <div class="flex flex-row">
          <p class="pt-10 text-2xl font-sans font-medium text-gray-900">
            {{ subtitle }}
          </p>
        </div>
        <div >
          <p class="font-sans text-lg" v-if=visible >{{ fullText }}</p>
        </div>
      </div>
      <button @click="onClick">
        <div class="bg-subColor border-orange-200 border
                      rounded-lg px-8 py-3 font-medium text-mainColor"
        >
          Read {{ visible ? 'less' : 'more' }}
        </div>
      </button>
    </div>
    <div class="my-10">
      <img
        class="border border-mainColor rounded-md w-65 h-96"
        :src=image
        :alt=title
      >
    </div>
    <div v-if=imageLeft class="ml-60 my-10">
      <div class="flex flex-row pt-20">
        <h3 class="text-5xl font-medium text-mainColor">
          {{ title[0] }}
        </h3>
        <h3 class="text-5xl font-medium text-gray-900">
          {{ title.slice(1) }}
        </h3>
      </div>
      <div class="w-96 font-light whitespace-normal">
        <div class="flex flex-row">
          <p class="pt-10 text-2xl font-sans font-medium text-gray-900">
            {{ subtitle }}
          </p>
        </div>
        <div >
          <p class="font-sans text-lg" v-if=visible>{{ fullText }}</p>
        </div>
      </div>
      <button @click="onClick">
        <div class="bg-subColor border-orange-200 border
                      rounded-lg px-8 py-3 font-medium text-mainColor">
          Read {{ visible ? 'less' : 'more' }}
        </div>
      </button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'CardWithPicture',
  props: {
    title: {
      type: String,
      default: 'Temp',
    },
    imageLeft: {
      type: Boolean,
      default: false,
    },
    subtitle: {
      type: String,
      default: 'Temp',
    },
    fullText: {
      type: String,
      default: 'Temp',
    },
    to: {
      type: String,
      default: 'Temp',
    },
    image: {
      type: String,
      default: 'https://images.pexels.com/photos/4050320/pexels-photo-4050320.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    },
  },
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    onClick() {
      this.visible = !this.visible;
    },
  },
};
</script>
