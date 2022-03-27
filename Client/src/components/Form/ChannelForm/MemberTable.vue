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
        <v-toolbar-title>Member Information</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <v-card>
            <v-card-title>
              <span class="text-h5">Select Role</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.sid"
                      disabled
                      label="Student ID"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.name"
                      disabled
                      label="Student name"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <!-- <v-text-field
                      v-model="editedItem.role"
                      label="Role"
                    ></v-text-field> -->
                    <v-select
                      :items="['Student', 'TA']"
                      label="Select role"
                      v-model="editedItem.role"
                    >
                      <template v-slot:item="{ item, attrs, on }">
                        <v-list-item
                          v-bind="attrs"
                          v-on="on"
                        >
                          <v-list-item-title
                            :id="attrs['aria-labelledby']"
                            v-text="item"
                          ></v-list-item-title>
                        </v-list-item>
                      </template>
                    </v-select>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure to remove this member?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
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
    name: 'MemberTable',
    data: () => ({
      dialog: false,
      dialogDelete: false,
      headers: [
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
          text: 'Role', 
          align: 'center',
          sortable: false,
          value: 'role'
           
        },
        { 
          text: '', 
          align: 'center',
          sortable: false,
          value: 'actions'
           
        },
      ],
      memberlist: [],
      editedIndex: -1,
      editedItem: {
        sid: '',
        role: 'Student',
      },
      defaultItem: {
        sid: '',
        role: 'Student',
      },
    }),

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.memberlist = [
          {
            sid: '61070507219',
            name: 'Rungwilai  Payak',
            role: 'Student'
          },
          {
            sid: '61070507219',
            name: 'Rungwilai  Payak',
            role: 'Student'
          },
          {
            sid: '61070507219',
            name: 'Rungwilai  Payak',
            role: 'Student'
          },
          {
            sid: '61070507219',
            name: 'Rungwilai  Payak',
            role: 'Student'
          },
          {
            sid: '61070507219',
            name: 'Rungwilai  Payak',
            role: 'Student'
          },
          {
            sid: '61070507219',
            name: 'Rungwilai  Payak',
            role: 'Student'
          },
          {
            sid: '61070507219',
            name: 'Rungwilai  Payak',
            role: 'Student'
          },
          {
            sid: '61070507219',
            name: 'Rungwilai  Payak',
            role: 'Student'
          },
        ]
      },

      editItem (item) {
        this.editedIndex = this.memberlist.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.memberlist.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.memberlist.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.memberlist[this.editedIndex], this.editedItem)
        } else {
          this.memberlist.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>