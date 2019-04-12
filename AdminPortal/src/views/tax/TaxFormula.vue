<template>
  <b-form id="modalInfo">
    <b-form-group label="Update Tax Rate (%):" label-cols-sm="5"
                  label-cols-lg="4">
      <b-form-input type="number" min="0" max="20" step="0.5" placeholder="Insert Percentage Here"></b-form-input>
    </b-form-group>
    <b-form-group label="Income Range (RM):" label-cols-sm="5"
                  label-cols-lg="4">
      <b-form-input type="number" placeholder="Insert Income"></b-form-input>
    </b-form-group>
    <b-button type="submit" variant="primary" class="mr-1">Update</b-button>
  </b-form>
</template>

<script>
    export default {
        name: "TaxFormula"
    }
</script>

<style scoped>

</style>
