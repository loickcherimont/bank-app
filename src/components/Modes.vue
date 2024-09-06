<script>
export default {
    props: ['modelValue'],
    emits: ['update:modelValue'],
}
</script>
<template>
    <!--  
      Modes for transfer : Deposit/Withdraw
      Control by inputs:radio
    --> 
    <div class='flex justify-around items-center gap-x-2 h-16'>
        <div>
            <input type='radio' id='deposit' :value="'Deposit'" :checked="modelValue === 'Deposit'" @change="$emit('update:modelValue', $event.target.value)"/>
            <label for='deposit' class='ms-1'>Deposit</label>
        </div>
        <div>
            <input type='radio' id='withdrawal' :value="'Withdrawal'" :checked="modelValue == 'Withdrawal'" @change="$emit('update:modelValue', $event.target.value)"/>
            <label for='withdrawal' class='ms-1'>Withdrawal</label>
        </div>
    </div>
</template>