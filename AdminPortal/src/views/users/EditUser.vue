<template>
  <b-tabs content-class="mt-3">
    <b-tab title="User Detail" active>
      <b-form @submit="onSubmit" @reset="onReset" v-if="show" id="modalInfo">
        <b-row>
          <b-col sm="6">
            <b-form-group id="exampleInputGroup2" label="Your Name:" label-for="exampleInput2">
              <b-form-input
                id="exampleInput2"
                type=""
                :value="JSON.parse(modalInfo.content).name"
                required
                placeholder="Enter name" />
            </b-form-group>
          </b-col>

          <b-col sm="6">
            <b-form-group
              id="exampleInputGroup1"
              label="Email address:"
              label-for="exampleInput1"
              description="We'll never share your email with anyone else."
            >
              <b-form-input
                id="exampleInput1"
                type="email"
                :value="JSON.parse(modalInfo.content).email"
                required
                placeholder="Enter email" />
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col>
            <b-form-group
              id="exampleInputGroup1"
              label="Address:"
              label-for="exampleInput1"
            >
              <b-form-textarea
                id="textarea"
                v-model="form.address"
                required
                placeholder="Enter Address..."
                rows="3"
                max-rows="6"
              />
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group id="exampleInputGroup3" label="Nationality:" label-for="exampleInput3">
              <b-form-select id="exampleInput3" :options="countries" required v-model="form.country" />
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col>
            <b-form-group id="exampleGroup4" label="Gender">
              <b-form-radio-group v-model="form.checked" id="exampleChecks">
                <b-form-radio value="m">Male</b-form-radio>
                <b-form-radio value="f">Female</b-form-radio>
              </b-form-radio-group>
            </b-form-group>
          </b-col>
        </b-row>

        <b-form-group id="genPwd" label="" label-for="genPass">
          <b-row>
            <b-col>
              <b-form-input
                id="genPass"
                type="text"
                v-model="form.pwd"
                required
                readonly
                placeholder="" />
            </b-col>

            <b-col>
              <b-button type="button" @click="showAlert" variant="primary">Generate Password</b-button>
            </b-col>
          </b-row>
        </b-form-group>

        <b-button type="submit" variant="primary" class="mr-1">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
    </b-tab>
    <b-tab title="Social Media Linking">
        <b-form-group id="exampleInputGroup2" label="Social Media Linking" label-for="social-media">
          <b-row>
            <b-col sm="6" v-for="s in social_media" :key="s.id">
              <b-card class="card-button position-relative" @mouseover="showByIndex = s.id"
                      @mouseleave="showByIndex = null">
                <div class="card-button-icon"><i :class="s.icon"></i></div>
                <h5 class="mb-0 text-uppercase text-grey text-center">{{s.type}}</h5>
                <transition type="fade">
                  <div id="s-1" class="s-link" v-if="showByIndex == s.id">
                    <b-button type="button" variant="primary" @click="unlinkSocial(s.type)">Unlink</b-button>
                  </div>
                </transition>
              </b-card>
            </b-col>
          </b-row>

          <!--
          <b-row>
            <b-col sm="6">
              <b-card class="card-button position-relative" @mouseenter="active(3)">
                <div class="card-button-icon"><i class="fa fa-instagram"></i></div>
                <h5 class="mb-0 text-uppercase text-grey text-center">Instagram</h5>
                <div @mouseleave="notActive(3)" id="s-3" class="s-link" v-bind:class="{ active: isActive3 }">
                  <b-button type="button" variant="primary" @click="unlinkSocial('Instagram')">Unlink</b-button>
                </div>
              </b-card>
            </b-col>

            <b-col sm="6">
              <b-card class="card-button position-relative" @mouseenter="active(4)">
                <div class="card-button-icon"><i class="fa fa-linkedin-square"></i></div>
                <h5 class="mb-0 text-uppercase text-grey text-center">LinkedIn</h5>
                <div @mouseleave="notActive(4)" id="s-4" class="s-link" v-bind:class="{ active: isActive4 }">
                  <b-button type="button" variant="primary" @click="unlinkSocial('LinkedIn')">Unlink</b-button>
                </div>
              </b-card>
            </b-col>
          </b-row>
          -->
        </b-form-group>
    </b-tab>
  </b-tabs>
