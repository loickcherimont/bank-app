<template>
  <!-- todo: Move into a toggle menu for mobiles -->
  <div>
    <nav class='absolute right-0'>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/settings">Account Settings</RouterLink>
    </nav>
    <RouterView />
  </div>

</template>