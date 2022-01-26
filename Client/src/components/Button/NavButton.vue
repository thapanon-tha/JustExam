<template>
    <button @click="onClick(to)" >
        <div class=" bg-transparent font-medium
                     mt-2 mb-4 px-10 py-3 text-l
                     hover:text-white hover:bg-mainColor rounded border-orange-200"
             :class="{ [`border-l-2`]: borderLeft,
                       [`border-r-2`]: borderRight,
                       [`text-mainColor`]: to==$route.name }" >
            {{ name }}
        </div>
    </button>
</template>

<script>

export default {
  name: 'NavButton',
  props: {
    name: {
      type: String,
      default: 'Button',
    },
    to: {
      type: String,
      default: 'Home',
    },
    borderLeft: {
      type: Boolean,
      default: false,
    },
    borderRight: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onClick(pageName) {
      this.$router.push({ name: pageName }).catch(() => {});
    },
  },
};
</script>
