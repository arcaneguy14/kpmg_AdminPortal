<template>
  <b-form @submit="onSubmit" @reset="onReset" v-if="show" id="modalInfo">
    <b-form-group inline id="exampleInputGroup" label="" label-for="exampleInput">
      <b-row>
        <b-col sm="12">
          <b-form-group id="exampleInputGroup2" label="Title:" label-for="exampleInput2">
            <b-form-input
              id="exampleInput2"
              type="text"
              v-model="form.title"
              required
              placeholder="Add Title" />
          </b-form-group>
        </b-col>
      </b-row>
    </b-form-group>
    <b-row>
      <b-col>
        <b-form-group
          id="exampleInputGroup2"
          label="Content:"
          label-for="exampleInput2"
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
    name: "AddInsightsArticle",
    components: {
      'text-editor': TextEditor
    },
    data() {
      return {
        form: {
          image: '',
          title: '',
          content: '',
          author: ''
        },
        show: true,
        model: ''
      }
    },

    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        alert(JSON.stringify(this.form))
        this.handleSavingContent()
      },
      onReset(evt) {
        evt.preventDefault()
        /* Reset our form values */
        this.form.mainText = ''
        this.form.title = ''
        this.model = ''
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
