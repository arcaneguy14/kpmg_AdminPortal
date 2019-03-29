<template>
  <b-row>
    <b-col>
        <div id="toolbar">
    <span class="ql-formats">
      <select class="ql-size"></select>
    </span>
          <span class="ql-formats">
      <button class="ql-bold"></button>
      <button class="ql-italic"></button>
      <button class="ql-underline"></button>
      <button class="ql-strike"></button>
    </span>
          <span class="ql-formats">
      <select class="ql-color"></select>
      <select class="ql-background"></select>
    </span>
          <span class="ql-formats">
      <button class="ql-header" value="1"></button>
      <button class="ql-header" value="2"></button>
      <button class="ql-blockquote"></button>
      <button class="ql-code-block"></button>
    </span>
          <span class="ql-formats">
      <button class="ql-list" value="ordered"></button>
      <button class="ql-list" value="bullet"></button>
      <button class="ql-indent" value="-1"></button>
      <button class="ql-indent" value="+1"></button>
    </span>
          <span class="ql-formats">
      <button class="ql-direction" value="rtl"></button>
      <select class="ql-align"></select>
    </span>
          <span class="ql-formats">
      <button class="ql-link"></button>
      <button class="ql-image"></button>
      <button class="ql-video"></button>
      <button class="ql-formula"></button>
    </span>
          <span class="ql-formats">
      <button class="ql-clean"></button>
    </span>
          <slot name="customButton">
            <!--
            <span class="ql-formats">
              <button class="ql-customControl" style="width: 100px; text-align: left; display: contents;"><i class="fa fa-building"></i> Add Sponsor</button>
            </span>
            -->

            <!-- Add custom button(sponsor button) below on the place where this component is required ...to be uncommented when required
            <template v-slot:customButton>
              <span class="ql-formats">
                  <button class="ql-customControl" style="width: 100px; text-align: left; display: contents;"><i class="fa fa-building"></i> Add Sponsor</button>
              </span>
            </template>
            -->
          </slot>
        </div>
        <div id="editor" v-model="content">
        </div>
        <b-button variant="primary" @click="handleSavingContent" class="mt-3">Save</b-button>
       <!-- <text-editor :editorToolbar="toolbarOpts.modules.toolbar.container"></text-editor> -->
    </b-col>
  </b-row>
</template>

<script>
  //import { VueEditor, Quill  } from 'vue2-editor'
  import Quill from 'quill'
  import BButton from "bootstrap-vue/src/components/button/button";
  /*
  const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],

    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction

    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'align': [] }],

    ['clean'],
    ['customControl']
  ];
*/
    export default {
      name: "TextEditor",
      components: {BButton},
      data(){
        return{
         content: ""
        }
      },
      mounted () {
        this.initQuill()
      },
      beforeDestroy () {
        this.quill = null
        delete this.quill
      },
      methods: {
        initQuill () {
          const quill = new Quill('#editor', {
            theme: 'snow',
            modules: {
              toolbar: {
                container: '#toolbar',
                handlers: {
                  'customControl': () => {
                    console.log('customControl was clicked')
                    this.quill.insertText(this.quill.getSelection(true).index, "<sponsorhere/>");
                  }
                }
              }
            }
          })
          this.quill = quill
        },

        handleSavingContent: function() {
          // You have the content to save
          const html = document.querySelector('#editor').children[0].innerHTML
          console.log(html)
        }
      },

    }
</script>

<style scoped>
  #editor {
    height: 375px;
  }
</style>
