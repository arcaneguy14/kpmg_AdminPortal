<template>
  <div>
        <div ref="toolbar">
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
        <div class="editor" ref="editor" v-html="content">
        </div>
        <!-- <b-button variant="primary" @click="handleSavingContent" class="mt-3">Save</b-button> -->
       <!-- <text-editor :editorToolbar="toolbarOpts.modules.toolbar.container"></text-editor> -->
  </div>
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
      props: {
        value: {
          type: String,
          default: ''
        },
        isEditing: {
          type: Boolean,
          default: ''
        }
      },
      data(){
        return{
          content: '',
          editor: null,
        }
      },
      mounted () {
        this.initQuill()
      },
      watch: {
        isEditing: function(newVal, oldVal) { // watch it
          if (newVal == false){
            this.editor.enable(false);
            //console.log('Prop changed: ', newVal, ' | was: ', oldVal)
          }

          else{
            this.editor.enable(true);
          }
        }
      },
      beforeDestroy () {
        this.quill = null
        delete this.quill
      },
      methods: {
        initQuill () {
          this.editor = new Quill(this.$refs.editor, {
            theme: 'snow',
            modules: {
              toolbar: {
                container: this.$refs.toolbar,
                handlers: {
                  'customControl': () => {
                    console.log('customControl was clicked')
                    this.quill.insertText(this.quill.getSelection(true).index, "<sponsorhere/>");
                  }
                }
              }
            }
          })
          //this.quill = quill
          this.editor.root.innerHTML = this.value;

          this.editor.on('text-change', () => this.update());
          if (this.isEditing === false){
            this.editor.enable(false);
          }
        },

        update() {
          this.$emit('input', this.editor.getText() ? this.editor.root.innerHTML : '');
        }
      },

    }
</script>

<style scoped>
  .editor {
    height: 275px;
  }

  .ql-disabled{
    background: grey;
    opacity: .6;
  }
</style>
