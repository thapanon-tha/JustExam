<template>
    <button @click="onClick()" >
        <div class=" bg-transparent font-medium
                     mt-2 mb-2 px-10 py-3 text-l
                     hover:text-white hover:bg-mainColor rounded border-orange-200"
             :class="{ [`border-l-2`]: borderLeft,
                       [`border-r-2`]: borderRight }">
            {{ name }}
        </div>
    </button>
</template>

<script>

export default {
  name: 'NavButtonAction',
  props: {
    name: {
      type: String,
      default: 'Button',
    },
    onClick: {
      type: Function,
      default: () => true,
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
};
</script>
