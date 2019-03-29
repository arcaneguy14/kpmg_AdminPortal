<template>
  <b-form @submit="onSubmit" @reset="onReset" v-if="show" id="addInsightsMainText">
    <b-row>
      <b-col>
        <b-form-group
          id="exampleInputGroup1"
          label="Add Main Text:"
          label-for="exampleInput1"
        >
          <b-form-textarea
            id="textarea"
            v-model="form.mainText"
            required
            placeholder="Enter text"
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
  export default {
    name: "AddInsightsMainText",
    data() {
      return {
        form: {
          mainText: '',
        },
        show: true
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
        this.form.mainText = ''
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
