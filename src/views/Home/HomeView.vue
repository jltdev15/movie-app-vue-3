<script setup>
import SideBar from '../../components/Navigation/SideBar.vue'
import FilterNavBar from '../../components/Navigation/FilterNavBar.vue'

</script>

<template>
  <base-container>
    <div class="grid md:grid-cols-10">
      <FilterNavBar />
      <SideBar />
      <router-view />



    </div>







  </base-container>
</template>