<template>
  <div class="app flex-row align-items-center" id="kpmg-login">
    <div class="container">
      <transition name="fade">
        <div class="spinner-container" v-if="loading">
          <HollowDotsSpinner
            :animation-duration="1000"
            :size="60"
            :color="'#00519A'"
            class="spinner"
          />
        </div>
      </transition>
      <b-row class="justify-content-center">
        <b-col md="8">

          <transition appear name="slide-fade">
            <b-card-group>
              <b-card no-body class="py-5 hide-mobile">
                <b-card-body class="text-center">
                  <b-row class="justify-content-center">
                    <img src="img/logo.svg" height="150"/>
                    <h1 class="font-weight-bold" style="color: #fff; -webkit-text-stroke-width: 1px; -webkit-text-stroke-color: #0B2D65;"><u>Admin Portal</u></h1>
                  </b-row>
                </b-card-body>
              </b-card>
              <b-card no-body class="p-4">
                <b-card-body>
                  <b-form action="#" @submit.prevent="validateBeforeSubmit">
                    <div class="show-mobile text-center">
                      <img src="img/logo.svg" height="150"/>
                      <h1 class="font-weight-bold" style="color: #fff; -webkit-text-stroke-width: 1px; -webkit-text-stroke-color: #0B2D65;"><u>Admin Portal</u></h1>
                    </div>
                    <h1>Login</h1>
                    <p class="text-muted">Login with your account</p>
                    <div v-if="error" class="form-error">{{ error }}</div>
                    <span class="form-error">{{ errors.first('username') }}</span>
                    <b-input-group class="mb-3">
                      <b-input-group-prepend><b-input-group-text style="width: 35px;"><i class="fa fa-user"></i></b-input-group-text></b-input-group-prepend>
                      <b-form-input type="text" class="form-control" name="username" id="username" v-model="username" placeholder="Username" autocomplete="username email" :class="{ 'input-error': errors.has('username') }" v-validate="'required'" />
                    </b-input-group>

                    <span class="form-error">{{ errors.first('password') }}</span>
                    <b-input-group class="mb-4">
                      <b-input-group-prepend><b-input-group-text style="width: 35px;"><i class="fa fa-lock"></i></b-input-group-text></b-input-group-prepend>
                      <b-form-input type="password" class="form-control" name="password" id="password" v-model="password" placeholder="Password" autocomplete="current-password" :class="{ 'input-error': errors.has('password') }" v-validate="'required'" />
                    </b-input-group>
                    <b-row>
                      <b-col cols="12">
                        <b-button type="submit" block variant="primary" class="px-4">Login   <b-spinner v-if="loading" variant="light" label="Spinning" small></b-spinner></b-button>
                      </b-col>
                    </b-row>
                  </b-form>
                </b-card-body>
              </b-card>
            </b-card-group>
          </transition>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
  import {HollowDotsSpinner  } from 'epic-spinners'

  export default {
  name: 'Login',
  data() {
    return {
      username: "",
      password: "",
      error: "",
      loading: false,
    }
  },

    components: {
      HollowDotsSpinner
    },

  methods: {
    userLogin(){

      this.loading = true
      this.$store.dispatch("userLogin", {
          username: this.username,
          password: this.password
        })
        .then(response => {
          if (response.data.respcode === 0)
          {
            this.$router.replace({ name: "Users" });
          }

          if (response.data.respcode === 16)
          {
            this.loading = false
            this.error = "Incorrect Login Credentials!"
          }
        })
        .catch(error => {
          this.loading = false
        });
    },

    validateBeforeSubmit() {
      this.$validator.validateAll().then(result => {
        if (result) {
          // eslint-disable-next-line
          this.userLogin();
        }
      });
    }
  }
}
</script>

<style lang="scss">

  #kpmg-login img{
    width: 200px;
    object-fit: contain;
    padding: 1.25rem;
  }

  #kpmg-login.app{
    //background: linear-gradient(to bottom, #b8c6df 0%, #6d88b7 100%);

    background: -moz-linear-gradient(45deg, rgba(11,45,101,1) 0%, rgba(0,128,128,1) 100%); /* ff3.6+ */
    background: -webkit-gradient(linear, left bottom, right top, color-stop(0%, rgba(11,45,101,1)), color-stop(100%, rgba(0,128,128,1))); /* safari4+,chrome */
    background: -webkit-linear-gradient(45deg, rgba(11,45,101,1) 0%, rgba(0,128,128,1) 100%); /* safari5.1+,chrome10+ */
    background: -o-linear-gradient(45deg, rgba(11,45,101,1) 0%, rgba(0,128,128,1) 100%); /* opera 11.10+ */
    background: -ms-linear-gradient(45deg, rgba(11,45,101,1) 0%, rgba(0,128,128,1) 100%); /* ie10+ */
    background: linear-gradient(45deg, rgba(11,45,101,1) 0%, rgba(0,128,128,1) 100%); /* w3c */
  }

  .show-mobile{
    display: none;
  }

  @media only screen and (max-width: 768px) {
    /* For mobile phones: */
    .show-mobile{
      display: block;
    }

    .hide-mobile{
      display: none;
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }



  .slide-fade-enter-active {
    transition: all 1s ease;
  }
  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active below version 2.1.8 */ {
    transform: translateX(20px);
    opacity: 0;
  }
</style>
