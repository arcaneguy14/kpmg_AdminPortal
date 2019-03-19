<template>
  <div class="app flex-row align-items-center" id="kpmg-login">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="8">
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
                <b-form>
                  <div class="show-mobile text-center">
                    <img src="img/logo.svg" height="150"/>
                    <h1 class="font-weight-bold" style="color: #fff; -webkit-text-stroke-width: 1px; -webkit-text-stroke-color: #0B2D65;"><u>Admin Portal</u></h1>
                  </div>
                  <h1>Login</h1>
                  <p class="text-muted">Login with your account</p>
                  <b-input-group class="mb-3">
                    <b-input-group-prepend><b-input-group-text style="width: 35px;"><i class="fa fa-user"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input type="text" class="form-control" placeholder="Username" autocomplete="username email" />
                  </b-input-group>
                  <b-input-group class="mb-4">
                    <b-input-group-prepend><b-input-group-text style="width: 35px;"><i class="fa fa-lock"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input type="password" class="form-control" placeholder="Password" autocomplete="current-password" />
                  </b-input-group>
                  <b-row>
                    <b-col cols="12">
                      <b-button block variant="primary" class="px-4" v-on:click="userLogin()">Login</b-button>
                    </b-col>
                  </b-row>
                </b-form>
              </b-card-body>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  methods: {
    userLogin(){
    this.$router.replace({ name: "Kpmg Home" });
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
</style>
