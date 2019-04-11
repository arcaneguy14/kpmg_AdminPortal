<template>
    <b-row>
      <b-col>
        <b-row>
          <b-col>
            <p><b>Income Before Deduction</b></p>
          </b-col>
          <b-col>
            <p>RM {{JSON.parse(taxInfo.content).summary.gross}}</p>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <p><b>Tax Deductions</b></p>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <p>Personal & Family</p>
          </b-col>
          <b-col>
            <p>RM {{JSON.parse(taxInfo.content).summary.family}}</p>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <p>EPF & Insurance</p>
          </b-col>
          <b-col>
            <p>RM {{JSON.parse(taxInfo.content).summary.epf}}</p>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <p>Medical & Education</p>
          </b-col>
          <b-col>
            <p>RM {{JSON.parse(taxInfo.content).summary.medical}}</p>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <p>Other Deductions</p>
          </b-col>
          <b-col>
            <p>RM {{JSON.parse(taxInfo.content).summary.other}}</p>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <p><b>Your Tax Summary</b></p>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <p>Net Taxable Income</p>
          </b-col>
          <b-col>
            <p>RM {{JSON.parse(taxInfo.content).summary.taxable}}</p>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <p>Total tax you should pay</p>
          </b-col>
          <b-col>
            <p>RM {{JSON.parse(taxInfo.content).summary.tax}}</p>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
</template>

<script>
    export default {
      name: "TaxSummary",

      props: ['taxInfo']
    }
</script>

<style scoped>

</style>
