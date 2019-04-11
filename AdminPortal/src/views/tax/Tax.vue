<template>
  <b-row>
    <b-col>
      <b-card>
        <b-row>
          <b-col>
            <h5 class="mb-3 text-uppercase text-grey">Participant Listing</h5>
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
              <template slot="actions" slot-scope="row">
                <div class="table-action">
                  <span @click="info(row.item, row.index, $event.target)"><i v-b-tooltip title="Tax Calculator Summary" class="fa fa-clipboard"></i></span>
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
      <b-modal id="taxInfo" size="md" title="Tax Summary" hide-footer scrollable>
        <b-tabs content-class="mt-3">
          <b-tab title="Summary" active><tax-info :taxInfo="taxInfo"></tax-info></b-tab>
          <b-tab title="Input Detail"><tax-input :taxInfo="taxInfo"></tax-input></b-tab>
        </b-tabs>
      </b-modal>
    </b-col>
  </b-row>
</template>

<script>
  import TaxSummary from './TaxSummary'
  import TaxInputDetail from './TaxInputDetail'

  let content = [
    {id: '1', user: 'Khal Drogo', eventName: 'Building Financial Freedom', eventDate: '10/4/2019', summary: {gross: '110,000', family: '2300', epf: '6000', medical: '3000', other: '1500', taxable: '84,000', tax: '4500'} },
    {id: '2', user: 'Jon Snow', eventName: 'Property Financing for Beginners', eventDate: '11/4/2019', summary: {gross: '300,000', family: '1000', epf: '2000', medical: '3000', other: '1500', taxable: '84,000', tax: '4500'}},
    {id: '3', user: 'White Walker', eventName: 'Housing 101', eventDate: '12/4/2019', summary: {gross: '230,000', family: '3000', epf: '6000', medical: '1000', other: '1500', taxable: '84,000', tax: '4500'}},
    {id: '4', user: 'Jaime Lanister', eventName: 'Special Dialogue with LHDN', eventDate: '13/4/2019', summary: {gross: '130,000', family: '5000', epf: '7000', medical: '3000', other: '1500', taxable: '84,000', tax: '4500'}},
    {id: '5', user: 'Aegon Targaryen', eventName: 'Tax and Business Summit 2019', eventDate: '14/4/2019', summary: {gross: '60,000', family: '7000', epf: '8000', medical: '3000', other: '1500', taxable: '84,000', tax: '4500'}},
  ];

  export default {
    name: "Tax",

    components: {
      'tax-info': TaxSummary,
      'tax-input': TaxInputDetail
    },

    data(){
      return{
        content: content,
        fields: [
          { key: 'id', label: 'Id', sortable: true, sortDirection: 'desc'},
          { key: 'user', label: 'Participant Name', sortable: true, sortDirection: 'desc' },
          { key: 'eventName', label: 'Event Name', sortable: true, sortDirection: 'desc' },
          { key: 'eventDate', label: 'Event Date', sortable: true, sortDirection: 'desc' },
          { key: 'actions', label: 'Actions', sortable: false},
        ],
        fieldsCSVHeader: ['user','eventName','eventDate'],
        filter: null,
        selected: 1,
        options: [
          { value: 1, text: 'User' },
          { value: 2, text: 'Event' },
        ],
        taxInfo: { title: '', content: '{}', name: '' },
      }
    },

    methods: {
      info(item, index, button) {
        this.taxInfo.title = `Row index: ${index}`
        this.taxInfo.content = JSON.stringify(item)
        this.$root.$emit('bv::show::modal', 'taxInfo', button)

        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      },
    }
  }
</script>

<style scoped>

</style>
