<template>
  <b-form @submit="onSubmit" @reset="onReset" v-if="show" id="modalInfo">
    <b-row class="mb-3">
      <b-col md="4">
        <div class="avatar-upload">
          <div class="avatar-edit">
            <input type='file' id="imageUpload" @change="previewImage(1)" accept="image/*"/>
            <label for="imageUpload"><i class="fa fa-pencil"></i></label>
          </div>
          <div class="avatar-preview" v-if="!form.image">
            <img class="imagePreview" :src="form.image">
          </div>
          <div class="avatar-preview" v-else>
            <img class="imagePreview" :src="form.image">
          </div>
        </div>
      </b-col>
      <b-col md="8">
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

              <b-form-group id="exampleInputGroup2" label="Subtitle:" label-for="exampleInput3">
                <b-form-input
                  id="exampleInput3"
                  type="text"
                  v-model="form.subtitle"
                  required
                  placeholder="Add Subtitle" />
              </b-form-group>
            </b-col>
          </b-row>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-form-group
          id="exampleInputGroup2"
          label="Content:"
          label-for="exampleInput2"
        >
          <text-editor v-model="model"></text-editor>
        </b-form-group>
        <b-button type="submit" variant="primary" class="mr-1">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-col>
    </b-row>
  </b-form>
</template>

<script>
  import TextEditor from '../components/TextEditor'

  export default {
    name: "AddServicesArticle",
    components: {
      'text-editor': TextEditor
    },
    data() {
      return {
        form: {
          image: 'https://increasify.com.au/wp-content/uploads/2016/08/default-image.png',
          title: '',
          content: '',
          subtitle: ''
        },
        show: true,
        model: '',
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
        this.form.subtitle = ''
        this.model = ''
        this.form.image = 'https://increasify.com.au/wp-content/uploads/2016/08/default-image.png'
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
      },

      previewImage: function(img) {
        // Reference to the DOM input element
        var input = event.target;
        // Ensure that you have a file before attempting to read it
        if (input.files && input.files[0]) {
          // create a new FileReader to read this image and convert to base64 format
          var reader = new FileReader();
          // Define a callback function to run, when FileReader finishes its job
          reader.onload = (e) => {
            // Note: arrow function used here, so that "this.image" refers to the image of Vue component
            // Read image as base64 and set to image
            if (img === 1)
              this.form.image = e.target.result;

            if (img === 2)
              this.image = e.target.result;
          }
          // Start the reader job - read file as a data url (base64 format)
          reader.readAsDataURL(input.files[0]);
        }
      },
    }
  }
</script>

<style lang="scss">
  .avatar-upload {
    position: relative;
    //max-width: 205px;
    //margin: 50px auto;
    .avatar-edit {
      position: absolute;
      //right: 12px;
      z-index: 1;
      //top: 10px;
      input {
        display: none;
        + label {
          display: inline-block;
          width: 34px;
          height: 34px;
          margin-bottom: 0;
          border-radius: 100%;
          background: #FFFFFF;
          border: 1px solid transparent;
          box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.12);
          cursor: pointer;
          font-weight: normal;
          transition: all .2s ease-in-out;
          position: relative;
          &:hover {
            background: #f1f1f1;
            border-color: #d6d6d6;
          }
          &:after {
            color: #757575;
            position: absolute;
            top: 10px;
            left: 0;
            right: 0;
            text-align: center;
            margin: auto;
          }
          .fa-pencil{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
          }
        }
      }
    }
    .avatar-preview {
      width: 192px;
      height: 192px;
      position: relative;
      //border-radius: 100%;
      border: 6px solid #F8F8F8;
      box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
      > img {
        width: 100%;
        height: 100%;
        //border-radius: 100%;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        object-fit: cover;
      }
    }
  }
</style>
