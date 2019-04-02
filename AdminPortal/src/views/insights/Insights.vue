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
            <b-row class="mt-3">
              <b-col sm="6">
                <!--
                <b-button size="sm" variant="info" class="mb-3" @click="editMainText">
                  <i class="fa fa-pencil"></i> Add Insights Main Text
                </b-button>
                -->
                <h6 class="text-uppercase text-grey line" style="line-height: 2">Insights List</h6>
              </b-col>
              <b-col sm="6" class="d-flex justify-content-end">
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
                  <span @click="setFeatured"><i v-b-tooltip title="Set this article as Featured" class="fa fa-star"></i></span>
                  <span @click="info(row.item, row.index, $event.target)"><i v-b-tooltip title="Update Article" class="fa fa-edit"></i></span>
                  <span @click="removeArticle"><i v-b-tooltip title="Remove Article" class="fa fa-trash"></i></span>
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
      <b-modal id="insightsInfo" @hide="resetModal" size="lg" title="Add Insights Article" hide-footer>
        <add-article></add-article>
      </b-modal>
      <b-modal id="updateInsights" @hide="resetModal" size="lg" title="Update Insights Article" hide-footer>
        <update-article :insightsInfo="insightsInfo" v-if="show"></update-article>
      </b-modal>
    </b-col>
  </b-row>
</template>

<script>
  import AddInsightsMainText from '../insights/AddInsightsMainText'
  import AddInsightsArticle from '../insights/AddInsightsArticle'
  import UpdateInsightsArticle from '../insights/UpdateInsightsArticle'
  import BModal from "bootstrap-vue/src/components/modal/modal"
  import TextEditor from '../components/TextEditor'

  let tableContent = [
    {id: '1', image: 'https://increasify.com.au/wp-content/uploads/2016/08/default-image.png', title: 'Digital Transformation', content: 'Vertical Office, Bangsar South', author: 'Khal Drogo'},
    {id: '2', image: 'https://increasify.com.au/wp-content/uploads/2016/08/default-image.png', title: 'Customer First Insights', content: 'Sunway Pyramid', author: 'Jon Snow'},
    {id: '3', image: 'https://increasify.com.au/wp-content/uploads/2016/08/default-image.png', title: 'Data-driven technologies', content: 'Bandar Puteri, Klang', author: 'Stanis'},
  ];

  export default {
    name: "Insights",

    components: {
      BModal,
      'add-insights-main' : AddInsightsMainText,
      'add-article' : AddInsightsArticle,
      'update-article': UpdateInsightsArticle,
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
        buttonType: '',
        mainProps: { width: 250 }
      }
    },

    methods: {
      add(button, id) {
        this.$root.$emit('bv::show::modal', id, button)
      },

      info(item, index, button) {
        this.insightsInfo.title = `Row index: ${index}`
        this.insightsInfo.content = JSON.stringify(item, null, 2)
        this.$root.$emit('bv::show::modal', 'updateInsights', button)

        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
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

      setFeatured(param){
        // Use sweetalert2
        this.$swal({
          title: 'Set Article as Featured',
          text: "Are you sure you want to set this as Featured?",
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
