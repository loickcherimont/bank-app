<script>
export default {
  props: {
    property: String,
    currentAccount: Number
  }
}
</script>

<template>
  <header class='bg-indigo-500 flex flex-col items-center p-5 h-full w-full rounded-b-full text-slate-100'>
    <!-- Account owner -->
    <h1 class='text-xl font-bold self-start'>{{ property }}</h1>

    <!-- All available money actually -->
    <div class='flex flex-col justify-center items-center w-full h-full font-bold'>
      <p class='text-indigo-900'>Total Balance</p>
      <h3 class='text-5xl'>{{ currentAccount.toFixed(2) }}€</h3>
    </div>

  </header>
</template>