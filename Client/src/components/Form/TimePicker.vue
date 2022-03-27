<template>
    <div>
        <div class="flex flex-col">
            <label class="form-label inline-block mb-2 text-grayColor font-semilight text-xl">
            {{ labelText }}  
            </label>
            <div class="flex flex-row gap-5">
                <vue-timepicker 
                    format="hh:mm A" placeholder="Start Time" 
                    input-width="200px" input-class="rounded-md px-10 py-6 text-center text-semilight 
                    text-grayColor bg-subColor focus:outline-none"  
                ></vue-timepicker>
                <vue-timepicker 
                    format="hh:mm A" placeholder="End Time" 
                    input-width="200px" input-class="rounded-md px-10 py-6 text-center text-semilight 
                    text-grayColor bg-subColor focus:outline-none"  
                ></vue-timepicker>
            </div>
        </div>
        
    </div>
</template>

<script>
import VueTimepicker from 'vue2-timepicker';

export default {
    name: 'TimePicker',
    components: {
        VueTimepicker,
    },
    props: {
    labelText: {
      type: String,
      default: 'label',
    },
    // StartTime: {
    //   type: String,
    //   default: 'text',
    // },
  },
    data() {
        return {
            //
        };
    },
    methods: {
    
    },
};
</script>
