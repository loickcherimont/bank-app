<script>
import { OVERDRAFT } from '@/utils/data';

export default {
    data() {
        return {
            overdraft: OVERDRAFT
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
        <h1>Account Settings</h1>
        <ul>
            <h2>Account infos</h2>
            <li>Overdraft: {{ displayOverdraft }} €</li>
        </ul>
    </div>
</template>