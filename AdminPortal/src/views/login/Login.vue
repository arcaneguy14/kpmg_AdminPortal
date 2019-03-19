<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="8">
          <b-card-group>
            <b-card no-body class="py-5" style="width:44%; border: 2px solid #0B2D65;">
              <b-card-body class="text-center">
                <b-row class="justify-content-center">
                  <img src="img/logo.png" height="150"/>
                  <h1 class="font-weight-bold" style="color: #fff; -webkit-text-stroke-width: 1px; -webkit-text-stroke-color: #0B2D65;"><u>Admin Portal</u></h1>
                </b-row>
              </b-card-body>
            </b-card>
            <b-card no-body class="p-4" style="width:44%; border: 2px solid #0B2D65;">
              <b-card-body>
                <b-form>
                  <h1>Login</h1>
                  <p class="text-muted">Login In with your account</p>
                  <b-input-group class="mb-3">
                    <b-input-group-prepend><b-input-group-text><i class="icon-user"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input type="text" class="form-control" placeholder="Username" autocomplete="username email" />
                  </b-input-group>
                  <b-input-group class="mb-4">
                    <b-input-group-prepend><b-input-group-text><i class="icon-lock"></i></b-input-group-text></b-input-group-prepend>
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
