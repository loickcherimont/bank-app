<script>
import { ACCOUNT_MAXIMUM, BANK_CEILING, OVERDRAFT } from '@/utils/data';

export default {
    data() {
        return {
            /** Not mutable account data */
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

    <div class='h-screen'>
        <header class='bg-indigo-500 flex flex-col items-center p-5 rounded-b-full text-slate-100'>
            <!-- Account owner -->
            <h1 class='text-xl font-bold self-start'>John Doe</h1>

            <!-- All available money actually -->
            <div class='flex flex-col justify-center items-center w-full h-full font-bold'>
                <h3 class='text-5xl'>Settings</h3>
            </div>

        </header>
        <div class='flex flex-col items-center'>
            <h1 class='text-3xl font-bold'>Account Settings</h1>
            <ul class='text-gray-700'>
                <li v-for="(value, parameter) in accountSettings">{{ parameter }} : {{ value }} €</li>
            </ul>
        </div>
    </div>
</template>