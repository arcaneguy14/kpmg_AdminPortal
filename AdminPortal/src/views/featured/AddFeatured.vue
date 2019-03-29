<template>
  <div>
    <b-row>
      <b-col sm="3">
        <b-form-group>
          <b-form-select v-model="selected" :options="options" />
        </b-form-group>
      </b-col>
      <b-col sm="7">
        <b-form-group>
          <b-form-input type="text" id="city" placeholder="Search Title"></b-form-input>
        </b-form-group>
      </b-col>
      <b-col sm="2">
        <b-form-group>
          <b-button variant="primary"><i class="fa fa-search"></i> Search</b-button>
        </b-form-group>
      </b-col>
    </b-row>
    <b-table striped hover
             :items="features"
             responsive
             :fields="fields"
    >
      <template slot="actions" slot-scope="row">
        <b-button size="sm" variant="success" class="mr-1" @click="showAlert">
          <i class="fa fa-edit"></i> Add to Featured
        </b-button>
      </template>
      <template slot="category" slot-scope="row">
        {{options[row.item.category].text}}
      </template>
    </b-table>
    <b-row>
      <b-col md="6" class="my-1">
        <b-button class="mr-2" variant="outline-primary" :disabled="clickable" v-on:click="prevButton"><i class="fa fa-arrow-left"></i> Previous</b-button>
        <b-button variant="outline-primary" v-on:click="nextButton">Next <i class="fa fa-arrow-right"></i></b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
    export default {
      name: "AddFeatured",
      props: ['features'],

      data(){
          return{
            fields: [
              { key: 'id', label: 'Id', sortable: true, sortDirection: 'desc' },
              { key: 'title', label: 'Title', sortable: true, sortDirection: 'desc' },
              { key: 'category', label: 'Category' },
              { key: 'actions', label: 'Actions' }
            ],
            options: [
              { value: null,text: 'Select Category' },
              { value: '1', text: 'Insights' },
              { value: '2', text: 'Services' },
              { value: '3', text: 'Industries' },
            ],
            selected: null
          }
      },

      methods: {
        showAlert(){
          // Use sweetalert2
          this.$swal({
            title: 'Add to Featured',
            text: "Are you sure you want to add this as Featured content?",
            type: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, please!'
          }).then((result) => {
            if (result) {
              this.genUserPass(1)
            }
          })
        }
      }
    }
</script>

<style scoped>

</style>
