<template>
  <div>
    <v-stepper v-model="e6" vertical class="flex justify-center" color="orange accent-4">
      <div class="ml-40 mr-40">
        <v-stepper-step :complete="e6 > 1" step="1">
        Exam Title
        <!-- <small>ชื่อข้อสอบ</small> -->
      </v-stepper-step>

      <v-stepper-content step="1">
        <div class="mb-5"> 
          <input type="text" 
          class="border border-solid border-outlineColor border-opacity-40 bg-subColor
                px-3 py-2 text-base font-light
              text-gray-700 bg-clip-padding
                rounded-md transition ease-in-out
                m-0 focus:text-black focus:bg-subColor focus:mainColor
                focus:border-opacity-100 focus:outline-none
                w-440
          "
          />
        </div>
        <button
          class="bg-white border-orange-200
                  border border-solid rounded-lg px-3 py-2
                  font-semilight text-mainColor"
          @click="e6 = 2"
        >
          Continue
        </button>
        <button
          class="bg-white border-orange-200
                  border border-solid rounded-lg px-3 py-2
                  font-semilight text-mainColor"
          @click="e6 = 2"
        >
          Cancel
        </button>
      </v-stepper-content>

      <v-stepper-step
        :complete="e6 > 2"
        step="2"
      >
        Exam description
      </v-stepper-step>

      <v-stepper-content step="2">
        <div class="mb-5"> 
          <input type="text" class="border border-solid border-outlineColor border-opacity-40 bg-subColor
          form-control flex w-11/12
                    px-3 py-3 text-base font-light
                    text-gray-700 bg-clip-padding
            
                    rounded-md transition ease-in-out
                    m-0focus:text-black focus:bg-subColor focus:mainColor
                    focus:border-opacity-100 focus:outline-none
          "
          />
        </div>
        
        <!-- <v-card
          color="grey lighten-1"
          class="mb-12 border rounded-lg shadow-none border-subColor"
          height="70"
          width="440"
        ></v-card> -->
        <v-btn
          color="primary"
          @click="e6 = 3"
        >
          Continue
        </v-btn>
        <v-btn text>
          Cancel
        </v-btn>
      </v-stepper-content>

      <v-stepper-step :complete="e6 > 3" step="3" >
        Select category
      </v-stepper-step>

      <v-stepper-content step="3">
        <div class="mb-5"> 
          <input type="text" class="border border-solid border-outlineColor border-opacity-40 bg-subColor
          form-control flex w-11/12
                    px-3 py-3 text-base font-light
                    text-gray-700 bg-clip-padding
            
                    rounded-md transition ease-in-out
                    m-0focus:text-black focus:bg-subColor focus:mainColor
                    focus:border-opacity-100 focus:outline-none
          "
          />
        </div>
        <v-btn
          color="primary"
          @click="e6 = 4"
        >
          Continue
        </v-btn>
        <v-btn text>
          Cancel
        </v-btn>
      </v-stepper-content>

      <v-stepper-step step="4">
        Publish option
      </v-stepper-step>
      <v-stepper-content step="4">
        <div class="mb-5"> 
          <input type="text" class="border border-solid border-outlineColor border-opacity-40 bg-subColor
          form-control flex w-11/12
                    px-3 py-3 text-base font-light
                    text-gray-700 bg-clip-padding
            
                    rounded-md transition ease-in-out
                    m-0focus:text-black focus:bg-subColor focus:mainColor
                    focus:border-opacity-100 focus:outline-none
          "
          />
        </div>
        <v-btn
          color="primary"
          @click="e6 = 1"
        >
          Continue
        </v-btn>
        <v-btn text>
          Cancel
        </v-btn>
      </v-stepper-content>
      </div>
      
    </v-stepper>
  </div>
</template>

<script>
  export default {
    name: 'NewExamStepper',
    data () {
      return {
        e6: 1,
      }
    },
  };
</script>

<style scoped>

</style>