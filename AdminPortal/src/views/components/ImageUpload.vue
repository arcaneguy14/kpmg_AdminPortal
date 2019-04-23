<template>
  <div class="avatar-upload">
    <div class="avatar-edit">
      <input type='file' :id="id" @change="previewImage" accept="image/*"/>
      <label :for="id"><i class="fa fa-pencil"></i></label>
    </div>
    <div class="avatar-preview" v-if="!comp_image">
      <img class="imagePreview" :src="comp_image">
    </div>
    <div class="avatar-preview" v-else>
      <img class="imagePreview" :src="comp_image">
    </div>
  </div>
</template>

<script>
    export default {
      name: "ImageUpload",

      props: ['id'],

      data(){
        return{
          comp_image: 'https://increasify.com.au/wp-content/uploads/2016/08/default-image.png'
        }
      },

      methods: {
        previewImage: function(img) {
          // Reference to the DOM input element
          var input = event.target;
          // Ensure that you have a file before attempting to read it
          if (input.files && input.files[0]) {
            // create a new FileReader to read this image and convert to base64 format
            var reader = new FileReader();
            // Define a callback function to run, when FileReader finishes its job
            reader.onload = (e) => {
              // Note: arrow function used here, so that "this.image" refers to the image of Vue component
              // Read image as base64 and set to image
              //if (img === 2)
              this.comp_image = e.target.result;
              this.$emit('image', this.comp_image)
            }
            // Start the reader job - read file as a data url (base64 format)
            reader.readAsDataURL(input.files[0]);
          }
        },
      }
    }
</script>

<style lang="scss">
  .avatar-upload {
    position: relative;
    //max-width: 205px;
    //margin: 50px auto;
    .avatar-edit {
      position: absolute;
      //right: 12px;
      z-index: 1;
      //top: 10px;
      input {
        display: none;
        + label {
          display: inline-block;
          width: 34px;
          height: 34px;
          margin-bottom: 0;
          border-radius: 100%;
          background: #FFFFFF;
          border: 1px solid transparent;
          box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.12);
          cursor: pointer;
          font-weight: normal;
          transition: all .2s ease-in-out;
          position: relative;
          &:hover {
            background: #f1f1f1;
            border-color: #d6d6d6;
          }
          &:after {
            color: #757575;
            position: absolute;
            top: 10px;
            left: 0;
            right: 0;
            text-align: center;
            margin: auto;
          }
          .fa-pencil{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
          }
        }
      }
    }
    .avatar-preview {
      width: 192px;
      height: 192px;
      position: relative;
      //border-radius: 100%;
      border: 6px solid #F8F8F8;
      box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
      > img {
        width: 100%;
        height: 100%;
        //border-radius: 100%;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        object-fit: cover;
      }
    }
  }
</style>
