<template>
  <b-form @submit="onSubmit" @reset="onReset" v-if="show" id="locationInfo">
    <b-row>
      <b-col sm="12">
        <b-form-group label="Title:">
          <b-form-input
            type="text"
            :value="JSON.parse(locationInfo.content).title"
            required
            placeholder="Title" />
        </b-form-group>
      </b-col>
    </b-row>
    <b-form-group inline label="">
      <b-row>
        <b-col sm="6">
          <b-form-group label="Latitude:">
            <b-form-input
              type="text"
              :value="JSON.parse(locationInfo.content).lat"
              required
              placeholder="Latitude" />
          </b-form-group>
        </b-col>

        <b-col sm="6">
          <b-form-group
            label="Longitude:"
          >
            <b-form-input
              type="text"
              :value="JSON.parse(locationInfo.content).long"
              required
              placeholder="Longitude" />
          </b-form-group>
        </b-col>
      </b-row>
    </b-form-group>


    <b-row>
      <b-col>
        <b-form-group
          label="Address:"
        >
          <b-form-textarea
            id="textarea"
            :value="JSON.parse(locationInfo.content).address"
            required
            placeholder="Enter Address..."
            rows="3"
            max-rows="6"
          />
        </b-form-group>
      </b-col>
    </b-row>

    <b-button type="submit" variant="primary" class="mr-1">Submit</b-button>
    <b-button type="reset" variant="danger">Reset</b-button>
  </b-form>
</template>

<script>
  //import BRow from "bootstrap-vue/src/components/layout/row";
  //import BCol from "bootstrap-vue/src/components/layout/col";
  export default {
    name: "UpdateLocation",

    props: ['locationInfo'],

    data() {
      return {
        form: {
          title: '',
          lat: '',
          long: '',
          address: '',
        },
        show: true,
      }
    },

    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        alert(JSON.stringify(this.form))
      },
      onReset(evt) {
        evt.preventDefault()
        /* Reset our form values */
        this.form.title = ''
        this.form.lat = ''
        this.form.long = ''
        this.form.address = ''
        /* Trick to reset/clear native browser form validation state */
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
