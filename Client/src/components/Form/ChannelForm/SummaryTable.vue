<template>
  <v-data-table
    :headers="headers"
    :items="memberlist"
    sort-by="name"
    class="elevation-0"
    
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Exam Summary</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        big
        class="mr-2"
        @click="clickRespone(item)"
      >
        edit_note
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
  export default {
    name: 'SummaryTable',
    data: () => ({
      dialog: false,
      headers: [
        { 
          text: 'Score Feedback', 
          align: 'center',
          sortable: false,
          value: 'actions'
           
        },
        {
          text: 'Student ID',
          align: 'center',
          sortable: false,
          value: 'sid',
        },
        { 
          text: 'Name', 
          align: 'center',
          value: 'name' 
        },
        { 
          text: 'Score', 
          align: 'center',
          value: 'score'
           
        },
        { 
          text: 'Finish Time', 
          align: 'center',
          value: 'finish'
           
        },
      ],
      memberlist: [],
      defaultItem: {
        sid: '',
        score: '',
        
      },
    }),

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.memberlist = [
          {
            sid: '61070507219',
            name: 'Rungwilai  Payak',
            score: 'Not Attended',
            finish: '15.00'
          },
          {
            sid: '61070507219',
            name: 'Rungwilai  Payak',
            score: 'Not Attended',
            finish: '15.00'
          },
          {
            sid: '61070507219',
            name: 'Rungwilai  Payak',
            score: 'Not Attended',
            finish: '15.00'
          },
          {
            sid: '61070507219',
            name: 'Rungwilai  Payak',
            score: 'Pending',
            finish: '15.00'
          },
          {
            sid: '61070507219',
            name: 'Rungwilai  Payak',
            score: 'Pending',
            finish: '15.00'
          },
          {
            sid: '61070507219',
            name: 'Rungwilai  Payak',
            score: 'Wait for feedback',
            finish: '15.00'
          },
          {
            sid: '61070507219',
            name: 'Rungwilai  Payak',
            score: 0,
            finish: '15.00'
          },
          {
            sid: '61070507219',
            name: 'Rungwilai  Payak',
            score: 0,
            finish: '15.00'
          },
        ]
      },
      clickRespone() {
        this.$emit('clickRespone');
      },
    },
  }
</script>