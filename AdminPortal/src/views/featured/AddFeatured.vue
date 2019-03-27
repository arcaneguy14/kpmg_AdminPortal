<template>
  <div>
    <b-row>
      <b-col sm="6">
        <b-form-group>
          <label>Filter By:</label>
          <b-form-select v-model="selected" :options="options" />
        </b-form-group>
      </b-col>
      <b-col sm="6">
        <b-form-group>
          <label>Search Title</label>
          <b-form-input type="text" id="city" placeholder="Search"></b-form-input>
        </b-form-group>
      </b-col>
    </b-row>
    <b-table striped hover
             :items="features"
             responsive
             :fields="fields"
    >
      <template slot="actions" slot-scope="row">
        <b-button size="sm" variant="success" class="mr-1">
          <i class="fa fa-edit"></i> Add to Featured
        </b-button>
      </template>
      <template slot="category" slot-scope="row">
        {{options[row.item.category].text}}
      </template>
    </b-table>
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
              { value: null,text: 'Select' },
              { value: '1', text: 'Insights' },
              { value: '2', text: 'Services' },
              { value: '3', text: 'Industries' },
            ],
            selected: null
          }
      }
    }
</script>

<style scoped>

</style>
