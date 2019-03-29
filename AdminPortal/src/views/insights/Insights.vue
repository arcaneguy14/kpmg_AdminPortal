<template>
    <div>
      <text-editor>
        <!-- Add custom button(sponsor button) here if required ...to be uncommented when required
        <template v-slot:customButton>
          <span class="ql-formats">
              <button class="ql-customControl" style="width: 100px; text-align: left; display: contents;"><i class="fa fa-building"></i> Add Sponsor</button>
          </span>
        </template>
        -->
      </text-editor>
    </div>
</template>

<script>
  import TextEditor from '../components/TextEditor'

    export default {
        name: "Insights",
      components: {TextEditor},
      'text-editor': TextEditor
    }
</script>

<style scoped>

</style>
