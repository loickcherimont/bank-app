<script>
import { ACCOUNT_MAXIMUM, BANK_CEILING, OVERDRAFT } from '@/utils/data';

export default {
    data() {
        return {
            //  Not mutable account data
            accountSettings: {
                'Overdraft': OVERDRAFT,
                'Bank Ceiling': BANK_CEILING,
                'Maximum': ACCOUNT_MAXIMUM,
            }
        }
    },
}
</script>
<template>
    <div>
        <h1 class='text-3xl font-bold'>Account Settings</h1>
        <ul>
            <li v-for="(value, parameter) in accountSettings">{{ parameter }} : {{ value }} €</li>
        </ul>
    </div>
</template>