<template>
  <b-row>
    <b-col cols="12">
      <transition name="slide">
        <b-card :header="caption">
          <h5 class="text-grey text-uppercase pb-2">Video Streaming</h5>
<!--           <iframe src="//iframe.dacast.com/b/124934/c/494047" width="590" height="431" frameborder="0" scrolling="no" allow="autoplay" allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe> -->
          <div id="myDiv"></div>
        </b-card>
      </transition>
    </b-col>
  </b-row>
</template>

<script>
  addEventListener("load", function(){
    var CONTENT_ID = "124934_c_494047"
    var myPlayer = dacast(CONTENT_ID, 'myDiv', {
      width: 800,
      height: 600
    });
  });
    export default {
        name: "EventHome",
    }
</script>

<style scoped>

</style>
