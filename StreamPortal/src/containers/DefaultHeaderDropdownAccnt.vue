<template>
  <AppHeaderDropdown right no-caret>
    <template slot="header">
      <img
        src="img/user.png"
        class="img-avatar" />
        <span class="mr-2"><i class="fa fa-caret-down"></i></span>
    </template>
    <template slot="dropdown">
      <b-dropdown-header tag="div" class="text-center"><strong>Account</strong></b-dropdown-header>
      <b-dropdown-item><i class="fa fa-user" /> My Profile</b-dropdown-item>
      <b-dropdown-divider />
      <b-dropdown-item v-on:click="closeNav"><i class="fa fa-lock" /> Logout </b-dropdown-item>
    </template>
  </AppHeaderDropdown>
</template>

<script>
import { HeaderDropdown as AppHeaderDropdown } from '@coreui/vue'
export default {
  name: 'DefaultHeaderDropdownAccnt',
  components: {
    AppHeaderDropdown
  },
  data: () => {
    return { itemsCount: 42 }
  },

  methods: {
    closeNav () {
      //document.querySelector('#login').click();
      this.$store.dispatch('userLogout')
        .then(
          this.$router.push({ name: 'Login' })
        )
    }
  },
}
</script>
