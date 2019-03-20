<template>
  <b-row>
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
  methods: {

  }
}
</script>

