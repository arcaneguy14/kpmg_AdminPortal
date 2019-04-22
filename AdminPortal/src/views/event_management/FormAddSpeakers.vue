<template>
  <b-form id="modalInfo" @submit.prevent="validateBeforeSubmit" @reset="onReset" v-if="show">
    <b-row>
      <b-col>
        <b-form-group label="Speaker Name:">
          <b-form-input
            type="text"
            name="name"
            v-model="form.name"
            :class="{ 'input-error': errors.has('name') }" v-validate="'required'"
            placeholder="Add Name"
            data-vv-as="speaker name"
          />
          <span class="form-error">{{ errors.first('name') }}</span>
        </b-form-group>
        <b-form-group label="Job:">
          <b-form-input
            type="text"
            name="job"
            v-model="form.job"
            :class="{ 'input-error': errors.has('job') }" v-validate="'required'"
            placeholder="Add Job"
            data-vv-as="speaker job"
          />
          <span class="form-error">{{ errors.first('job') }}</span>
        </b-form-group>
        <b-form-group label="Company:">
          <b-form-input
            type="text"
            name="company"
            v-model="form.company"
            :class="{ 'input-error': errors.has('company') }" v-validate="'required'"
            placeholder="Add Company"
            data-vv-as="speaker company"
          />
          <span class="form-error">{{ errors.first('company') }}</span>
        </b-form-group>
        <b-form-group label="Contact:">
          <b-form-input
            type="text"
            name="contact"
            v-model="form.contact"
            :class="{ 'input-error': errors.has('contact') }" v-validate="'required'"
            placeholder="Add Contact"
            data-vv-as="speaker contact"
          />
          <span class="form-error">{{ errors.first('contact') }}</span>
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
    export default {
        name: "FormAddSpeakers",

      data(){
          return{
            form:{
              name: '',
              job: '',
              company: '',
              contact: ''
            },
            show: true
          }
      },

      methods: {
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

        onReset(evt) {
          evt.preventDefault()
          /* Reset our form values */
          this.form.name = ''
          this.form.job = ''
          this.form.company = ''
          this.form.contact = ''
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
