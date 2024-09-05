<script>
import Top from '@/components/Top.vue';
import TransferForm from '@/components/TransferForm.vue';
import Modes from '@/components/Modes.vue';
import { ACCOUNT_MAXIMUM, ACCOUNT_MINIMUM, BANK_CEILING } from '@/utils/data';

export default {
  data() {
    return {
      userMoney: 21000,
      transferAmount: 0,
      error: {
        isError: false,
        empty: false,
        forbiddenChar: false, 
        overdraftReached: false,
        bankCeilingReached: false, 
        maxReached: false,
      },
      success: false,
      mode: 'Deposit',
      modes: [
        { id: 'deposit', value: 'Deposit' },
        { id: 'withdrawal', value: 'Withdrawal' }
      ],
      actions: [],
    }
  },

  computed: {
    actionHistory() {
      return (this.mode === 'Withdrawal') ? 'You withdrew' : 'You deposited';
    },
    displayError() {

      const { empty, forbiddenChar, overdraftReached, bankCeilingReached, maxReached } = this.error;

      switch (true) {
        case empty:
          return 'Field needs to be filled and not null too!';
        case forbiddenChar:
          return 'Only numbers are allowed!';
        case overdraftReached || bankCeilingReached:
          return 'You cannot withdraw this amount!';
        case maxReached:
          return 'You reached the MAX of your account';

      }
    }
  },

  methods: {
    /**
     * Prevent user to send empty amount
     * Display an error if this happens
     * Else execute the transfer.
     * 
     * @function handleSubmit
     * 
     *   
     */
    handleSubmit() {
      if (!this.transferAmount) {
        this.error.empty = true;
        this.error.isError = true;
        return;
      } else {
        this.error.empty = false;
        this.error.isError = false;
        this.handlerTransfer(this.mode);
        this.handleAction(this.mode);
        this.transferAmount = 0;
      }
    },

    /**
   * Prevent user to input no-digits characters
   * Display an error if this happens
   * 
   * @function handleInput
   *   
   */
    handleInput() {
      this.error.empty = false;
      this.error.forbiddenChar = /\D/.test(this.transferAmount);
      return;
    },

    /**
     * Deposit or withdraw
     * The amount of user
     * Display action and reset input/action after 3s
     * 
     * @param mode - Transfer mode
     */
    handlerTransfer(mode) {
      let preTransfer;

      switch (mode) {
        case 'Withdrawal':
          preTransfer = this.userMoney - Number(this.transferAmount);


          // Check if the bank limit is reached
          if (Number(this.transferAmount) > BANK_CEILING) {
            this.error.bankCeilingReached = true;
            this.error.isError = true;
            break;
          }
          // Check if overdraft is not reached
          else if (preTransfer < ACCOUNT_MINIMUM) {
            this.error.overdraftReached = true;
            this.error.isError = true;
            break;
          }
          else {
            this.error.bankCeilingReached = false;
            this.error.overdraftReached = false;
            this.success = true;
            this.error.isError = false;
            this.userMoney -= Number(this.transferAmount);
            break;
          }


        default: // for Deposit
          preTransfer = this.userMoney + Number(this.transferAmount);

          if (preTransfer > ACCOUNT_MAXIMUM) {
            this.error.maxReached = true;
            this.error.isError = true;
            break;
          } else {
            this.error.maxReached = false;
            this.error.overdraftReached = false;
            this.error.bankCeilingReached = false;
            this.error.isError = false;
            this.success = true;
            this.userMoney += Number(this.transferAmount);
          }

      }
    },

    // Update <actions>[]
    handleAction(mode) {
      if (this.error.isError) return;

      let date = new Date();
      let action = {};
      action.id = Date.now();

      // Get current human date 
      action.date = new Intl.DateTimeFormat('en-GB', {
        dateStyle: 'short',
        timeStyle: 'short',
      }).format(date),

        action.message = (this.mode === 'Withdrawal') ? 'You withdrew' : 'You deposited';
      action.mode = mode.toUpperCase();
      action.amount = this.transferAmount;
      this.actions = [action, ...this.actions]
      this.actions
    }

  },

  components: { TransferForm, Top, Modes }


}
</script>
<template>
  <div class='h-screen w-full'>
    <!-- HEADER -->
    <Top property='John Doe' :currentAccount="userMoney" />

    <!-- To display all types of errors -->
    <p class='text-red-500'>{{ displayError
      }}</p>


    <!-- Modes for transfer -->
    <Modes v-model="mode"/>

    <TransferForm :formEvent="handleSubmit" :processInput="handleInput" v-model="transferAmount" :mode="mode" />

      <!-- Actions and history -->
    <ul class='text-lg actions'>
      <h3 class='font-bold text-xl'>ACTIONS</h3>
      <li v-if="actions.length === 0" class='italic text-slate-600'>
        No actions done...
      </li>
      <li v-else v-for="action in actions" :key="action.id">
        Action {{ action.id }} - {{ action.message }} {{ action.amount }} € | {{ action.mode }} | {{ action.date }}
      </li>
    </ul>
  </div>
</template>