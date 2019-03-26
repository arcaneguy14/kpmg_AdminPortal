<template>
  <b-row>
    <b-col>
      <b-card class="featured-card" v-for="feature in features" :key="feature.name" @mouseover="showByIndex = feature.id"
              @mouseleave="showByIndex = null" :class="{ active: hover }">
        <b-row>
          <b-col md="4">
            <b-card-body>
              <b-card-img :src="feature.image" class="rounded-0" />
            </b-card-body>
          </b-col>
          <b-col md="8">
            <b-card-body :title="feature.label">
              <b-card-text>
                {{feature.name}}
              </b-card-text>
            </b-card-body>
          </b-col>
        </b-row>
        <div slot="footer">
          <small class="text-muted">Posted by: Anon</small>
          <small> | </small>
          <small class="text-muted">Created On: 26/3/2019</small>
        </div>
        <transition name="fade">
        <div class="s-link" v-if="showByIndex == feature.id">
          <b-button type="button" variant="primary" @click="removeFeatured(feature.label)">Remove from Featured</b-button>
        </div>
        </transition>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
    export default {
        name: "FeaturedComp",

      props: ['features'],

      data(){
        return{
          hover: false,
          showByIndex : null
        }
      },

      methods: {
        removeFeatured(param){
          // Use sweetalert2
          this.$swal({
            title: 'Remove Featured Content',
            text: "Are you sure you want to remove " +param+ " from Featured?",
            type: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, please!'
          }).then((result) => {
            if (result) {
            }
          })
        }
      }
    }
</script>

<style scoped>
</style>
