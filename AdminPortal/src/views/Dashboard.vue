<template>
  <b-row>
    <b-col cols="12" xl="12">
      <transition name="slide">
        <b-card>
          <TimeChart chartId="main-chart-01" class="chart-wrapper" style="height:300px;margin-top:40px;" height="300"></TimeChart>

        </b-card>
      </transition>
    </b-col>
    <b-col sm="6" lg="3">
      <b-card>
        <b-card-body class="pb-0">
          <b-dropdown class="float-right" variant="transparent p-0" right>
            <template slot="button-content">
              <i class="icon-settings"></i>
            </template>
            <b-dropdown-item>Action</b-dropdown-item>
            <b-dropdown-item>Another action</b-dropdown-item>
            <b-dropdown-item>Something else here...</b-dropdown-item>
            <b-dropdown-item disabled>Disabled action</b-dropdown-item>
          </b-dropdown>
          <div class="img-dashboard"><img src="img/team.svg" width="100px"></div>
          <h2 class="mb-0">9.823</h2>
          <p class="text-grey">Total Participants</p>
        </b-card-body>
      </b-card>
    </b-col>
    <b-col sm="6" lg="3">
      <b-card>
        <b-card-body class="pb-0">
          <b-dropdown class="float-right" variant="transparent p-0" right>
            <template slot="button-content">
              <i class="icon-settings"></i>
            </template>
            <b-dropdown-item>Action</b-dropdown-item>
            <b-dropdown-item>Another action</b-dropdown-item>
            <b-dropdown-item>Something else here...</b-dropdown-item>
            <b-dropdown-item disabled>Disabled action</b-dropdown-item>
          </b-dropdown>
          <div class="img-dashboard"><img src="img/placeholder.svg"/></div>
          <h2 class="mb-0">9.823</h2>
          <p class="text-grey">Total Check-In</p>
        </b-card-body>
      </b-card>
    </b-col>
    <b-col sm="6" lg="3">
      <b-card>
        <b-card-body class="pb-0">
          <b-dropdown class="float-right" variant="transparent p-0" right>
            <template slot="button-content">
              <i class="icon-settings"></i>
            </template>
            <b-dropdown-item>Action</b-dropdown-item>
            <b-dropdown-item>Another action</b-dropdown-item>
            <b-dropdown-item>Something else here...</b-dropdown-item>
            <b-dropdown-item disabled>Disabled action</b-dropdown-item>
          </b-dropdown>
          <div class="img-dashboard"><img src="img/video-player.svg"/></div>
          <h2 class="mb-0">9.823</h2>
          <p class="text-grey">Number of Active Video Streams</p>
        </b-card-body>
      </b-card>
    </b-col>
    <b-col sm="6" lg="3">
      <b-card>
        <b-card-body class="pb-0">
          <b-dropdown class="float-right" variant="transparent p-0" right>
            <template slot="button-content">
              <i class="icon-settings"></i>
            </template>
            <b-dropdown-item>Action</b-dropdown-item>
            <b-dropdown-item>Another action</b-dropdown-item>
            <b-dropdown-item>Something else here...</b-dropdown-item>
            <b-dropdown-item disabled>Disabled action</b-dropdown-item>
          </b-dropdown>
          <div class="img-dashboard"><img src="img/user-online.svg" /></div>
          <h2 class="mb-0">9.823</h2>
          <p class="text-grey">Currently Online</p>
        </b-card-body>
      </b-card>
    </b-col>

    <b-col sm="6" lg="4">
      <b-card>
        <h5 class="text-grey text-uppercase pb-2">Sponsor Post</h5>
        <div class="list-group">
          <div class="pb-4">

            <div class="d-flex w-100 justify-content-between">
              <h6 class="mb-1 text-grey text-uppercase">Sage 42 Apps Sdn Bhd</h6>
              <small class="text-grey">3 days ago</small>
            </div>
            <p class="mb-1">
              Donec id elit non mi porta gravida at eget metus. Maecenas
              sed diam eget risus varius blandit.
            </p>

            <div class="social-view">
              <small>
                <span><i class="fa fa-eye"></i> 5</span>
                <span><i class="fa fa-heart"></i> 5</span>
                <span><i class="fa fa-comment"></i> 5</span>
              </small>
            </div>
          </div>

        </div>
        <div class="list-group">
          <div class="pb-4">

            <div class="d-flex w-100 justify-content-between">
              <h6 class="mb-1 text-grey text-uppercase">Sage 42 Apps Sdn Bhd</h6>
              <small class="text-grey">3 days ago</small>
            </div>
            <p class="mb-1">
              Donec id elit non mi porta gravida at eget metus. Maecenas
              sed diam eget risus varius blandit.
            </p>

            <div class="social-view">
              <small>
                <span><i class="fa fa-eye"></i> 5</span>
                <span><i class="fa fa-heart"></i> 5</span>
                <span><i class="fa fa-comment"></i> 5</span>
              </small>
            </div>
          </div>

        </div>
        <div class="list-group">
          <div class="pb-4">

            <div class="d-flex w-100 justify-content-between">
              <h6 class="mb-1 text-grey text-uppercase">Sage 42 Apps Sdn Bhd</h6>
              <small class="text-grey">3 days ago</small>
            </div>
            <p class="mb-1">
              Donec id elit non mi porta gravida at eget metus. Maecenas
              sed diam eget risus varius blandit.
            </p>

            <div class="social-view">
              <small>
                <span><i class="fa fa-eye"></i> 5</span>
                <span><i class="fa fa-heart"></i> 5</span>
                <span><i class="fa fa-comment"></i> 5</span>
              </small>
            </div>
          </div>

        </div>
      </b-card>
    </b-col>
    <b-col sm="6" lg="2">
      <b-card class="card-button">
        <div class="card-button-icon"><i class="fa fa-envelope"></i></div>
        <h5 class="mb-0 text-uppercase text-grey text-center">News Feed</h5>
      </b-card>
      <b-card class="card-button">
        <div class="card-button-icon"><i class="fa fa-bell"></i></div>
        <h5 class="mb-0 text-uppercase text-grey text-center">Notify</h5>
      </b-card>
      <b-card class="card-button">
        <div class="card-button-icon"><i class="fa fa-window-close"></i></div>
        <h5 class="mb-0 text-uppercase text-grey text-center">Close Event</h5>
      </b-card>
    </b-col>
    <b-col sm="12" lg="6">
      <b-card class="event-loc">
        <h5 class="text-grey text-uppercase pb-2">Event Location</h5>
        <img src="img/mapTemp.png" />
      </b-card>
    </b-col>
  </b-row>
</template>

<script>

  import TimeChart from './chart/TimeChart'

    export default {
        name: "Dashboard",

      components: {
        TimeChart
      }
    }
</script>

<style lang="scss">
  @import "../assets/scss/variables";

.img-dashboard{
  width: 100px;
  height: 100px;
  background: #84DBFF;
  border-radius: 50%;
  position: relative;
  margin: 0 auto;
  margin-bottom: 20px;

  img{
    position: absolute;
    padding: 20px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100px;
  }
}

  .social-view{
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;

    small{
      color: $grey;

      span{
        padding: 8px 12px;
        border: 1px solid $grey;
        border-radius: 6px;
        margin: 5px;
        font-size: 0.875rem;
        cursor: pointer;
      }

      span:hover{
        color: $kpmghoverblue;
        border-color: $kpmghoverblue;
      }
    }
  }



  .event-loc {
    img{
      width: 100%;
    }
  }
</style>
