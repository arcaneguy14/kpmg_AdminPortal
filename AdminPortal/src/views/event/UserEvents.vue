<template>
  <b-row>
    <b-col>
      <b-card>
        <b-row>
          <b-col>
            <h5 class="mb-3 text-uppercase text-grey">User Event Listing</h5>
          </b-col>
        </b-row>
        <b-row class="mb-3">
          <b-col md="2">
            <b-form-select v-model="selected" :options="options"></b-form-select>
          </b-col>
          <b-col sm="8">
            <b-form-group>
              <b-form-input type="text" placeholder="Search User Name" v-if="selected==1"></b-form-input>
              <b-form-input type="text" placeholder="Search Event Name" v-if="selected==2"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col sm="2" class="d-flex justify-content-end">
            <b-form-group>
              <b-button variant="primary"><i class="fa fa-search"></i> Search</b-button>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="2">
            <vue-csv-downloader
              :data="content"
              :fields="fieldsCSVHeader"
            >
              <span><i class="fa fa-download"></i> Export Table</span>
            </vue-csv-downloader>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
              <b-table striped hover
                       :items="content"
                       responsive
                       :fields="fields"
                       primary-key="id"
                       :filter="filter"
                       id="table-transition1"
                       class="mt-3"
              >
              </b-table>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="6" class="my-1">
            <b-button class="mr-2" variant="outline-primary"><i class="fa fa-arrow-left"></i> Previous</b-button>
            <b-button variant="outline-primary">Next <i class="fa fa-arrow-right"></i></b-button>
          </b-col>
        </b-row>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
  import VueCsvDownloader from 'vue-csv-downloader';

  let content = [
    {id: '1', user: 'Khal Drogo', eventName: 'Building Financial Freedom', eventDate: '10/4/2019' },
    {id: '2', user: 'Jon Snow', eventName: 'Property Financing for Beginners', eventDate: '11/4/2019'},
    {id: '3', user: 'White Walker', eventName: 'Housing 101', eventDate: '12/4/2019'},
    {id: '4', user: 'Jaime Lanister', eventName: 'Special Dialogue with LHDN', eventDate: '13/4/2019'},
    {id: '5', user: 'Aegon Targaryen', eventName: 'Tax and Business Summit 2019', eventDate: '14/4/2019'},
  ];

    export default {
      name: "UserEvents",

      components: {
        VueCsvDownloader
      },

      data(){
        return{
          content: content,
          fields: [
            { key: 'id', label: 'Id', sortable: true, sortDirection: 'desc'},
            { key: 'user', label: 'Participant Name', sortable: true, sortDirection: 'desc' },
            { key: 'eventName', label: 'Event Name', sortable: true, sortDirection: 'desc' },
            { key: 'eventDate', label: 'Event Date', sortable: true, sortDirection: 'desc' },
          ],
          fieldsCSVHeader: ['user','eventName','eventDate'],
          filter: null,
          selected: 1,
          options: [
            { value: 1, text: 'User' },
            { value: 2, text: 'Event' },
          ],
        }
      }
    }
</script>

<style scoped>

</style>
