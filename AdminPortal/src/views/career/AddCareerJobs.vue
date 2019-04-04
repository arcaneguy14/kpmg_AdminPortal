<template>
  <b-form @submit="onSubmit" @reset="onReset" v-if="show" id="modalInfo">
    <b-row class="mb-3">
      <b-col md="12">
        <b-form-group inline id="exampleInputGroup" label="" label-for="exampleInput">
          <b-row>
            <b-col sm="6">
              <b-form-group id="exampleInputGroup2" label="Job Title:" label-for="exampleInput2">
                <b-form-input
                  id="exampleInput2"
                  type="text"
                  v-model="form.title"
                  required
                  placeholder="Add Job Title" />
              </b-form-group>
            </b-col>

            <b-col md="6">
              <b-form-group id="exampleInputGroup2" label="Job Function:" label-for="exampleInput3">
                <b-form-input
                  id="exampleInput3"
                  type="text"
                  v-model="form.jobFunction"
                  required
                  placeholder="Add Job Function" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
                <b-form-group label="Job Level:">
                  <b-form-select :options="jobLevel" required v-model="form.jobLevel" />
                </b-form-group>

              <b-form-group label="Job Ref:">
                <b-form-input
                  id="exampleInput3"
                  type="text"
                  v-model="form.subtitle"
                  required
                  placeholder="Add Job Ref" />
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group label="Job Level:">
                <b-form-select :options="department" required v-model="form.department" />
              </b-form-group>

              <b-form-group label="Job Level:">
                <b-form-select :options="branch" required v-model="form.branch" />
              </b-form-group>
            </b-col>
          </b-row>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-form-group label="Job Description:">
        <text-editor v-model="modelJD"></text-editor>
        </b-form-group>

        <b-form-group label="Job Responsibilities:">
          <text-editor v-model="modelJResponsibilities"></text-editor>
        </b-form-group>

        <b-form-group label="Job Requirements:">
          <text-editor v-model="modelJRequirements"></text-editor>
        </b-form-group>
        <b-button type="submit" variant="primary" class="mr-1">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-col>
    </b-row>
  </b-form>
</template>

<script>
  import TextEditor from '../components/TextEditor'
  import BCol from "bootstrap-vue/src/components/layout/col";
  import BRow from "bootstrap-vue/src/components/layout/row";

  export default {
    name: "AddCareerArticle",
    components: {
      BRow,
      BCol,
      'text-editor': TextEditor
    },
    data() {
      return {
        form: {
          image: 'https://increasify.com.au/wp-content/uploads/2016/08/default-image.png',
          title: '',
          content: '',
          subtitle: '',
          jobLevel: null,
          department: null,
          branch: null
        },
        show: true,
        modelJD: '',
        modelJResponsibilities: '',
        modelJRequirements: '',
        jobLevel: [{ text: 'Select One', value: null },
          "Graduate", "Experienced", "Internship"],
        department: [{text: "DEPARTMENT", value: null},
          "Accounting Advisory Services","Actuarial","Admin","Advisory Aces","Asia Pacific (L&amp;D)","Audit Assurances","Audit Centralization Team (Audit - Admin)","Corporate Finance ","Corporate Restructuring","Corporate Solution &amp; Innovation","Corporate Tax","Data &amp; Analytics","Department of Professional Practice","Emerging Tech Risk &amp; Cyber (Security) ","Finance","Financial Management (Management Consulting)","Financial Risk Management ","Forensic Services","Global Compliance Management Services ","Global Mobility Services","Governance and Sustainability ","Growth (Marcom/Markets/KM)","Indirect Tax","Information Risk Management (IT Audit)","Information Technology Enabled Transformation ","Information Technology Services","Internal Audit, Risk &amp; Compliance Services(Penang)","Internal Audit, Risk and Compliance Services ","KPMG Business School (L&amp;D)","Management Information System","People and Change (Management Consulting)","People, Performance, and Culture (HR)","Risk Management Department","Shared Services and Outsourcing Advisory","Strategy and Operations (Management Consulting) ","Tax Risk Management","Transaction Services ","Transfer Pricing","UKEC"
        ],
        branch: [{text: "BRANCH", value: null},
          "Ipoh","Johor Bahru","Kota Kinabalu","Kuching","Miri","Penang","Petaling Jaya"
        ]
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
        this.modelJD = ''
        this.modelJResponsibilities = ''
        this.modelJRequirements = ''
        this.form.image = 'https://increasify.com.au/wp-content/uploads/2016/08/default-image.png'
        /* Trick to reset/clear native browser form validation state */
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      },

      handleSavingContent: function() {
        // You have the content to save
        const html = this.modelJD
        console.log(html)

        const html2 = this.modelJResponsibilities
        console.log(html2)

        const html3 = this.modelJRequirements
        console.log(html3)
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
