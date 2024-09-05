<script>
import { ACCOUNT_MAXIMUM, BANK_CEILING, OVERDRAFT } from '@/utils/data';

export default {
    data() {
        return {
            // Constants not mutable from account
            accountSettings: {
                'Overdraft': OVERDRAFT,
                'Bank Ceiling': BANK_CEILING,
                'Maximum': ACCOUNT_MAXIMUM,
            }
        }
    },
    computed: {
        displayOverdraft() {
            return this.overdraft.toFixed(2);
        }
    }
}
</script>
<template>
    <div class='settings'>
        <h1 class='text-3xl font-bold'>Account Settings</h1>
        <ul>
            <h2>Account infos</h2>
            <li v-for="(value, parameter) in accountSettings">{{ parameter }} : {{ value }} €</li>
        </ul>
    </div>
</template>