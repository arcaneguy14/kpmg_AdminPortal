<template>
<b-row>
  <b-col>
    <b-card>
      <b-row>
        <b-col>
          <h5 class="mb-3 text-uppercase text-grey">CMS</h5>
        </b-col>
      </b-row>
      <b-row class="mb-3">
        <b-col>
          <b-form-select v-model="selected" :options="cms_options"></b-form-select>
        </b-col>
      </b-row>
      <transition name="fade">
        <insights v-if="selected==1"></insights>
        <services v-if="selected==2"></services>
        <industries v-if="selected==3"></industries>
        <about v-if="selected==4"></about>
        <career v-if="selected==5"></career>
        <event v-if="selected==6"></event>
      </transition>
    </b-card>
  </b-col>
</b-row>
</template>

<script>
  import Insights from './insights/Insights'
  import Services from './services/Services'
  import Industries from './industries/Industries'
  import About from './about/About'
  import Career from './career/Career'
  import Event from './event/Event'


  export default {
      name: "CMS",

      components: {
        'insights' : Insights,
        'services' : Services,
        'industries' : Industries,
        'about' : About,
        'career' : Career,
        'event' : Event
      },

      data(){
          return{
            selected: 1,
            cms_options: [
              { value: 1, text: 'Insights' },
              { value: 2, text: 'Services' },
              { value: 3, text: 'Industries' },
              { value: 4, text: 'About' },
              { value: 5, text: 'Careers' },
              { value: 6, text: 'Events' },
            ]
          }
      }
    }
</script>

<style scoped>

</style>
