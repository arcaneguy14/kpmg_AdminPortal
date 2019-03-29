<template>
  <b-row>
    <b-col>
      <b-card>
        <b-row>
          <b-col>
            <h5 class="mb-3 text-uppercase text-grey">Insights</h5>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-row>
              <b-col class="d-flex justify-content-end">
                <b-button size="sm" variant="info" class="mb-3" @click="add($event.target, 'addInsightsMainText')">
                  <i class="fa fa-pencil"></i> Add Insights Main Text
                </b-button>
                <b-button size="sm" variant="primary" class="ml-3 mb-3" @click="add($event.target, 'insightsInfo')">
                  <i class="fa fa-pencil"></i> Add Insights
                </b-button>
              </b-col>
            </b-row>
            <b-table striped hover
                     :items="tableContent"
                     responsive
                     :fields="fields"
                     primary-key="id"
                     id="table-transition-example"
                     :tbody-transition-props="transProps"
            >
              <template slot="actions" slot-scope="row">
                <div class="table-action">
                  <span><i v-b-tooltip title="Set this article as Featured" class="fa fa-star"></i></span>
                  <span @click="info(row.item, row.index, $event.target)"><i v-b-tooltip title="Update Article" class="fa fa-edit"></i></span>
                  <span @click="removeArticle"><i v-b-tooltip title="Remove Article" class="fa fa-trash"></i></span>
                </div>
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
      <b-modal id="addInsightsMainText" size="lg" title="Add Insights Main Text" hide-footer>
        <add-insights-main></add-insights-main>
      </b-modal>
      <b-modal id="insightsInfo" @hide="resetModal" size="lg" title="Add Article" hide-footer>
        <add-article :insightsInfo="insightsInfo"></add-article>
      </b-modal>
    </b-col>
  </b-row>
</template>

<script>
  import AddInsightsMainText from '../insights/AddInsightsMainText'
  import AddInsightsArticle from '../insights/AddInsightsArticle'
  import BModal from "bootstrap-vue/src/components/modal/modal"

  let tableContent = [
    {id: '1', image: '', title: 'Digital Transformation', content: 'Vertical Office, Bangsar South'},
    {id: '2', image: '', title: 'Customer First Insights', content: 'Sunway Pyramid'},
    {id: '3', image: '', title: 'Data-driven technologies', content: 'Bandar Puteri, Klang'},
  ];
  export default {
    name: "Insights",

    components: {
      BModal,
      'add-insights-main' : AddInsightsMainText,
      'add-article' : AddInsightsArticle,
    },

    data() {
      return{
        tableContent: tableContent,
        transProps: {
          // Transition name
          name: 'flip-list'
        },
        fields: [
          { key: 'id', label: 'Id', sortable: true, sortDirection: 'desc' },
          { key: 'image', label: 'Image', sortable: true, sortDirection: 'desc' },
          { key: 'title', label: 'Title', sortable: true, sortDirection: 'desc' },
          { key: 'content', label: 'Content', sortable: true, sortDirection: 'desc' },
          { key: 'actions', label: 'Actions' }
        ],
        insightsInfo: { title: '', content: '', name: '' },
      }
    },

    methods: {
      add(button, id) {
        this.$root.$emit('bv::show::modal', id, button)
      },

      info(item, index, button) {
        this.insightsInfo.title = `Row index: ${index}`
        this.insightsInfo.content = JSON.stringify(item, null, 2)
        this.$root.$emit('bv::show::modal', 'insightsInfo', button)
      },

      resetModal() {
        this.insightsInfo.title = ''
        this.insightsInfo.content = ''
      },

      removeArticle(param){
        // Use sweetalert2
        this.$swal({
          title: 'Remove Article',
          text: "Are you sure you want to remove this article?",
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