</template>

<script>
  import BFormRadio from "bootstrap-vue/src/components/form-radio/form-radio";
  import BRow from "bootstrap-vue/src/components/layout/row";

  export default {
    name: "EditUser",
    components: {BRow, BFormRadio},
    props: ['modalInfo'],

    data() {
      return {
        form: {
          email: '',
          name: '',
          address: '',
          country: null,
          checked: [],
          pwd: '',
        },
        countries: [{ text: 'Select One', value: null },
          "Afghanistan",     "Åland Islands",     "Albania",     "Algeria",     "American Samoa",     "Andorra",     "Angola",     "Anguilla",     "Antarctica",     "Antigua and Barbuda",     "Argentina",     "Armenia",     "Aruba",     "Australia",     "Austria",     "Azerbaijan",     "Bahamas",     "Bahrain",     "Bangladesh",     "Barbados",     "Belarus",     "Belgium",     "Belize",     "Benin",     "Bermuda",     "Bhutan",     "Bolivia (Plurinational State of)",     "Bonaire, Sint Eustatius and Saba",     "Bosnia and Herzegovina",     "Botswana",     "Bouvet Island",     "Brazil",     "British Indian Ocean Territory",     "United States Minor Outlying Islands",     "Virgin Islands (British)",     "Virgin Islands (U.S.)",     "Brunei Darussalam",     "Bulgaria",     "Burkina Faso",     "Burundi",     "Cambodia",     "Cameroon",     "Canada",     "Cabo Verde",     "Cayman Islands",     "Central African Republic",     "Chad",     "Chile",     "China",     "Christmas Island",     "Cocos (Keeling) Islands",     "Colombia",     "Comoros",     "Congo",     "Congo (Democratic Republic of the)",     "Cook Islands",     "Costa Rica",     "Croatia",     "Cuba",     "Curaçao",     "Cyprus",     "Czech Republic",     "Denmark",     "Djibouti",     "Dominica",     "Dominican Republic",     "Ecuador",     "Egypt",     "El Salvador",     "Equatorial Guinea",     "Eritrea",     "Estonia",     "Ethiopia",     "Falkland Islands (Malvinas)",     "Faroe Islands",     "Fiji",     "Finland",     "France",     "French Guiana",     "French Polynesia",     "French Southern Territories",     "Gabon",     "Gambia",     "Georgia",     "Germany",     "Ghana",     "Gibraltar",     "Greece",     "Greenland",     "Grenada",     "Guadeloupe",     "Guam",     "Guatemala",     "Guernsey",     "Guinea",     "Guinea-Bissau",     "Guyana",     "Haiti",     "Heard Island and McDonald Islands",     "Holy See",     "Honduras",     "Hong Kong",     "Hungary",     "Iceland",     "India",     "Indonesia",     "Côte d'Ivoire",     "Iran (Islamic Republic of)",     "Iraq",     "Ireland",     "Isle of Man",     "Israel",     "Italy",     "Jamaica",     "Japan",     "Jersey",     "Jordan",     "Kazakhstan",     "Kenya",     "Kiribati",     "Kuwait",     "Kyrgyzstan",     "Lao People's Democratic Republic",     "Latvia",     "Lebanon",     "Lesotho",     "Liberia",     "Libya",     "Liechtenstein",     "Lithuania",     "Luxembourg",     "Macao",     "Macedonia (the former Yugoslav Republic of)",     "Madagascar",     "Malawi",     "Malaysia",     "Maldives",     "Mali",     "Malta",     "Marshall Islands",     "Martinique",     "Mauritania",     "Mauritius",     "Mayotte",     "Mexico",     "Micronesia (Federated States of)",     "Moldova (Republic of)",     "Monaco",     "Mongolia",     "Montenegro",     "Montserrat",     "Morocco",     "Mozambique",     "Myanmar",     "Namibia",     "Nauru",     "Nepal",     "Netherlands",     "New Caledonia",     "New Zealand",     "Nicaragua",     "Niger",     "Nigeria",     "Niue",     "Norfolk Island",     "Korea (Democratic People's Republic of)",     "Northern Mariana Islands",     "Norway",     "Oman",     "Pakistan",     "Palau",     "Palestine, State of",     "Panama",     "Papua New Guinea",     "Paraguay",     "Peru",     "Philippines",     "Pitcairn",     "Poland",     "Portugal",     "Puerto Rico",     "Qatar",     "Republic of Kosovo",     "Réunion",     "Romania",     "Russian Federation",     "Rwanda",     "Saint Barthélemy",     "Saint Helena, Ascension and Tristan da Cunha",     "Saint Kitts and Nevis",     "Saint Lucia",     "Saint Martin (French part)",     "Saint Pierre and Miquelon",     "Saint Vincent and the Grenadines",     "Samoa",     "San Marino",     "Sao Tome and Principe",     "Saudi Arabia",     "Senegal",     "Serbia",     "Seychelles",     "Sierra Leone",     "Singapore",     "Sint Maarten (Dutch part)",     "Slovakia",     "Slovenia",     "Solomon Islands",     "Somalia",     "South Africa",     "South Georgia and the South Sandwich Islands",     "Korea (Republic of)",     "South Sudan",     "Spain",     "Sri Lanka",     "Sudan",     "Suriname",     "Svalbard and Jan Mayen",     "Swaziland",     "Sweden",     "Switzerland",     "Syrian Arab Republic",     "Taiwan",     "Tajikistan",     "Tanzania, United Republic of",     "Thailand",     "Timor-Leste",     "Togo",     "Tokelau",     "Tonga",     "Trinidad and Tobago",     "Tunisia",     "Turkey",     "Turkmenistan",     "Turks and Caicos Islands",     "Tuvalu",     "Uganda",     "Ukraine",     "United Arab Emirates",     "United Kingdom of Great Britain and Northern Ireland",     "United States of America",     "Uruguay",     "Uzbekistan",     "Vanuatu",     "Venezuela (Bolivarian Republic of)",     "Viet Nam",     "Wallis and Futuna",     "Western Sahara",     "Yemen",     "Zambia",     "Zimbabwe"],
        show: true,
        isActive1: false,
        isActive2: false,
        isActive3: false,
        isActive4: false,
        showByIndex: null,

        social_media : [
          {id: '1', type: 'Facebook', icon: 'fa fa-facebook-square' },
          {id: '2', type: 'Google', icon: 'fa fa-google'},
          {id: '3', type: 'Instagram', icon: 'fa fa-instagram'},
          {id: '4', type: 'LinkedIn', icon: 'fa fa-linkedin-square'}
        ]
      }
    },

    updated(){
      this.form.name = JSON.parse(this.modalInfo.content).name
    },

    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        alert(JSON.stringify(this.form))
      },
      onReset(evt) {
        evt.preventDefault()
        /* Reset our form values */
        this.form.email = ''
        this.form.name = ''
        this.form.address = ''
        this.form.pwd = ''
        this.form.country = null
        this.form.checked = []
        /* Trick to reset/clear native browser form validation state */
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
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

      unlinkSocial(param){
        // Use sweetalert2
        this.$swal({
          title: 'Unlink ' + param,
          text: "Are you sure you want to unlink " +param,
          type: 'question',
          showCancelButton: true,
          confirmButtonText: 'Yes, please!'
        }).then((result) => {
          if (result) {
          }
        })
      },
    }
  }
</script>

<style lang="scss">
  @import "../../assets/scss/variables";

  .s-link{
    background-color: whitesmoke;
    position: absolute;
    z-index: 999;
    height: 100%;
    width: 100%;
    transform: translate(-50%,-50%);
    left: 50%;
    top: 50%;

    button{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 999;
      opacity: 1;
    }
  }

  .s-link.active{
    display: block;
  }
</style>
