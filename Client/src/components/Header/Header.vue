<template>
    <div>
        <header class="border-b-2 border-outlineColor border-opacity-40">
            <div class="flex justify-between">
                <div class="ml-13 mt-10 mb-2 text-left">
                    <h1 class="text-5xl text-grayColor">{{ main }}</h1>
                    <div class="flex justify-start gap-2">
                        <h2 class="text-sm ml-2 text-grayColor text-opacity-50">{{ main }}</h2>
                        <h3 class="text-mainColor text-sm">{{ current }}</h3>
                    </div>

                </div>
                <div class="mr-13 mt-10 text-right">
                    <button @click="onClick(to)" class="mt-3 bg-white border-orange-200 border border-solid rounded-lg px-8 py-3 font-semilight text-mainColor">
                        <div>
                            {{ button }}
                        </div>
                    </button>
                    <!-- <ActionButton
                    class="mt-3 bg-white border-orange-200
                    border border-solid rounded-lg px-4 py-3
                    font-semilight text-mainColor"
                    name="Preview exam"
                    :on-cick="previewExam"
                    /> -->
                </div>
            </div>
        </header>

    </div>
</template>

<script>
import ActionButton from '@/components/Button/ActionButton';

export default {
  name: 'Header',
  components: {
    ActionButton,
  },
  props: {
    button: {
      type: String,
      default: 'Button',
    },
    to: {
      type: String,
      default: 'Home',
    },
    main: {
      type: String,
      default: '',
    },
    current: {
      type: String,
      default: '',
    },
  },
  methods: {
    onClick(pageName) {
      this.$router.push({ name: pageName }).catch(() => {});
    },
  },
};
</script>
