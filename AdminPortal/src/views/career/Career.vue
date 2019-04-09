<template>
  <b-row>
    <b-col>
      <b-card>
        <b-row>
          <b-col>
            <h5 class="mb-3 text-uppercase text-grey">Career</h5>
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
                <h6 class="mb-3 text-uppercase text-grey">Add Career Main Text</h6>
              </b-col>
            </b-row>
            <b-form @submit="onSubmit" @reset="onReset" id="addCareerMainText" v-if="show">
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
                <h6 class="text-uppercase text-grey line" style="line-height: 2">Career List</h6>
              </b-col>
            </b-row>
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
                <b-button variant="primary" class="ml-3 mb-3" @click="add($event.target, 'careerInfo')">
                  <i class="fa fa-pencil"></i> Add Career
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
      <b-modal id="careerInfo" @hide="resetModal" size="lg" title="Add Career Article" hide-footer>
        <add-career-article></add-career-article>
      </b-modal>
      <b-modal id="updateCareer" @hide="resetModal" size="lg" title="Update Career Article" hide-footer>
        <update-career-article :careerInfo="careerInfo" v-if="show"></update-career-article>
      </b-modal>
    </b-col>
  </b-row>
</template>

<script>
  //import BModal from "bootstrap-vue/src/components/modal/modal"
  import TextEditor from '../components/TextEditor'
  import AddCareerArticle from "../career/AddCareerArticle"
  import UpdateCareerArticle from '../career/UpdateCareerArticle'

  let tableContent = [
    {
      "id": "1",
      "image": "https://increasify.com.au/wp-content/uploads/2016/08/default-image.png",
      "title": "Digital Transformation",
      "content": "Vertical Office, Bangsar South",
      "subtitle": "subtitle1"
    },
    {
      "id": "2",
      "image": "https://increasify.com.au/wp-content/uploads/2016/08/default-image.png",
      "title": "Customer First Insights",
      "content": "Sunway Pyramid",
      "subtitle": "subtitle2"
    },
    {
      "id": "3",
      "image": "https://increasify.com.au/wp-content/uploads/2016/08/default-image.png",
      "title": "Data-driven technologies",
      "content": "Bandar Puteri, Klang",
      "subtitle": "subtitle3"
    }
  ];

  export default {
    name: "Career",

    components: {
      'add-career-article' : AddCareerArticle,
      'update-career-article': UpdateCareerArticle,
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
          { key: 'image', label: 'Image', sortable: true, sortDirection: 'desc' },
          { key: 'title', label: 'Title', sortable: true, sortDirection: 'desc' },
          { key: 'content', label: 'Content', sortable: true, sortDirection: 'desc' },
          { key: 'actions', label: 'Actions' }
        ],
        careerInfo: { title: '', content: '{}', name: '' },
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
        this.careerInfo.title = `Row index: ${index}`
        this.careerInfo.content = JSON.stringify(item, null, 2)
        this.$root.$emit('bv::show::modal', 'updateCareer', button)

        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      },

      resetModal() {
        this.careerInfo.title = ''
        this.careerInfo.content = '{}'
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
