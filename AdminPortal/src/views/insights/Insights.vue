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
              <b-col>
                <!--
                <b-button size="sm" variant="info" class="mb-3" @click="editMainText">
                  <i class="fa fa-pencil"></i> Add Insights Main Text
                </b-button>
                -->
                <h6 class="mb-3 text-uppercase text-grey">Add Insights Main Text</h6>
              </b-col>
            </b-row>
            <b-form @submit="onSubmit" @reset="onReset" id="addInsightsMainText" v-if="show">
            <b-row>
              <b-col>
                <text-editor v-model="model" :isEditing="isEditing"></text-editor>
              </b-col>
            </b-row>
            <b-row class="mt-3">
              <b-col>
                <transition name="fade">
                  <b-button type="submit" :key="buttonID" variant="primary" class="mr-1" style="position: absolute;">
                    {{ isEditing ? 'Save' : 'Edit' }}
                  </b-button>
                </transition>
                <b-button type="reset" variant="danger" style="margin-left: 60px;">Reset</b-button>
              </b-col>
            </b-row>
            </b-form>
            <b-row>
              <b-col class="d-flex justify-content-end">
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
                     class="mt-3"
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
      <!--
      <b-modal id="addInsightsMainText" size="lg" title="Add Insights Main Text" hide-footer>
        <add-insights-main></add-insights-main>
      </b-modal>
      -->
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
  import TextEditor from '../components/TextEditor'

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
      'text-editor': TextEditor
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
        model: '',
        show: true,
        isEditing: false,
        buttonID: 'edit',
        buttonType: ''
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
