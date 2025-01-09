
<template>
  <div>
    <HeaderDefault v-if="!loggedIn"/>
    <HeaderSignned v-if="loggedIn" />
    <NuxtPage />
  </div>
</template>



<script setup>

const {loggedIn, fetch } = useUserSession();

fetch();

</script>
