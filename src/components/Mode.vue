<script>
export default {
    props: ['m', 'modelValue'],
    emits: ['update:modelValue'],
    computed: {
        value: {
            get() {
                return this.modelValue;
            },
            set(value) {
                this.$emit('update:modelValue', value);
            }
        }
    }
}

</script>

<template>
    <div class='mode'>
        <input type='radio' :value="modelValue" :id="id" @input="$emit('update:modelValue', $event.target.value)"/>
        <label :for="id" class='ms-1'><slot /></label>
    </div>
</template>
<!-- 

<div class='mode'>
          <input type='radio' id='deposit' value='Deposit' v-model="mode" :disabled="inputStates.transferIsSet" />
          <label for='deposit' class='ms-1'>Deposit</label>
        </div>

-->