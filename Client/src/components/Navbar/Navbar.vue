<template>
  <div class="bg-subColor shadow-md flex flex-row justify-between h-16">
    <div class="flex flex-row">
      <img class="p-3 mr-8" src="@/assets/logo.svg" @click="Home" alt="logo" />
      <NavButton name="Home" to="Home" :borderRight="true" />
      <NavButton
        name="Contact us"
        to="ContactUs"
        v-if="!$store.getters.getIsAuth"
      />
      <NavButton
        name="Exam channel"
        to="ExamChannelTeacher"
        v-if="$store.getters.getIsAuth && $store.getters.getIsTeacher"
      />
      <NavButton
        name="Your exam"
        to="YourExam"
        :borderLeft="true"
        :borderRight="false"
        v-if="$store.getters.getIsAuth && $store.getters.getIsTeacher"
      />
      <NavButton
        name="Exam channel"
        to="ExamChannelStudent"
        v-if="$store.getters.getIsAuth && $store.getters.getIsStudent"
      />
      <!-- {{ $store.getters.getIsStudent }} -->
      <NavButton
        name="Exam hub"
        to="ExamHubTeacher"
        :borderLeft="true"
        :borderRight="false"
        v-if="
          $store.getters.getIsAuth &&
          ($store.getters.getIsTeacher || $store.getters.getIsStudent)
        "
      />
    </div>
    <div class="flex flex-row-reverse">
      <NavButton name="Sign up" to="SignUp" v-if="!$store.getters.getIsAuth" />
      <NavButton
        name="Login"
        :borderRight="true"
        to="Login"
        v-if="!$store.getters.getIsAuth"
      />
      <NavButtonAction
        name="Logout"
        :borderLeft="true"
        :onClick="onClick"
        v-if="$store.getters.getIsAuth"
      />
      <button @click="dialog = true" class="my-5 mr-10 text-mainColor">
        <h3>{{ $store.getters.getName }}</h3>
      </button>
    </div>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Edit Your Password</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="12">
                <v-text-field
                  v-model="password"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required, rules.min]"
                  :type="show1 ? 'text' : 'password'"
                  color="#EF7F4C"
                  name="input-10-1"
                  label="New password"
                  hint="At least 8 characters"
                  counter
                  @click:append="show1 = !show1"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="12">
                <v-text-field
                  v-model="cPassword"
                  :rules="[rules.required, rules.min]"
                  :type="show1 ? 'text' : 'password'"
                  label="Confirm new password"
                  color="#EF7F4C"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="dialog = false"> Close </v-btn>
          <v-btn
            v-if="
              password.length >= 8 &&
              cPassword.length >= 8 &&
              password === cPassword
            "
            color="#EF7F4C"
            text
            @click="updatePassword"
          >
            Save
          </v-btn>
          <v-btn
            v-else
            disabled
            color="#EF7F4C"
            text
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar
      v-model="snackbar"
      centered
      top
      text
      outlined
      :multi-line="true"
      :timeout="1000"
      :color="snackbarColor"
    >
      {{ snackbarMessage }}
    </v-snackbar>
  </div>
</template>

<script>
import NavButton from '@/components/Button/NavButton.vue';
import NavButtonAction from '@/components/Button/NavButtonAction.vue';
import api from '@/services/apis';

export default {
  name: 'Navbar',
  components: {
    NavButton,
    NavButtonAction,
  },
  data() {
    return {
      snackbar: false,
      snackbarColor: '',
      snackbarMessage: '',
      show1: false,
      password: '',
      cPassword: '',
      rules: {
        required: (value) => !!value || 'Required.',
        min: (v) => v.length >= 8 || 'Min 8 characters',
      },
      dialog: false,
    };
  },
  methods: {
    snacbarF(message, color) {
      this.snackbar = true;
      this.snackbarColor = color;
      this.snackbarMessage = message;
    },
    Home() {
      this.$router.push({ name: 'Home' }).catch(() => {});
    },
    onClick() {
      this.$store.dispatch({ type: 'doLogout' });
      this.$router.push({ name: 'Home' }).catch(() => {});
    },
    updatePassword() {
      api.updatePassword({ password: this.password }).then((e) => {
        if (e.status === 200) {
          this.snacbarF(`update success`, 'green');
          this.dialog = false;
        } else {
          this.snacbarF(`update fail`, 'red');
          this.dialog = false;
        }
      });
    },
  },
};
</script>
