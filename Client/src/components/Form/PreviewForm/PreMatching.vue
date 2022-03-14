<template>
    <div class="ml-10 mt-10 mr-10 mb-20">
        <div class="break-words p-3 mb-3">
            Matching Main Question
        </div>
        <div v-for="(match, index) in matchlist" :key="match.index" class="ml-5">
            <p class="px-5 py-3 mt-2 mr-10 w-7/8 break-words">
                {{ `${index + 1})` }} Matching Question
            </p>
            <select class="ml-10 border-2 border-solid border-mainColor border-opacity-70 rounded-md bg-white px-5 py-2 focus:outline-none">
                <option>
                    Select Answer
                </option>
            </select>
        </div>
    </div>
</template>

<script>

export default  {
    name: 'PreMatching',
    components: {
    },
    data()  {
        return  {
            matchlist: 2,
        };
        //class="w-100 text-ellipsis overflow-hidden whitespace-pre appearance-none border rounded-md border-solid border-mainColor border-opacity-40 bg-white px-5 py-2 text-black font-semilight"

    },
};

</script>

<style scoped>
select {
  width: 600px;
  max-width: 100%;
 
}

option {
  -moz-white-space: pre-wrap;
  -o-white-space: pre-wrap;
  white-space: pre-wrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-bottom: 1px solid #DDD;
}
</style>