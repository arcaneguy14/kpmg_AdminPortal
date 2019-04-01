<template>
  <b-form @submit="onSubmit" @reset="onReset" v-if="show" id="addInsightsMainText">
    <b-row>
      <b-col>
        <b-form-group
          id="exampleInputGroup1"
          label="Content:"
          label-for="exampleInput1"
        >
          <text-editor v-model="model"></text-editor>
        </b-form-group>
      </b-col>
    </b-row>
    <b-button type="submit" variant="primary" class="mr-1">Submit</b-button>
    <b-button type="reset" variant="danger">Reset</b-button>
  </b-form>
</template>

<script>
  import TextEditor from '../components/TextEditor'

  export default {
    name: "AddInsightsMainText",

    components: {
      'text-editor': TextEditor
    },
    data() {
      return {
        show: true,
        model: '',
        form: {
          mainText: '',
        },
      }
    },

    methods: {
      onSubmit(evt) {
        //evt.preventDefault()
        //this.handleSavingContent()
        //alert(JSON.stringify(this.form))
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

      handleSavingContent: function() {
        // You have the content to save
        const html = this.model
        console.log(html)
      }
    }
  }
</script>

<style scoped>
</style>
