<template>
  <div class="app">
    <AppHeader fixed>
      <SidebarToggler class="d-lg-none" display="md" mobile />
      <a class="navbar-brand" href="#">
        <img class="navbar-brand-full" src="img/logo.svg" width="110" height="65" alt="KPMG Logo">
        <img class="navbar-brand-minimized" src="img/logo.svg" width="70" height="60" alt="KPMG Logo">
      </a>
      <SidebarToggler class="d-md-down-none" display="lg" />
      <b-navbar-nav class=" ml-auto">
        <DefaultHeaderDropdownAccnt/>
      </b-navbar-nav>
    </AppHeader>
    <div class="app-body">
      <AppSidebar fixed>
        <SidebarHeader/>
        <SidebarForm/>
        <SidebarNav :navItems="nav"></SidebarNav>
        <SidebarFooter/>
      </AppSidebar>
      <main class="main">
        <Breadcrumb :list="list"/>
        <div class="container-fluid">
          <router-view></router-view>
        </div>
      </main>
      <AppAside fixed>
        <!--aside-->
        <DefaultAside/>
      </AppAside>
    </div>
    <TheFooter>
      <!--footer-->
      <div class="ml-auto">
        <a href="#"><img src="img/sage.jpeg" width="60" height="25" alt="SAGE42 Logo" class="footer-logo"/> </a>
        <span class="ml-1">&copy; 2019 Sage42 </span>
      </div>
    </TheFooter>
  </div>
</template>

<script>
import nav from '@/nav/nav'
import { Header as AppHeader, SidebarToggler, Sidebar as AppSidebar, SidebarFooter, SidebarForm, SidebarHeader, SidebarMinimizer, SidebarNav, Aside as AppAside, AsideToggler, Footer as TheFooter, Breadcrumb } from '@coreui/vue'
import DefaultAside from './DefaultAside'
import DefaultHeaderDropdownAccnt from './DefaultHeaderDropdownAccnt'

export default {
  name: 'DefaultContainer',
  components: {
    AsideToggler,
    AppHeader,
    AppSidebar,
    AppAside,
    TheFooter,
    Breadcrumb,
    DefaultAside,
    DefaultHeaderDropdownAccnt,
    SidebarForm,
    SidebarFooter,
    SidebarToggler,
    SidebarHeader,
    SidebarNav,
    SidebarMinimizer
  },
  data () {
    return {
      nav: nav.items
    }
  },
  computed: {
    name () {
      return this.$route.name
    },
    list () {
      return this.$route.matched.filter((route) => route.name || route.meta.label )
    }
  }
}
</script>

<style lang="scss">
  @import "../assets/scss/variables";

  .navbar-brand{
    img{
      width: 100px;
      object-fit: contain;
    }
  }

  .text-grey{
    color: $grey;
  }

  .kpmg-table{
    td{
      vertical-align: middle;
    }

    .table-social{

      span{
        border-radius: 6px;
        margin-right: 5px;
        font-size: 1.875rem;
        cursor: pointer;
      }
    }

    .table-action{
      color: $grey;

      span{
        //padding: 8px 12px;
        //border: 1px solid $grey;
        border-radius: 6px;
        margin-right: 5px;
        font-size: 1.875rem;
        color: $kpmgblue;
        cursor: pointer;
      }

      span:hover{
        color: $kpmghoverblue;
        border-color: $kpmghoverblue;
      }
    }
  }
</style>
