<template>
  <b-row>
    <b-col>
      <b-card>
        <b-row>
          <b-col>
            <h5 class="mb-3 text-uppercase text-grey">Contact</h5>
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
                <h6 class="mb-3 text-uppercase text-grey">Add Contact Us Main Text</h6>
              </b-col>
            </b-row>
            <b-form @submit="onSubmit" @reset="onReset" id="addContactUsMainText" v-if="show">
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
                <h6 class="text-uppercase text-grey line" style="line-height: 2">Update KPMG Email</h6>
              </b-col>
            </b-row>
              <b-form @submit="onEmailSubmit" v-if="showEmail" class="mt-3">
                <b-row>
                  <b-col sm="6">
                    <b-form-input
                      type="email"
                      class="contact-email"
                      v-model="email"
                      v-bind:class="{ active: isActive }"
                      :disabled="!isActive"
                      required
                      placeholder="Enter email" />
                  </b-col>
                  <b-col sm="6">
                    <transition name="fade">
                      <b-button type="submit" :key="buttonEmailID" variant="primary" class="mr-1" style="position: absolute;">
                        {{ isEditEmail ? 'Save' : 'Update Email' }}
                      </b-button>
                    </transition>
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
                <h6 class="text-uppercase text-grey line" style="line-height: 2">Office Locator List</h6>
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
              <b-col md="6" class="my-1 d-flex justify-content-end">
                <b-button variant="primary" @click="add($event.target, 'addOffice')">
                  <i class="fa fa-phone"></i> Add Office
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
                  <i class="fa fa-edit"></i> Update Office
                </b-button>
                <b-button size="sm" variant="danger" class="mr-1" @click="removeLoc">
                  <i class="fa fa-trash"></i> Remove Office
                </b-button>
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
      <b-modal id="addOffice" size="lg" title="Add Office" hide-footer>
        <add-office></add-office>
      </b-modal>
      <b-modal id="officeInfo" @hide="resetModal" size="lg" title="Update Office" hide-footer>
        <update-office :officeInfo="officeInfo"></update-office>
      </b-modal>
    </b-col>
  </b-row>
</template>

<script>
  import AddOffice from '../contact/AddOffice'
  import UpdateOffice from '../contact/UpdateOffice'
  //import BModal from "bootstrap-vue/src/components/modal/modal";
  import TextEditor from '../components/TextEditor'

  let navi = [
    {id: '1', title: 'Location 1', address: 'Vertical Office, Bangsar South', lat: '32.3231312', long: '1.3123123123', tel: '012345678', fax: '012345678'},
    {id: '2', title: 'Location 2', address: 'Sunway Pyramid', lat: '12.3231312', long: '112.3123123123', tel: '012345678', fax: '012345678'},
    {id: '3', title: 'Location 3', address: 'Bandar Puteri, Klang', lat: '3.3231312', long: '1.12312312312', tel: '012345678', fax: '012345678'},
  ];
  export default {
    name: "Contact",

    components: {
      'add-office' : AddOffice,
      'update-office' : UpdateOffice,
      'text-editor': TextEditor
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
        officeInfo: { title: '', content: '{}', name: '' },
        filter: null,
        model: '',
        show: true,
        showEmail: true,
        isEditing: false,
        isEditEmail: false,
        buttonID: 'edit',
        buttonEmailID: 'edit',
        email: 'kpmg@email.com',
        isActive: false
      }
    },

    methods: {
      add(button, id) {
        this.$root.$emit('bv::show::modal', id, button)
      },

      info(item, index, button) {
        this.officeInfo.title = `Row index: ${index}`
        this.officeInfo.content = JSON.stringify(item, null, 2)
        this.$root.$emit('bv::show::modal', 'officeInfo', button)
      },

      resetModal() {
        this.officeInfo.title = ''
        this.officeInfo.content = '{}'
      },

      removeLoc(param){
        // Use sweetalert2
        this.$swal({
          title: 'Remove Office',
          text: "Are you sure you want to remove this office?",
          type: 'question',
          showCancelButton: true,
          confirmButtonText: 'Yes, please!'
        }).then((result) => {
          if (result) {
          }
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

      onEmailSubmit(evt) {
        evt.preventDefault()
        this.handleSavingContent()
        this.isEditEmail = !this.isEditEmail
        if (this.isEditEmail == true)
        {
          this.buttonEmailID = 'save'
          this.isActive =  true
        }

        else{
          this.buttonEmailID = 'edit'
          this.isActive = false
        }
        //alert(JSON.stringify(this.form))
      },

      onReset(evt) {
        evt.preventDefault()
        this.model = ''
        this.show = false
        this.$nextTick(() => {
          this.show = true
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
.contact-email{
  background: grey;
  opacity: .6;
}
  .contact-email.active{
    background: white;
    opacity: unset;
  }
</style>
