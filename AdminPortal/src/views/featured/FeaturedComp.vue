<template>
  <b-row>
    <b-col>
      <b-row>
        <b-col sm="2">
          <b-form-group>
            <b-form-select v-model="selected" :options="options" />
          </b-form-group>
        </b-col>
        <b-col sm="8">
          <b-form-group>
            <b-form-input type="text" placeholder="Search Title"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col sm="2" class="d-flex justify-content-end">
          <b-form-group>
            <b-button variant="primary"><i class="fa fa-search"></i> Search</b-button>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
          <b-col md="6" class="my-1 d-flex">
            <b-form-group>
              <b-button variant="primary" @click="add($event.target)"><i class="fa fa-newspaper-o"></i> Add Article as Featured</b-button>
            </b-form-group>
          </b-col>
      </b-row>

      <b-row>

        <!--
        <b-col sm="6">
          <b-list-group v-for="(feature, index) in filterPage" @mouseover="showByIndex = feature.id"
                        @mouseleave="showByIndex = null" :class="{ active: hover }">
            <b-list-group-item href="#" class="flex-column align-items-start">
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">{{feature.title}}</h5>
                <small>3 days ago</small>
              </div>

              <p class="mb-1">
                {{feature.name}}
              </p>

              <small>Category: {{options[feature.category].text}} | Posted By: Anon</small>
            </b-list-group-item>
          </b-list-group>
        </b-col>
        -->
        <SortableList lockAxis="y" v-model="featured">
          <SortableItem v-for="(feature, index) in filterPage" :index="index" :key="feature.id" :item="feature"/>
        </SortableList>

        <!--
        <b-col sm="12" v-for="feature in filterPage" :key="feature.id">
          <b-card class="featured-card card-button" @mouseover="showByIndex = feature.id"
                  @mouseleave="showByIndex = null" :class="{ active: hover }">
            <b-row>
              <b-col md="4">
                <b-card-body>
                  <b-img sm thumbnail fluid :src="feature.image" class="rounded-0" />
                </b-card-body>
              </b-col>
              <b-col md="8">
                <b-card-body :title="feature.title">
                  <b-card-text>
                    {{feature.name}}
                  </b-card-text>
                </b-card-body>
              </b-col>
            </b-row>
            <div slot="footer">
              <b-row>
                <b-col md="6">
                  <small class="text-muted">Posted by: Anon</small>
                  <small> | </small>
                  <small class="text-muted">Created On: 26/3/2019</small>
                </b-col>
                <b-col md="6" class="text-right">
                  <small class="text-muted">Category: {{options[feature.category].text}}</small>
                </b-col>
              </b-row>
            </div>
            <transition name="fade">
              <div class="s-link" v-if="showByIndex == feature.id">
                <b-button type="button" variant="primary" @click="removeFeatured(feature.title)">Remove from Featured</b-button>
              </div>
            </transition>
          </b-card>
        </b-col>
        -->
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
    //import BRow from "bootstrap-vue/src/components/layout/row";
    import {ContainerMixin, ElementMixin} from 'vue-slicksort';

    const SortableList = {
      mixins: [ContainerMixin],
      template: `
<b-col sm="12">
<slot />
</b-col>
  `,
    };

    const SortableItem = {
      mixins: [ElementMixin],
      props: ['item'],
      template: `
    <!-- <b-card class="featured-card card-button">{{item.id}}</b-card> -->


          <b-list-group @mouseover="showByIndex = item.id"
                  @mouseleave="showByIndex = null" :class="{ active: hover }">
            <b-list-group-item href="#" class="flex-column align-items-start">
            <transition name="fade">
              <div class="s-link" v-if="showByIndex == item.id">
                <b-button type="button" variant="primary" @click="removeFeatured(item.title)">Remove from Featured</b-button>
              </div>
            </transition>
                <div class="d-flex w-100 justify-content-between">
                  <h5 class="mb-1">{{item.title}}</h5>
                  <small>3 days ago</small>
                </div>

                <p class="mb-1">
                  {{item.name}}
                </p>

                <small>Category: {{options[item.category].text}} | Posted By: Anon</small>
              </b-list-group-item>
          </b-list-group>



  `,

      data(){
        return{
          hover: false,
          showByIndex: null,
          options: [
            { value: null,text: 'Select Category' },
            { value: '1', text: 'Insights' },
            { value: '2', text: 'Services' },
            { value: '3', text: 'Industries' },
          ],
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
        },
      }
    };

    export default {
        name: "FeaturedComp",
      components: {
        SortableItem,
        SortableList,
      },
      props: ['features'],

      data(){
        return{
          hover: false,
          showByIndex : null,
          selected: null,
          options: [
            { value: null,text: 'Select Category' },
            { value: '1', text: 'Insights' },
            { value: '2', text: 'Services' },
            { value: '3', text: 'Industries' },
          ],
          featured: this.features,
          items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8'],

        }
      },

      computed: {
        filterPage() {
          if (this.selected != null)
            return this.featured.filter((item) => item.category == this.selected)

          else
            return this.featured
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

<style scoped>
</style>
