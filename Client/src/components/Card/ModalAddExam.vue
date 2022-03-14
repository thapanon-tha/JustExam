<template>
    <v-row justify="center">
        <v-dialog>
            <div class="w-3/6 h-2/6 border-2 border-orange-200 rounded-xl bg-subColor">
                <div class="mt-5 ml-5 mr-5 mb-10">
                    <h1 class="font-semilight text-2xl mb-5">Choose your exam</h1>
                    <div class="overflow-x-scroll">
                        <div class="flex justify-start gap-5 mb-1">
                            <div 
                                class="w-48 h-60 flex-none bg-selexColor  rounded-t-lg relative shadow-sm" 
                                v-for="card in cardlist" :key="card.id"
                            >
                                <div class="ml-3 mt-3 mr-3">
                                    <p class="text-white font-semibold text-md truncate">{{ examTitle }}</p>
                                    <p class="text-white font-base text-xs">Created Date: {{ createdDate }}</p>
                                    <p class="text-white font-base text-xs">Modified Date: {{ modifiedDate }}</p>
                                    <p class="text-white font-base text-xs">{{ numQuestion }} questions</p>
                                </div>
                                <div class="text-center">
                                    <button 
                                        class="bg-white text-mainColor text-xs px-4 py-2 absolute bottom-0 inset-x-0 rounded-t-lg shadow-md"
                                    >
                                        <v-icon small color="orange darken-3" dark>touch_app</v-icon>
                                            Select
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </v-dialog>
    </v-row>
</template>

<script>
export default {
    name: 'ModalAddExam',
};
</script>