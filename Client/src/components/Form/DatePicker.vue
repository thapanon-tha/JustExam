<template>
  <div >
    <div>
      <label class="form-label inline-block mb-2 text-gray-700 font-semilight text-xl">
              Schedule
      </label>
      <label class="form-label inline-block mb-2 ml-2 text-gray-700 text-opacity-50 font-semilight text-sm">
        (MM/DD/YYYY)  
      </label>
    </div>
    <div class="flex w-5/6">
      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="auto"
                
      >
        <template v-slot:activator="{ on, attrs }">
          <div class="px-10 w-full border border-solid border-mainColor border-opacity-40 text-base font-semilight
                    text-grayColor bg-subColor rounded-md pt-3 pb-3"
            readonly
            v-bind="attrs"
            v-on="on"
                         
          >
            {{ computedDateFormatted }}
          </div>
        </template>
          <v-date-picker
            v-model="date"
            no-title
            @input="menu = false"
            color="orange darken-2"
          ></v-date-picker>
      </v-menu>
    </div>
  </div>
</template>

<script>
  export default { ////"MM/DD/YYYY"
    data: vm => ({
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      // dateFormatted: vm.formatDate((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)),
      menu: false,
    }),

    computed: {
      computedDateFormatted () {
        return this.formatDate(this.date)
      },
    },

    // watch: {
    //   date (val) {
    //     this.dateFormatted = this.formatDate(this.date)
    //   },
    // },

    methods: {
      formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${month}/${day}/${year}`
      },
      
    },
    props: ['computedDateFormatted'],
  }
</script>