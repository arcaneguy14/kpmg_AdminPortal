<template>
  <b-row>
    <b-col>
      <b-row>
        <b-col>
          <p>Personal Information Consent</p>
        </b-col>
        <b-col>
          <p>Yes</p>
        </b-col>
      </b-row>
      <h3>Income</h3>
      <b-row>
        <b-col>
          <p><b>Estimated Gross Annual Income</b></p>
        </b-col>
        <b-col>
          <p>RM {{JSON.parse(taxInfo.content).summary.gross}}</p>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <p><b>Estimated Rental Income</b></p>
        </b-col>
        <b-col>
          <p>RM {{JSON.parse(taxInfo.content).summary.family}}</p>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <p>Marital Status</p>
        </b-col>
        <b-col>
          <p>Single</p>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <p>Children</p>
        </b-col>
        <b-col>
          <p>3</p>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <p>Children attending higher education</p>
        </b-col>
        <b-col>
          <p>1</p>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <p>Disabled family members</p>
        </b-col>
        <b-col>
          <p>0</p>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <p>Provide for parents?</p>
        </b-col>
        <b-col>
          <p>Yes</p>
        </b-col>
      </b-row>
      <hr/>
      <h3>Tax Deduction</h3>
      <b-row>
        <b-col>
          <p>Pay for own education?</p>
        </b-col>
        <b-col>
          <p>Yes</p>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <p>Annual education insurance premium</p>
        </b-col>
        <b-col>
          <p>1000</p>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <p>SSPN Contribution</p>
        </b-col>
        <b-col>
          <p>1200</p>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <p>Life Insurance Premium</p>
        </b-col>
        <b-col>
          <p>2500</p>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <p>Medical Insurance Premium</p>
        </b-col>
        <b-col>
          <p>1100</p>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <p>PRS Contribution</p>
        </b-col>
        <b-col>
          <p>3000</p>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
  export default {
    name: "TaxInputDetail",

    props: ['taxInfo']
  }
</script>

<style scoped>

</style>
