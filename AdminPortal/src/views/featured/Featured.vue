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
    <b-modal id="addFeatured" size="lg" title="Add to Featured" hide-footer>
      <!-- <pre>{{ modalInfo.content }}</pre> -->
      <AddFeatured :features="features"></AddFeatured>
    </b-modal>
  </b-row>
</template>

<script>
    //import BCard from "bootstrap-vue/src/components/card/card";
    //import BCardFooter from "bootstrap-vue/src/components/card/card-footer";
    import FeaturedComp from "./FeaturedComp";
    import AddFeatured from "./AddFeatured"

    let features = [
      {id: '1', title: 'Deadline', name: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.', category: '3', image: 'https://picsum.photos/400/400/?image=20' },
      {id: '2', title: 'Budget', name: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popul=i=', category: '1', image: 'https://picsum.photos/400/400/?image=20'},
      {id: '3', title: 'Status', name: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in g software like.', category: '2', image: 'https://picsum.photos/400/400/?image=20'}
    ];

    export default {
      name: "Featured",
      components: {FeaturedComp, AddFeatured},

      data(){
        return{
          features: features
        }
      },

      methods: {
        info(item, index, button) {
          this.modalInfo.title = `Row index: ${index}`
          this.modalInfo.content = JSON.stringify(item, null, 2)
          this.$root.$emit('bv::show::modal', 'modalInfo', button)
        },
        add(button) {
          this.$root.$emit('bv::show::modal', 'addFeatured', button)
        },
      }
    }
</script>

<style lang="scss">
.featured-card{
  cursor: pointer;
}
</style>
