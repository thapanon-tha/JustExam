<template>
    <div>
      <select 
      id="type" name="type" v-model="type" 
      class="border rounded-md border-solid border-mainColor border-opacity-40
           bg-white
           px-8 py-3
           text-mainColor font-semilight">
        <option value="multi">Multiple Choice</option>
        <option value="short">Short Answer</option>
        <option value="para">Paragraph</option>
        <option value="tf">True/False</option>
        <option value="match">Matching</option>
        <option value="code">Coding</option>

      </select>
    </div>
</template>

<script>

export default {
    name: 'SelectQuestion',
    data() {
        return {
            type: 'multi',
        };
    },
    methods: {
        //
    },
};
</script>