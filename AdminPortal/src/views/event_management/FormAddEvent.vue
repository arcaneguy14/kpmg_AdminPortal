<template>
  <b-form @submit.prevent="validateBeforeSubmit" @reset="onReset" v-if="show" id="modalInfo">
    <b-row>
      <b-col md="12">
        <b-form-group inline label="">
          <b-row>
            <b-col sm="6">
              <b-form-group label="Event Name:">
                <b-form-input
                  type="text"
                  name="title"
                  v-model="form.title"
                  :class="{ 'input-error': errors.has('title') }" v-validate="'required'"
                  placeholder="Add Name"
                  data-vv-as="event name"
                />
                <span class="form-error">{{ errors.first('title') }}</span>
              </b-form-group>

              <b-form-group label="Event Date:">
                <b-form-group label="From">
                  <datepicker @input="filterDateTo(); updateDateFrom()" v-model="form.dateFrom" name="event-date-from" data-vv-as="date" :class="{ 'input-error': errors.has('event-date-from') }" v-validate="'required'" bootstrap-styling calendar-button clear-button placeholder="Insert Date" calendar-button-icon="fa fa-calendar"></datepicker>
                  <span class="form-error">{{ errors.first('event-date-from') }}</span>
                </b-form-group>
                <b-form-group label="To">
                  <datepicker @input="updateDateTo" v-model="form.dateTo" :disabledDates="disabledDates" name="event-date-to" data-vv-as="date" :class="{ 'input-error': errors.has('event-date-to') }" v-validate="'required'" bootstrap-styling calendar-button clear-button placeholder="Insert Date" calendar-button-icon="fa fa-calendar"></datepicker>
                  <span class="form-error">{{ errors.first('event-date-to') }}</span>
                </b-form-group>
              </b-form-group>
              <b-form-group label="Upload Event Floor Plan:">
                <input type='file' name="floor-plan" data-vv-as="floor plan" :class="{ 'input-error': errors.has('floor-plan') }" v-validate="'required'" id="imageUpload2" @change="previewImage" accept="application/pdf"/>
                <span class="form-error">{{ errors.first('floor-plan') }}</span>
              </b-form-group>
              <b-form-group id="genPwd" label="" label-for="genPass">
                <b-row>
                  <b-col md="6">
                    <b-form-input
                      id="genPass"
                      type="text"
                      name="gen-pass" data-vv-as="generate event code" :class="{ 'input-error': errors.has('gen-pass') }" v-validate="'required'"
                      v-model="form.pwd"
                      readonly
                      placeholder="" />
                    <span class="form-error">{{ errors.first('gen-pass') }}</span>
                  </b-col>

                  <b-col md="6" inline class="d-flex justify-content-end">
                    <b-button block type="button" @click="showAlert" variant="primary">Generate Event Code</b-button>
                  </b-col>
                </b-row>
              </b-form-group>

            </b-col>
            <b-col sm="6">
              <b-form-group class="p-3 border-light border">
                <span class="form-error">{{ errors.first('sel-venue') }}</span>

                <b-form-group label="Select Venue:">
                  <b-form-select :options="venues" v-model="form.venue"
                                 name="sel-venue" data-vv-as="venue" :class="{ 'input-error': errors.has('sel-venue') }" v-validate.continues="'falsy:a|falsy:b|falsy:c|falsy:d'"
                  />
                </b-form-group>
                <b-form-group>
                  <div class="or-parent">
                    <div class="or-border">or</div>
                  </div>
                </b-form-group>
                <b-form-group>
                  <b-row>
                    <b-col>
                      <b-form-group label="Add New Location">
                        <b-row>
                          <b-col>
                            <b-form-group label="Name:">
                              <b-form-input
                                type="text"
                                v-model="name"
                                ref="a"
                                placeholder="Title" />
                            </b-form-group>
                          </b-col>
                        </b-row>
                        <b-row>
                          <b-col sm="6">
                            <b-form-group label="Latitude:">
                              <b-form-input
                                type="number"
                                v-model="lat"
                                ref="b"
                                placeholder="Latitude" />
                            </b-form-group>
                          </b-col>

                          <b-col sm="6">
                            <b-form-group
                              label="Longitude:"
                            >
                              <b-form-input
                                type="number"
                                v-model="long"
                                ref="c"
                                placeholder="Longitude" />
                            </b-form-group>
                          </b-col>
                        </b-row>
                        <b-row>
                          <b-col>
                            <b-form-group label="Address:">
                              <b-form-input
                                type="text"
                                v-model="address"
                                ref="d"
                                placeholder="Address" />
                            </b-form-group>
                          </b-col>
                        </b-row>
                      </b-form-group>
                    </b-col>
                  </b-row>
                </b-form-group>
              </b-form-group>
            </b-col>
          </b-row>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-button type="submit" class="mr-1" variant="primary">Save</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-col>
    </b-row>
  </b-form>
</template>

<script>
  import Datepicker from 'vuejs-datepicker';
  import { Validator } from 'vee-validate';
  let instance = new Validator({ trueField: 'truthy' });

  // Also there is an instance 'extend' method for convenience.
  //instance.extend('falsy', (value) => value!=null);

  instance.extend('falsy', (value, [otherValue]) => {
    return (value && !otherValue) || (!value && otherValue);
  }, {
    hasTarget: true
  });

  instance.attach({
    name: 'falseField',
    rules: 'falsy'
  });

  export default {
    name: "FormAddEvent",
    components: {
      Datepicker
    },

    props: ['currentStep'],

    data() {
      return {
        form: {
          image: 'https://increasify.com.au/wp-content/uploads/2016/08/default-image.png',
          title: '',
          content: '',
          subtitle: '',
          pwd: '',
          dateFrom: '',
          dateTo: '',
          venue: null,
        },
        venues: [{ text: 'Select One', value: null },
          "Nexus, Bangsar South","PWTC, Kuala Lumpur", "Menara Axis, PJ"],
        show: true,
        model: '',
        name: '',
        lat: '',
        long: '',
        address: '',
        disabledDates: {
          to: new Date(2016, 3, 5)
        },
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
        this.form.dateFrom = ''
        this.form.dateTo = ''
        this.form.venue = null
        this.name = ''
        this.lat = ''
        this.long = ''
        this.address = ''
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
            //if (img === 1)
            this.form.image = e.target.result;

            //if (img === 2)
            //this.image = e.target.result;
          }
          // Start the reader job - read file as a data url (base64 format)
          reader.readAsDataURL(input.files[0]);
        }
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
      },

      validateBeforeSubmit() {
        this.$validator.validateAll().then(result => {
          if (result) {
            // eslint-disable-next-line
            this.$emit('can-continue', {value: true});
          }

          else{
            this.$emit('can-continue', {value: false});
          }
        });
      },

      filterDateTo(){
        this.disabledDates.to = new Date(this.form.dateFrom.getFullYear(), this.form.dateFrom.getMonth(), this.form.dateFrom.getDate());
      },

      updateDateFrom(){
        this.$parent.$emit('on-dateFrom', this.form.dateFrom)
      },
      updateDateTo(){
        this.$parent.$emit('on-dateTo', this.form.dateTo)
      }
    },
  }
</script>


<style scoped>

</style>
