<template>
  <v-data-table
    :headers="headers"
    :items="_listOfEmployee"
    :search="search"
    sort-by="name"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Employee</v-toolbar-title>
        <v-divider class="mx-4" inset vertical />
        <v-spacer />
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        />
        <v-spacer />
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              New Employee
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-text-field
                    v-model="editedItem.username"
                    label="User Name"
                    :rules="employeeNameRules"
                    :counter="100"
                    clearable
                    required
                  />
                </v-row>
                <v-row>
                  <v-text-field
                    v-model="editedItem.fullName"
                    label="Employee Name"
                    :rules="employeeFullNameRules"
                    :counter="100"
                    clearable
                    required
                  />
                </v-row>
                <v-row>
                  <v-text-field
                    v-model="editedItem.email"
                    label="Employee Email"
                    :rules="emailRules"
                    :counter="450"
                    required
                    clearable
                  />
                </v-row>
                <v-row>
                  <v-text-field
                    v-model="editedItem.phoneNumber"
                    label="Phone Number"
                    :rules="phoneNumberRules"
                    clearable
                    required
                  />
                </v-row>
                <v-row>
                  <v-text-field
                    v-model="editedItem.address"
                    label="Address"
                    :rules="addressRules"
                    :counter="450"
                    clearable
                  />
                </v-row>
                <v-row>
                  <v-select
                    v-model="select"
                    hint="Choose staff department"
                    :items="_listOfDepartment"
                    item-text="departmentName"
                    item-value="id"
                    label="Department"
                    persistent-hint
                    multiple
                    @change="changeDepartment"
                  ></v-select>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer />
              <v-btn color="blue darken-1" text @click="close">
                Cancel
              </v-btn>
              <v-btn color="blue darken-1" text @click="save">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon small @click="deleteItem(item)" v-if="!item.isDeleted">
        mdi-delete
      </v-icon>
      <v-icon small @click="reviveItem(item)" v-if="item.isDeleted">
        mdi-clipboard-plus
      </v-icon>
    </template>
  </v-data-table>
</template>
<script>
import { mapGetters, mapActions, mapState } from 'vuex'
export default {
  data () {
    var regex = /(09|01[2|6|8|9])+([0-9]{8})\b/g
    return {
      search: '',
      dialog: false,
      employeeNameRules: [
        v => !!v || 'Employee name is required',
        v =>
          (v && v.length < 100) ||
          'Employee name must be less than 100 characters'
      ],
      employeeFullNameRules: [
        v => !!v || 'Employee Full name is required',
        v =>
          (v && v.length < 100) ||
          'Employee name must be less than 100 characters'
      ],
      phoneNumberRules: [
        v => (v && v.match(regex)) || 'Phone Number must be format phone number'
      ],
      addressRules: [
        v => (v && v.length < 450) || 'Address must be less than 450 characters'
      ],
      emailRules: [
        v => !!v || 'Email is required',
        v => (v && v.length < 450) || 'Email must be less than 450 characters',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      headers: [
        {
          text: 'User Name',
          value: 'username',
          sortable: false,
          aligh: 'start'
        },
        { text: 'Employee Name', value: 'fullName' },
        { text: 'Email', value: 'email' },
        { text: 'Phonenumber', value: 'phoneNumber' },
        { text: 'Adrress', value: 'address' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      editedIndex: -1,
      editedItem: {
        id: '',
        username: '',
        fullName: '',
        email: '',
        phoneNumber: '',
        address: '',
        departments: []
      },
      defaultItem: {
        id: '',
        username: '',
        fullName: '',
        email: '',
        phoneNumber: '',
        address: '',
        departments: []
      },
      select: [],
      items: [
        { state: 'Florida', abbr: 'FL' },
        { state: 'Georgia', abbr: 'GA' },
        { state: 'Nebraska', abbr: 'NE' },
        { state: 'California', abbr: 'CA' },
        { state: 'New York', abbr: 'NY' }
      ]
    }
  },

  computed: {
    ...mapGetters('employeeList', ['_getListOfEmployee']),
    ...mapState('departmentList', ['_listOfDepartment']),
    ...mapState('employeeList', ['_listOfEmployee']),
    formTitle () {
      return this.editedIndex === -1 ? 'New Employee' : 'Edit Employee'
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    }
  },
  mounted () {
    this._getAllEmployee()
    this._getAllDepartment()
    console.log(this._listOfDepartment)
  },

  methods: {
    ...mapActions('employeeList', [
      '_getAllEmployee',
      '_addEmployee',
      '_updateEmployee',
      '_deleteEmployee'
    ]),
    ...mapActions('departmentList', ['_getAllDepartment']),

    changeDepartment (item) {
      this.editedItem.departments = item
    },
    editItem (item) {
      this.select = item.departments
      this.editedIndex = this._listOfEmployee.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    async deleteItem (item) {
      confirm('Are you sure you want to delete this employee?') &&
        (await this._deleteEmployee(item))
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    async reviveItem (item) {
      item.isDeleted = !item.isDeleted
      confirm('Are you sure you want to reivive this employee?') &&
        (await this._updateEmployee(item))
    },
    async save () {
      if (this.editedIndex > -1) {
        await this._updateEmployee(this.editedItem)
      } else {
        await this._addEmployee(this.editedItem)
      }
      await this._getAllEmployee()
      this.close()
    }
  }
}
</script>
