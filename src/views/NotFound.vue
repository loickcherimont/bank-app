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
        <h1 class='text-3xl font-bold text-indigo-500'>Not Found</h1>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Provident magni ab, quo laboriosam cupiditate alias odit explicabo aut non, quae dolore possimus, consectetur incidunt corrupti obcaecati. Magnam non sunt porro.</p>
    </div>
</template>