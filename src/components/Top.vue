<script>
export default {
    props: {
        property: String,
        currentAccount: Number
    }
}
</script>

<template>
    <header class='bg-slate-200 flex flex-col items-center p-5 gap-y-5 h-52'>
      <!-- Account owner -->
      <h1 class='text-3xl font-thin'>{{ property }}</h1>

      <!-- All available money actually -->
      <div class='subtitles flex justify-center items-center w-full h-full'>
        <h3 class='text-7xl font-bold'>{{ currentAccount.toFixed(2) }}€</h3>
      </div>

    </header>
</template>