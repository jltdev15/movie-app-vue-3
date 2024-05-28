<script setup>
import SideBar from '../../components/Navigation/SideBar.vue'
import FilterNavBar from '../../components/Navigation/FilterNavBar.vue'

</script>

<template>
  <base-container>
    <div class="grid md:grid-cols-10">
      <FilterNavBar />
      <SideBar />
      <router-view v-slot="slotProps">
        <transition name="route" mode="out-in">
          <component :is="slotProps.Component"></component>
        </transition>
      </router-view>



    </div>







  </base-container>
</template>


<style>
.route-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.route-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.route-enter-active {
  transition: all 0.3s ease-out;
}

.route-leave-active {
  transition: all 0.3s ease-in;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateX(0);
}
</style>