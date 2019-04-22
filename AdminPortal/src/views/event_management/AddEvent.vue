<template>
  <horizontal-stepper :steps="stepper" @completed-step="completeStep"
                        @active-step="isStepActive" @stepper-finished="alert" @on-dateFrom="onStepdateFrom" @on-dateTo="onStepdateTo" :forms="stepper[0].forms"
    >
  </horizontal-stepper>
</template>

<script>
  import HorizontalStepper from 'vue-stepper';
  import FormAddEvent from './FormAddEvent';
  import FormAddAgenda from './FormAddAgenda';
  import FormAddSpeakers from './FormAddSpeakers';

  export default {
    name: "AddEvent",
    components: {
      HorizontalStepper,
      FormAddEvent,
      FormAddAgenda,
      FormAddSpeakers
    },
    data() {
      return {
        stepper: [
          {
            icon: 'library_books',
            name: 'first',
            title: 'Add Event',
            component: FormAddEvent,
            completed: false,
            forms: {
              dateFrom: '',
              dateTo: '',
            },
          },
          {
            icon: 'person',
            name: 'third',
            title: 'Add Speaker',
            component: FormAddSpeakers,
            completed: false
          },
          {
            icon: 'list',
            name: 'second',
            title: 'Add Agenda',
            component: FormAddAgenda,
            completed: false
          }
        ],
        finalModel: ''
      }
    },

    methods: {
      completeStep(payload) {
        this.stepper.forEach((step) => {
          if (step.name === payload.name) {
            step.completed = true;
          }
        })
      },
      // Executed when @active-step event is triggered
      isStepActive(payload) {
        this.stepper.forEach((step) => {
          if (step.name === payload.name) {
            if(step.completed === true) {
              step.completed = false;
            }
          }
        })
      },
      // Executed when @stepper-finished event is triggered
      alert(payload) {
        alert('ends')
      },

      onStepdateFrom(date) {
        this.stepper[0].forms.dateFrom = date;
        //this.stepper[0].forms.dateTo = date[1];
      },

      onStepdateTo(date) {
        this.stepper[0].forms.dateTo = date;
        //this.stepper[0].forms.dateTo = date[1];
      }
    },

    mounted() {
      //this.$emit('can-continue', {value: true});
    }
  }
</script>

<style lang="scss">
  @import "../../assets/scss/variables";

  .vdp-datepicker{
    .form-control{
      background-color: white !important;
    }
  }

  .vdp-datepicker__calendar .cell.selected{
    background: $kpmgblue;
    color: white;
  }

  .or-parent{
    width: 100%;
    height: 1px;
    background: lightgrey;
    position: relative;

    .or-border{
      position: absolute;
      left: 50%;
      top: -10px;
      background: white;
      padding: 0 20px;
      transform: translate(-50%);
      color: lightgrey;
    }
  }

  .stepper-box{
    box-shadow: unset !important;
  }

  .step-title{
    h4{
      font-size: unset;
    }
  }

  .steps-wrapper{
    padding: unset !important;
  }

  .only-next{
    padding: unset !important;
    padding-top: 1rem !important;
  }
</style>
