<template>
  <div>
    <div v-if="showList">
      <b-card>
        <b-row>
          <b-col>
            <p>Title: {{form.title}}</p>
          </b-col>
          <b-col>
            <p>Time: {{form.timeFrom}} - {{form.timeTo}}</p>
          </b-col>
          <b-col>
            Venue: Hall B
          </b-col>
        </b-row>
      </b-card>
      <b-row>
        <b-col md="12" class="text-center mb-3">
          <b-button @click="onReset">+</b-button>
        </b-col>
      </b-row>
    </div>
    <b-form v-if="!showList">
      <b-row>
        <b-col>
          <b-card style="border: 5px solid #00519A">
            <b-form-group label="Select Date:">
              <b-form-select v-model="dateSelect"
                             name="sel-venue" data-vv-as="venue"
              >
                <option :value="null">Please select an option</option>
                <option v-for="d in date" :value="d">{{d}}</option>
              </b-form-select>
            </b-form-group>
          </b-card>

          <b-row>
            <b-col md="6">
              <b-form-group label="Agenda Name:">
                <b-form-input
                  type="text"
                  name="title"
                  v-model="form.title"
                  :class="{ 'input-error': errors.has('title') }" v-validate="'required'"
                  placeholder="Add Name"
                  data-vv-as="agenda name"
                />
                <span class="form-error">{{ errors.first('title') }}</span>
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group label="Select Agenda Type:">
                <b-form-select :options="types" v-model="form.type"
                               name="sel-venue" data-vv-as="venue" :class="{ 'input-error': errors.has('sel-venue') }" v-validate.continues="'falsy:a|falsy:b|falsy:c|falsy:d'"
                />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="6">
              <b-form-group label="Agenda Time:">
                <b-row>
                  <b-col md="6">
                    <b-form-group label="From:">
                      <b-form-select :options="times" v-model="form.timeFrom"
                                     name="sel-time-from" data-vv-as="time from" :class="{ 'input-error': errors.has('sel-time-from') }" v-validate="'required'"
                      />
                    </b-form-group>
                  </b-col>
                  <b-col md="6">
                    <b-form-group label="To:">
                      <b-form-select :options="times" v-model="form.timeTo"
                                     name="sel-time-from" data-vv-as="time from" :class="{ 'input-error': errors.has('sel-time-from') }" v-validate="'required'"
                      />
                    </b-form-group>
                  </b-col>
                </b-row>
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group label="Description:">
                <b-form-textarea
                  type="text"
                  name="description"
                  v-model="form.description"
                  :class="{ 'input-error': errors.has('description') }" v-validate="'required'"
                  placeholder="Add text"
                  data-vv-as="agenda description"
                />
                <span class="form-error">{{ errors.first('title') }}</span>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="3">
              <b-card>
                <qr-code :text="qrCode" size="120" v-if="show"></qr-code>
              </b-card>
              <b-button @click="populateQR">Generate Agenda QR</b-button>
            </b-col>
            <b-col md="3">
              <b-form-group label="Upload Resources:">
                <input type='file' name="floor-plan" data-vv-as="floor plan" :class="{ 'input-error': errors.has('floor-plan') }" v-validate="'required'" id="imageUpload2" @change="previewImage" accept="application/pdf"/>
                <span class="form-error">{{ errors.first('floor-plan') }}</span>
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group label="Venue:">
                <b-form-input
                  type="text"
                  name="title"
                  v-model="form.venue"
                  placeholder="Add Name"
                  data-vv-as="venue name"
                />
                <span class="form-error">{{ errors.first('title') }}</span>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row class="mt-3">
            <b-col>
              <b-form-group label="Select Speaker:">
                <b-form-select :options="speakers" v-model="form.speaker"
                               name="sel-speaker" data-vv-as="speaker" :class="{ 'input-error': errors.has('sel-speaker') }" v-validate="'required'"
                />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-button class="mt-3" variant="primary" @click="showList=true">Save</b-button>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-form>
  </div>
</template>

<script>
  import VueQRCodeComponent from 'vue-qrcode-component'

  export default {
      name: "FormAddAgenda",
      components: {
        'qr-code': VueQRCodeComponent,
      },
      data(){
        return{
          show: false,
          date: this.$parent.$attrs.forms,
          dateSelect: null,
          form: {
            title: '',
            type: null,
            time: '',
            description: '',
            resource: '',
            venue: '',
            timeFrom: null,
            timeTo: null,
            speaker: null
          },
          qrCode: '',
          types: [{ text: 'Please select', value: null },
            "Marketing","Audit", "Tax"],
          times: [{ text: 'Time', value: null },
            '0:00','0:30','1:00','1:30','2:00','2:30','3:00','3:30','4:00','4:30','5:00','5:30','6:00','6:30','7:00','7:30','8:00','8:30','9:00','9:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00','18:30','19:00','19:30','20:00','20:30','21:00','21:30','22:00','22:30','23:00','23:30'],
          showList: false,
          speakers: [{ text: 'Please select', value: null },
            "John","Susan","Jeff"],
        }
      },

    methods: {
      populateQR(evt){
        evt.preventDefault()
        if (this.form.title != '')
        {
          this.qrCode = this.form.title;
          this.show = false
          this.$nextTick(() => {
            this.show = true
          })
        }
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

      onReset(evt) {
        evt.preventDefault()
        /* Reset our form values */
        this.form.title = ''
        this.form.timeFrom = ''
        this.form.timeTo = ''
        this.form.venue = ''
        this.showList = true
        this.$nextTick(() => {
          this.showList = false
        })
      },
    }
  }
</script>

<style scoped>

</style>
