<template>
  <b-row>
    <b-col cols="12">
      <transition name="slide">
        <b-card :header="caption">

        </b-card>
      </transition>
    </b-col>
    <b-col cols="12">
      <b-card>
        <vue-editor ></vue-editor>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import { VueEditor } from 'vue2-quill-editor';

export default {
  components: {
      VueEditor
   },

  data: () => {
    return {
    }
  },
  computed: {
  },
  methods: {
  }
}
</script>

