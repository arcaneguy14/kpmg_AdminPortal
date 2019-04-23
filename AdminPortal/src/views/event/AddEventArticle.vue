<template>
  <b-form @submit="onSubmit" @reset="onReset" v-if="show" id="modalInfo">
    <b-row class="mb-3">
      <b-col md="4">
        <image-upload :id="id" @image="addImage"></image-upload>
      </b-col>
      <b-col md="8">
        <b-form-group inline label="">
          <b-row>
            <b-col sm="12">
              <b-form-group label="Title:">
                <b-form-input
                  type="text"
                  v-model="form.title"
                  required
                  placeholder="Add Title" />
              </b-form-group>

              <b-form-group label="Subtitle:">
                <b-form-input
                  type="text"
                  v-model="form.subtitle"
                  required
                  placeholder="Add Subtitle" />
              </b-form-group>
              <b-form-group label="Event Date:">
                <datepicker v-model="form.date" name="event-date" bootstrap-styling calendar-button clear-button placeholder="Insert Date" calendar-button-icon="fa fa-calendar"></datepicker>
              </b-form-group>
            </b-col>
          </b-row>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-form-group label="Content:">
          <text-editor v-model="model"></text-editor>
        </b-form-group>

        <b-form-group id="genPwd" label="" label-for="genPass">
          <b-row>
            <b-col md="9">
              <b-form-input
                id="genPass"
                type="text"
                v-model="form.pwd"
                required
                readonly
                placeholder="" />
            </b-col>

            <b-col md="3" class="d-flex justify-content-end">
              <b-button type="button" @click="showAlert" variant="primary">Generate Event Code</b-button>
            </b-col>
          </b-row>
        </b-form-group>

        <b-button type="submit" variant="primary" class="mr-1">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-col>
    </b-row>
  </b-form>
</template>

<script>
  import TextEditor from '../components/TextEditor'
  import Datepicker from 'vuejs-datepicker';
  import ImageUpload from '../components/ImageUpload'

  export default {
    name: "AddEventArticle",
    components: {
      'text-editor': TextEditor,
      'image-upload': ImageUpload,
      Datepicker
    },

    data() {
      return {
        form: {
          image: 'https://increasify.com.au/wp-content/uploads/2016/08/default-image.png',
          title: '',
          content: '',
          subtitle: '',
          pwd: '',
          date: ''
        },
        show: true,
        model: '',
        id: 'main'
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
        this.form.pwd = ''
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

      addImage(image){
        this.form.image = image
      },

      genUserPass(para){
        var comb = para + new Date().getTime();
        this.form.pwd = btoa(comb);
      },

      showAlert(){
        // Use sweetalert2
        this.$swal({
          title: 'Generate Password',
          text: "Are you sure you want to generate a temporary user password?",
          type: 'question',
          showCancelButton: true,
          confirmButtonText: 'Yes, generate!'
        }).then((result) => {
          if (result) {
            this.genUserPass(1)
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  @import "../../assets/scss/variables";

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

  .vdp-datepicker{
    .form-control{
      background-color: white !important;
    }
  }

  .vdp-datepicker__calendar .cell.selected{
    background: $kpmgblue;
    color: white;
  }
</style>
