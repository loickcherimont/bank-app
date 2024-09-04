<script>
import Top from '@/components/Top.vue';
import TransferForm from '@/components/TransferForm.vue';
import { ACCOUNT_MAXIMUM, ACCOUNT_MINIMUM, BANK_CEILING } from '@/utils/data';

export default {
  data() {
    return {
      userMoney: 21000,
      transferAmount: 0,
      error: {
        empty: false,
        forbiddenChar: false, //old: notValid
        overdraftReached: false,
        bankCeilingReached: false, // amount user can withdraw once directly
        maxReached: false, // amount user can deposit on the account
      },
      success: false,
      transferIsSet: false,
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
        return;
      } else {
        this.error.empty = false;
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


          // Check if the bank limit 
          if (Number(this.transferAmount) > BANK_CEILING) {
            this.error.bankCeilingReached = true;
            break;
          }
          // Check if overdraft is not reached
          else if (preTransfer < ACCOUNT_MINIMUM) {
            this.error.overdraftReached = true;
            break;
          }
          else {
            this.error.bankCeilingReached = false;
            this.error.overdraftReached = false;
            this.success = true;
            this.transferIsSet = true;
            this.userMoney -= Number(this.transferAmount);
            break;
          }


        default:
          preTransfer = this.userMoney + Number(this.transferAmount);

          if (preTransfer > ACCOUNT_MAXIMUM) {
            this.error.maxReached = true;
            setTimeout(() => this.error.maxReached = false, 3000);
            break;
          } else {
            this.error.maxReached = false;
            this.error.overdraftReached = false;
            this.error.bankCeilingReached = false;
            this.success = true;
            this.transferIsSet = true;
            this.userMoney += Number(this.transferAmount);
          }

      }
      setTimeout(() => {
        // this.transferAmount = 0;
        this.transferIsSet = false;
      }, 3000);
    },

    // Update <actions>[]
    handleAction(mode) {
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
    }

  },

  components: { TransferForm, Top }


}
</script>
<template>
  <div class='h-screen w-full'>
    <!-- HEADER -->


    <Top property='John Doe' :currentAccount="userMoney" />

    <!-- To display all types of errors -->
    <p class='error' :class="{ 'text-indigo-500': error.maxReached, 'text-red-500': !error.maxReached }">{{ displayError
      }}</p>


    <!-- Modes for transfer
      BLOCKED : test Yours and Mickael solutions
      -->
    <div class='modes flex justify-around items-center gap-x-2 h-16'>
      <div class='mode'>
        <input type='radio' id='deposit' value='Deposit' v-model="mode" :disabled="transferIsSet" />
        <label for='deposit' class='ms-1'>Deposit</label>
      </div>

      <div class='mode'>
        <input type='radio' id='withdrawal' value='Withdrawal' v-model="mode" :disabled="transferIsSet" />
        <label for='withdrawal' class='ms-1'>Withdrawal</label>
      </div>

    </div>

    <!-- Blocked: Move input and transfer props -->
    <!-- <Mode v-for="(m,index) in modes" v-bind="m" :key="index" :model-value="mode" @update:model-value="(newValue) => mode = newValue">{{ m.value }}</Mode> -->
    <TransferForm :formEvent="handleSubmit" :processInput="handleInput" v-model="transferAmount"
      :transferIsSet="transferIsSet" :mode="mode" />
    <!-- Todo: Display all result for user actions
    Better - display an history :
    
    You withdrew: <amount> <time>
    
    -->
    <!-- <div class='result'> -->
    <!-- Process history of transactions -->
    <!-- <p v-if="success && transferIsSet" :class="{ color: (mode === 'Deposit') ? 'text-emerald-500' : 'text-orange-500' }">{{ actionHistory
        }} {{ transferAmount }}€ </p> -->
    <!-- </div> -->
    <ul class='text-lg'>
      <h3 class='font-bold text-xl'>ACTIONS</h3>
      <li v-if="actions.length === 0" class='italic text-slate-600'>
        No actions done...
      </li>
      <li v-else v-for="action in actions" :key="action.id">
        Action {{ action.id }} - {{ action.message }} {{ action.amount }} € | {{ action.mode }} | {{ action.date }}
      </li>
    </ul>
    <table class='table-auto border-collapse'>
      <!-- <thead>
        <tr>
          <th>Action ID</th>
          <th>Message</th>
          <th>Amount</th>
          <th>Mode</th>
          <th>Date</th>
        </tr>
      </thead> -->
      <tbody>
        <template v-if="actions.length === 0" class='italic text-slate-600'>
          <!-- <li v-if="actions.length === 0" class='italic text-slate-600'>
        No actions done...
        </li> -->
          No actions done!
        </template>
        <template v-else v-for="action in actions" :key="action.id">
          <tr class='border-y-2 border-slate-700'>
            <td>{{ action.id }}</td>
            <td>{{ action.message }} {{ action.amount }}€</td>
            <td>{{ action.amount }}€</td>
            <td>{{ action.mode }}</td>
            <td>{{ action.date }}</td>
          </tr>
        </template>
      </tbody>



    </table>
  </div>
</template>

<style scoped></style>