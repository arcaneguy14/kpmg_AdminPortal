<template>
  <b-row>
    <b-col cols="12">
      <transition name="slide">
        <b-card>
          <b-row>
            <b-col md="6" class="my-1">
              <b-form-group class="mb-0">
                <b-input-group>
                  <b-form-input v-model="filter" placeholder="Type to Search" />
                  <b-input-group-append>
                    <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
                  </b-input-group-append>
                </b-input-group>
              </b-form-group>
            </b-col>
            <b-col md="6" class="my-1 d-flex justify-content-end">
              <b-button variant="primary" @click="add($event.target)"><i class="fa fa-user"></i> Add User</b-button>
            </b-col>
          </b-row>

          <!-- Main table element -->
          <div class="spinner-container" v-if="loading">
            <HollowDotsSpinner
              :animation-duration="1000"
              :size="60"
              :color="'#00519A'"
              class="spinner"
            />
          </div>
          <b-table
            show-empty
            stacked="md"
            :items="items"
            :fields="fields"
            :current-page="currentPage"
            :per-page="perPage"
            :filter="filter"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            :sort-direction="sortDirection"
            @filtered="onFiltered"
            class="mt-3"
          >

            <template slot="social" slot-scope="row">
              <span class="table-fa">
                <i class="fa fa-facebook-square"></i>
                <i class="fa fa-google"></i>
                <i class="fa fa-instagram"></i>
                <i class="fa fa-linkedin-square"></i>
              </span>
            </template>

            <template slot="actions" slot-scope="row">
              <b-button size="sm" variant="success" @click="info(row.item, row.index, $event.target)" class="mr-1">
               <i class="fa fa-edit"></i> Edit User
              </b-button>
              <b-button size="sm" variant="danger" @click="delAlert" class="mr-1">
                <i class="fa fa-trash"></i> Remove User
              </b-button>
            </template>

            <template slot="row-details" slot-scope="row">
              <b-card>
                <ul>
                  <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
                </ul>
              </b-card>
            </template>
          </b-table>

          <b-row>
            <b-col md="6" class="my-1">
              <b-button class="mr-2" variant="outline-primary" :disabled="clickable" v-on:click="prevButton"><i class="fa fa-arrow-left"></i> Previous</b-button>
              <b-button variant="outline-primary" v-on:click="nextButton">Next <i class="fa fa-arrow-right"></i></b-button>
            </b-col>
          </b-row>
        </b-card>
      </transition>
    </b-col>
    <!--
    <b-col cols="12">
      <b-card>
        <vue-editor ></vue-editor>
      </b-card>
    </b-col>
    -->
    <!-- Info modal -->
    <b-modal id="modalInfo" size="lg" @hide="resetModal" title="Edit User" hide-footer>
      <!-- <pre>{{ modalInfo.content }}</pre> -->
      <edit-user :modalInfo="modalInfo"></edit-user>
    </b-modal>

    <b-modal id="addUser" size="lg" @hide="resetModal" title="Add User" hide-footer>
      <!-- <pre>{{ modalInfo.content }}</pre> -->
      <add-user></add-user>
    </b-modal>
  </b-row>
</template>

<script>
import { VueEditor } from 'vue2-quill-editor';
import AddUser from './AddUser'
import  EditUser from './EditUser'
import {HollowDotsSpinner  } from 'epic-spinners'
import BCol from "bootstrap-vue/src/components/layout/col";

let items = []

export default {
  components: {
    BCol,
      VueEditor,
      'add-user': AddUser,
      'edit-user': EditUser,
      HollowDotsSpinner
   },

  data() {
    return {
      items: [],
      fields: [
        { key: 'id', label: 'id', sortable: true, sortDirection: 'desc' },
        { key: 'name', label: 'name', sortable: true, sortDirection: 'desc' },
        { key: 'email', label: 'email', sortable: true, sortDirection: 'desc' },
        { key: 'created_at', label: 'Created At' },
        { key: 'social', label: 'Social Media' },
        { key: 'actions', label: 'Actions' }

      ],
      currentPage: 1,
      perPage: 10,
      totalRows: items.length,
      lastPageUrl: '',
      prevPageUrl: [],
      nextPageUrl: [],
      pageOptions: [5, 10, 15],
      sortBy: null,
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      modalInfo: { title: '', content: '', name: '' },
      loading: false,
      flag: 0
    }
  },

  created() {
    this.getUsersList()
  },

  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => {
          return { text: f.label, value: f.key }
        })
    },

    users() {
      return this.$store.getters.getUsers.data;
    },

    clickable() {
      if (this.nextPageUrl.length<=1)
      return true;
    }
  },

  methods: {
    info(item, index, button) {
      this.modalInfo.title = `Row index: ${index}`
      this.modalInfo.content = JSON.stringify(item, null, 2)
      this.$root.$emit('bv::show::modal', 'modalInfo', button)
    },
    add(button) {
      this.$root.$emit('bv::show::modal', 'addUser', button)
    },
    resetModal() {
      this.modalInfo.title = ''
      this.modalInfo.content = ''
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },

    getUsersList(params) {
      this.loading = true
      console.log(params)
      this.$store
        .dispatch("getUser", {
          nextPage: params,
        })
        .then(response => {
          this.loading = false
          this.items = response.data
          if (this.flag == 0)
            this.nextPageUrl.push(response.nextPage)

          //console.log(response.data)
        })
    },

    prevButton() {
      this.flag=1;
      this.nextPageUrl.pop();
      this.prevPageUrl.push(this.nextPageUrl[this.nextPageUrl.length - 2]);
      this.getUsersList(this.prevPageUrl[this.prevPageUrl.length - 1]);
    },

    nextButton() {
      this.flag=0;
      this.getUsersList(this.nextPageUrl[this.nextPageUrl.length - 1])
    },

    configPagination(data) {
      this.pagination.lastPage = data.last_page;
      this.pagination.currentPage = data.current_page;
      this.pagination.total = data.total;
      this.pagination.lastPageUrl = data.last_page_url;
      this.pagination.nextPageUrl = data.next_page_url;
      this.pagination.prevPageUrl = data.prev_page_url;
      this.pagination.from = data.from;
      this.pagination.to = data.to;
    },

    delAlert(){
      this.$swal({
        title: 'User Removal',
        text: "Are you sure you want to remove this user?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, please!'
      }).then((result) => {
        if (result){
          this.$swal({
            type : 'success',
            title : 'User Removed!'
          })
        }
      })
    }
  },
}
</script>

