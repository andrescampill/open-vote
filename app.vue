
<template>
  <div>
    <HeaderDefault v-if="!loggedIn"/>
    <HeaderSignned v-if="loggedIn" />
    <NuxtPage />
    <FooterDefault />
  </div>
</template>



<script setup>

const {loggedIn, fetch } = useUserSession();

fetch();

</script>
