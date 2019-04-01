<template>
    <b-row>
      <b-col>
        <b-card>
              <b-row>
                <b-col>
                  <h5 class="mb-3 text-uppercase text-grey">Navigation</h5>
                </b-col>
              </b-row>
              <b-row>
                <b-col>
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
                      <b-button variant="primary" @click="add($event.target, 'addLocation')">
                        <i class="fa fa-map-marker"></i> Add Location
                      </b-button>
                    </b-col>
                  </b-row>
                  <b-table striped hover
                           :items="navi"
                           responsive
                           :fields="fields"
                           primary-key="id"
                           :filter="filter"
                           id="table-transition-example"
                           class="mt-3"
                           :tbody-transition-props="transProps"
                  >
                    <template slot="actions" slot-scope="row">
                      <b-button size="sm" variant="success" class="mr-1" @click="info(row.item, row.index, $event.target)">
                        <i class="fa fa-edit"></i> Update Location
                      </b-button>
                      <b-button size="sm" variant="danger" class="mr-1" @click="removeLoc">
                        <i class="fa fa-trash"></i> Remove Location
                      </b-button>
                    </template>
                  </b-table>
                </b-col>
              </b-row>
          <b-row>
            <b-col md="6" class="my-1">
              <b-button class="mr-2" variant="outline-primary" :disabled="clickable" v-on:click="prevButton"><i class="fa fa-arrow-left"></i> Previous</b-button>
              <b-button variant="outline-primary" v-on:click="nextButton">Next <i class="fa fa-arrow-right"></i></b-button>
            </b-col>
          </b-row>
        </b-card>
        <b-modal id="addLocation" size="lg" title="Add Location" hide-footer>
          <add-location></add-location>
        </b-modal>
        <b-modal id="locationInfo" @hide="resetModal" size="lg" title="Update Location" hide-footer>
          <update-location :locationInfo="locationInfo"></update-location>
        </b-modal>
      </b-col>
    </b-row>
</template>

<script>
  import AddLocation from './AddLocation'
  import UpdateLocation from './UpdateLocation'
  import BModal from "bootstrap-vue/src/components/modal/modal";

  let navi = [
    {id: '1', title: 'Location 1', address: 'Vertical Office, Bangsar South', lat: '32.3231312', long: '1.3123123123'},
    {id: '2', title: 'Location 2', address: 'Sunway Pyramid', lat: '12.3231312', long: '112.3123123123'},
    {id: '3', title: 'Location 3', address: 'Bandar Puteri, Klang', lat: '3.3231312', long: '1.12312312312'},
  ];
    export default {
        name: "Navigation",

      components: {
        BModal,
        'add-location' : AddLocation,
        'update-location' : UpdateLocation
      },

      data() {
          return{
            navi: navi,
            transProps: {
              // Transition name
              name: 'flip-list'
            },
            fields: [
              { key: 'id', label: 'Id', sortable: true, sortDirection: 'desc' },
              { key: 'title', label: 'Title', sortable: true, sortDirection: 'desc' },
              { key: 'lat', label: 'Latitude', sortable: true, sortDirection: 'desc' },
              { key: 'long', label: 'Longitude', sortable: true, sortDirection: 'desc' },
              { key: 'address', label: 'Address', sortable: true, sortDirection: 'desc'},
              { key: 'actions', label: 'Actions' }
            ],
            locationInfo: { title: '', content: '', name: '' },
            filter: null
          }
      },

      methods: {
        add(button, id) {
          this.$root.$emit('bv::show::modal', id, button)
        },

        info(item, index, button) {
          this.locationInfo.title = `Row index: ${index}`
          this.locationInfo.content = JSON.stringify(item, null, 2)
          this.$root.$emit('bv::show::modal', 'locationInfo', button)
        },

        resetModal() {
          this.locationInfo.title = ''
          this.locationInfo.content = ''
        },

        removeLoc(param){
          // Use sweetalert2
          this.$swal({
            title: 'Remove Location',
            text: "Are you sure you want to remove this location?",
            type: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, please!'
          }).then((result) => {
            if (result) {
            }
          })
        },
      }
    }
</script>

<style scoped>

</style>
