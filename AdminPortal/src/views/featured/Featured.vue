<template>
  <b-row>
    <b-col cols="12">
      <transition name="slide">
        <b-card>
          <h5 class="mb-3 text-uppercase text-grey">Featured</h5>
          <FeaturedComp :features="features">
           <!--
            <template v-slot:image><b-card-img src="https://picsum.photos/400/400/?image=20" class="rounded-0" /></template>
            -->
          </FeaturedComp>
        </b-card>
      </transition>
    </b-col>
  </b-row>
</template>

<script>
    import BCard from "bootstrap-vue/src/components/card/card";
    import BCardFooter from "bootstrap-vue/src/components/card/card-footer";
    import FeaturedComp from "./FeaturedComp";

    let features = [
      {id: '1', width: '33%', label: 'Deadline', name: 'deadline', image: 'https://picsum.photos/400/400/?image=20' },
      {id: '2', width: '33%', label: 'Budget', name: 'budget', image: 'https://picsum.photos/400/400/?image=20'},
      {id: '3', width: '33%', label: 'Status', name: 'status', image: 'https://picsum.photos/400/400/?image=20'}
    ];

    export default {
      name: "Featured",
      components: {BCardFooter, BCard, FeaturedComp},

      data(){
        return{
          features: features
        }
      }
    }
</script>

<style lang="scss">
.featured-card{
  cursor: pointer;
}

.s-link{
  display: block;
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
</style>
