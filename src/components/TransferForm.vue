<script>
export default {
    props: {
        formEvent: Function,
        processInput: Function,
        mode: String,
        modelValue: Number
    },

    emits: ['update:modelValue']
}
</script>
<template>
    <!-- Form to withdraw or deposit money -->
    <form @submit.prevent="formEvent" class='flex flex-col'>

        <div class=' flex flex-col gap-y-7 h-40'>
            <label for='transfer' class='font-bold text-3xl self-center mt-2'>Transfer</label>
            <input type='text' :value="modelValue" placeholder='Enter the transfer amount' id='transfer'
                @input="processInput"
                @change="$emit('update:modelValue', $event.target.value)"
                class='border border-slate-300 mx-2 rounded text-3xl text-indigo-700 focus:bg-slate-200/50 transition-colors duration-500 text-center w-40' />
        </div>

        <button class='rounded-full p-3 text-slate-200 text-lg bg-indigo-600 w-32 self-center'>{{
            mode
            }}</button>
    </form>
</template>