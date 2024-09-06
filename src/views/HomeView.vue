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
      /** 
       * Fetch all actions done on the account
       * Withdrawal or deposit
       * This will contains <action> type Object
       */
      actions: [],
    }
  },

  computed: {

    /**
     * Handle all errors
     * 
     * @function displayError
     * @returns {string} - Specific error
     */
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
     * Deposit or withdraw money
     * Depending on the mode
     * 
     * @param {string} mode - Transfer mode
     * 
     */
    handlerTransfer(mode) {
      let preTransfer;

      switch (mode) {
        case 'Withdrawal':
          /** A checker to verify if user is allowed to do the transaction */
          preTransfer = this.userMoney - Number(this.transferAmount);


          /** Verify if bank ceiling is exceeded */
          if (Number(this.transferAmount) > BANK_CEILING) {
            this.error.bankCeilingReached = true;
            this.error.isError = true;
            break;
          }
          /** Verify if user can withdraw money */
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


        case 'Deposit':
          preTransfer = this.userMoney + Number(this.transferAmount);

          /** 
           * Verify if user exceeds the maximum limit
           * Of the account
           */
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

    /**
     * Update  <actions> state
     * That show all activities user did
     * If there aren't any error
     * 
     * @param {string} mode - Transfer mode
     */
    handleAction(mode) {
      if (this.error.isError) return;

      let date = new Date();
      let action = {};
      action.id = Date.now();

      /** Get human readable format of date and time */
      action.date = new Intl.DateTimeFormat('en-GB', {
        dateStyle: 'short',
        timeStyle: 'short',
      }).format(date),

        action.message = (this.mode === 'Withdrawal') ? 'You withdrew' : 'You deposited';
      action.mode = mode.toUpperCase();
      action.amount = this.transferAmount;
      this.actions = [action, ...this.actions];
    }

  },

  components: { TransferForm, Top, Modes }


}
</script>
<template>
  <div class='flex flex-col items-center justify-around h-full w-full'>
    <!-- HEADER -->
    <Top property='John Doe' :currentAccount="userMoney" />

    <!-- To display all types of errors -->
    <!-- Fix: Prevent error to display when there is no one -->
    <p class='text-red-500 border border-red-500 rounded bg-red-100'>{{ displayError
      }}</p>


    <!-- Modes for transfer -->
    <Modes v-model="mode" />

    <TransferForm :formEvent="handleSubmit" :processInput="handleInput" v-model="transferAmount" :mode="mode" />

    <!-- Actions -->
    <ul class='flex flex-col items-center text-md mb-3'>
      <h3 class='font-bold text-xl'>ACTIONS</h3>
      <li v-if="actions.length === 0" class='italic text-slate-600'>
        No actions done...
      </li>
      <template v-else v-for="action in actions" :key="action.id">
        <li class="flex justify-between gap-x-6 py-5 md:w-full border-b border-slate-300">
          <div class="flex min-w-0 gap-x-4">
            <div class="min-w-0 flex-auto">
              <p class="text-sm md:text-md font-semibold leading-6 text-gray-900">{{ action.mode }} {{ action.amount }} €</p>
              <p class="mt-1 truncate text-xs md:text-sm leading-5 text-gray-500">{{ action.message }} {{ action.amount }} € on {{ action.date }}</p>
            </div>
          </div>
        </li>
      </template>
    </ul>

  </div>
</template>