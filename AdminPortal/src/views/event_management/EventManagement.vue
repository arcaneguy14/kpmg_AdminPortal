<template>
  <b-row>
    <b-col>
      <b-card>
        <b-row>
          <b-col>
            <h5 class="mb-3 text-uppercase text-grey">Events</h5>
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
              <b-col sm="6" class="d-flex justify-content-end">
                <b-button variant="primary" class="ml-3 mb-3" @click="add($event.target, 'eventInfo')">
                  <i class="fa fa-pencil"></i> Add Event
                </b-button>
              </b-col>
            </b-row>

            <b-table striped hover
                     :items="tableContent"
                     responsive
                     :fields="fields2"
                     :filter="filter"
                     primary-key="id"
                     id="table-transition-example"
                     :tbody-transition-props="transProps"
                     class="mt-3"
            >
              <template slot="actions" slot-scope="row">
                <div class="table-action">
                  <span @click="add($event.target, 'eventInfo')"><i v-b-tooltip title="Update Event" class="fa fa-edit"></i></span>
                  <span @click="removeArticle"><i v-b-tooltip title="Remove Event" class="fa fa-trash"></i></span>
                </div>
              </template>
              <template slot="image" slot-scope="row">
                <div class="table-action">
                  <b-img v-bind="mainProps" sm thumbnail fluid src="https://increasify.com.au/wp-content/uploads/2016/08/default-image.png" />
                </div>
              </template>
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
      <!--
      <b-modal id="addInsightsMainText" size="lg" title="Add Insights Main Text" hide-footer>
        <add-insights-main></add-insights-main>
      </b-modal>
      -->
      <b-modal id="eventInfo" scrollable @hide="resetModal" size="lg" title="Add Event" hide-footer>
        <add-event></add-event>
      </b-modal>
      <b-modal id="updateEvent" @hide="resetModal" size="lg" title="Update Event" hide-footer>
        <update-event-article :eventInfo="eventInfo" v-if="show"></update-event-article>
      </b-modal>
    </b-col>
  </b-row>
</template>

<script>
  //import BModal from "bootstrap-vue/src/components/modal/modal"
  import TextEditor from '../components/TextEditor'
  import AddEvent from "./AddEvent"
  import UpdateEventArticle from '../event/UpdateEventArticle'

  let tableContent = [
    {
      "id": "1",
      "image": "https://increasify.com.au/wp-content/uploads/2016/08/default-image.png",
      "title": "Digital Transformation",
      "venue": "Vertical Office, Bangsar South",
      "date": "20/4/2019",
      "subtitle": "subtitle1"
    },
    {
      "id": "2",
      "image": "https://increasify.com.au/wp-content/uploads/2016/08/default-image.png",
      "title": "Customer First Insights",
      "venue": "Sunway Pyramid",
      "date": "27/4/2019",
      "subtitle": "subtitle2"
    },
    {
      "id": "3",
      "image": "https://increasify.com.au/wp-content/uploads/2016/08/default-image.png",
      "title": "Data-driven technologies",
      "venue": "Bandar Puteri, Klang",
      "date": "6/5/2019",
      "subtitle": "subtitle3"
    }
  ];

  export default {
    name: "EventManagement",

    components: {
      'add-event' : AddEvent,
      'update-event-article': UpdateEventArticle,
      'text-editor': TextEditor
    },

    data() {
      return{
        tableContent: tableContent,
        transProps: {
          // Transition name
          name: 'flip-list'
        },
        fields2: [
          { key: 'id', label: 'Id', sortable: true, sortDirection: 'desc' },
          { key: 'title', label: 'Event Name', sortable: true, sortDirection: 'desc' },
          { key: 'venue', label: 'Venue', sortable: true, sortDirection: 'desc' },
          { key: 'date', label: 'Date', sortable: true, sortDirection: 'desc' },
          { key: 'actions', label: 'Actions' }
        ],
        eventInfo: { title: '', content: '{}', name: '' },
        model: '',
        show: true,
        isEditing: false,
        buttonID: 'edit',
        buttonType: '',
        mainProps: { width: 250 },
        filter: null
      }
    },

    methods: {
      add(button, id) {
        this.$root.$emit('bv::show::modal', id, button)
      },

      info(item, index, button) {
        this.eventInfo.title = `Row index: ${index}`
        this.eventInfo.content = JSON.stringify(item, null, 2)
        this.$root.$emit('bv::show::modal', 'updateEvent', button)

        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      },

      resetModal() {
        this.eventInfo.title = ''
        this.eventInfo.content = '{}'
      },

      onReset(evt) {
        evt.preventDefault()
        this.model = ''
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      },

      onSubmit(evt) {
        evt.preventDefault()
        this.handleSavingContent()
        this.isEditing = !this.isEditing
        if (this.isEditing == true)
        {
          this.buttonID = 'save'
        }

        else{
          this.buttonID = 'edit'
        }
        //alert(JSON.stringify(this.form))
      },

      removeArticle(param){
        // Use sweetalert2
        this.$swal({
          title: 'Remove Event',
          text: "Are you sure you want to remove this event?",
          type: 'question',
          showCancelButton: true,
          confirmButtonText: 'Yes, please!'
        }).then((result) => {
          if (result) {
          }
        })
      },

      handleSavingContent: function() {
        // You have the content to save
        const html = this.model
        console.log(html)
      },
    }
  }
</script>

<style scoped>

</style>
