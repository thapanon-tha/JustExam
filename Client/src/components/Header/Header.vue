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
                  <slot></slot>
                </div>
            </div>
        </header>

    </div>
</template>

<script>

export default {
  name: 'Header',
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
