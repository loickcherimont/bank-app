<script>
export default {
  data() {
    return {
      isShow: false,
    }
  },

  methods: {
    /**
     * Display or hide the menu
     * for mobile
     */
    toggleMenu() {
      this.isShow = !this.isShow;
    }
  }
}
</script>
<template>
  <div>
    <nav class='absolute right-2 top-2'>
      <!-- todo: Move toggle menu into @/components
        replace this homemade tool by a real icon
        use animation too
      -->
      <!-- Toggle menu appears only on mobiles -->
      <div class="md:hidden flex flex-col items-center justify-center gap-y-1 border w-8 h-7 rounded"
        @click="toggleMenu">
        <span v-for="n in 3" class='border-b border-slate-300 h-0.5 w-1/2'></span>
      </div>
      <div :class="{ 'hidden': isShow }">
        <div class='text-xs flex flex-col md:flex-row space-y-3 md:space-x-10 p-3' ref='menu'>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/settings">Account Settings</RouterLink>
        </div>
      </div>


    </nav>
    <RouterView />
  </div>

</template>