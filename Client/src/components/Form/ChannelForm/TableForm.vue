<template>
    <div>
        <v-data-table
            simple
            :headers="headers"
            :items="scoreData"
            item-key="id"
            class="elevation-1"
        ></v-data-table>
    </div>
</template>

<script>
  export default {
    name: 'TableForm',
    data: () => ({
      scoreData: [
        {
          id: "61070507219",
          name: "Rungwilai Payakanuwat",
          score: 40,
          finish: "14.00",
        },
        {
          id: "61070507219",
          name: "Rungwilai Payakanuwat",
          score: 9.0,
          finish: 37,
        },
        {
          id: "61070507219",
          name: "Rungwilai Payakanuwat",
          score: 16.0,
          finish: 23,
        },
        {
          id: "61070507219",
          name: "Rungwilai Payakanuwat",
          score: 3.7,
          finish: 67,
        },
        {
          id: "61070507219",
          name: "Rungwilai Payakanuwat",
          score: 16.0,
          finish: 49,
        },
        {
          id: "61070507219",
          name: "Rungwilai Payakanuwat",
          score: 0.0,
          finish: 94,
        },
        {
          id: "61070507219",
          name: "Rungwilai Payakanuwat",
          score: 0.2,
          finish: 98,
        },
        {
          id: "61070507219",
          name: "Rungwilai Payakanuwat",
          score: 3.2,
          finish: 87,
        },
        {
          id: "61070507219",
          name: "Rungwilai Payakanuwat",
          score: 25.0,
          finish: 51,
        },
        {
          id: "61070507219",
          name: "Rungwilai Payakanuwat",
          score: 26.0,
          finish: 65,
        },
      ],
      headers: [
        {
          text: 'Student ID',
          align: 'start',
          sortable: false,
          value: 'id',
        },
        { text: 'Name', value: 'name' },
        { text: 'Score', value: 'score' },
        { text: 'Finish Time', value: 'finish' },
      ],
    }),
  };
</script>