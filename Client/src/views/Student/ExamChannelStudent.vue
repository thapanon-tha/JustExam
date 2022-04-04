<template>
  <div class="mb-96">
    <Header main="Exam channel">
      <button
        class="
          mt-3
          bg-white
          border-orange-200 border border-solid
          rounded-lg
          px-8
          py-3
          font-semilight
          text-mainColor
        "
        @click="dialog = true"
      >
        Join channel
      </button>
    </Header>
    <div class="flex justify-end mr-15 mt-5">
      <select
        class="
          border
          rounded-md
          border-solid border-mainColor border-opacity-40
          bg-white
          p-2
          text-mainColor
          font-semilight
          text-sm text-center
        "
      >
        <option
          v-for="(item, index) in sortlist"
          :key="index"
          :value="item.value"
        >
          {{ item.name }}
        </option>
      </select>
    </div>
    <div class="grid grid-cols-4 gap-5 ml-40 mr-40 mt-10">
      <div v-for="box in channels" :key="box.id">
        <div class="w-60">
          <CardStudentChannel
            @onClick="onClick('InsideChannelStudent', box.cid)"
            @clickDelete="onClickDeleteChannel()"
          />
        </div>
      </div>
    </div>
    <v-row justify="center">
      <v-dialog
        v-model="dialog"
        persistent
        max-width="420"
      >
        <v-card>
          <v-card-title class="text-h6">
            Enter your student ID and invite code
          </v-card-title>
          <div class="flex flex-row ml-10 mt-5">
            <label class="text-sm">Student ID</label>
            <input
              type="text"
              v-model="studentID"
              class="ml-5 px-3 py-2 text-sm font-semilight text-gray-700 bg-subColor
                bg-clip-padding border border-solid border-mainColor
                border-opacity-40 rounded-md transition ease-in-out m-0
                focus:text-black focus:bg-subColor focus:mainColor
                focus:border-opacity-100 focus:outline-none"
              placeholder="Student ID"
            >
          </div>
          <div class="flex flex-row ml-10 mt-5 mb-5">
            <label class="text-sm">Invite code</label>
            <input
              type="text"
              v-model="inviteCode"
              class="ml-4 px-3 py-2 text-sm font-semilight text-gray-700 bg-subColor
                bg-clip-padding border border-solid border-mainColor
                border-opacity-40 rounded-md transition ease-in-out m-0
                focus:text-black focus:bg-subColor focus:mainColor
                focus:border-opacity-100 focus:outline-none"
              placeholder="Invite code"
            >
          </div>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="orange darken-1"
              text
              @click="dialog = false"
            >
              Cancel
            </v-btn>
            <v-btn
              color="orange darken-1"
              text
              @click="dialog = false"
            >
              Join
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  </v-row>
  </div>
</template>

<script>
import Header from '@/components/Header/Header.vue';
import CardStudentChannel from '@/components/Card/CardStudentChannel.vue';
// import api from '@/services/apis';

export default {
  name: 'ExamChannelTeacher',
  components: {
    Header,
    CardStudentChannel,
  },
  data() {
    return {
      inviteCode: '',
      studentID: '',
      dialog: false,
      channels: 6,
      sortlist: [
        {
          name: 'Sort by uncoming',
          value: 'comin',
        },
        {
          name: 'Sort by alphabet',
          value: 'alpha',
        },
      ],
    };
  },
  methods: {
    onClick(pageName, cid) {
      this.$router.push({ name: pageName, params: { cid } }).catch(() => {});
    },
    onClickLeaveChannel() {
      //
    },

  },
  mounted() {
    //
  },
};
</script>
