<script setup lang="ts">
import { SidebarHeader } from "~/components/ui/sidebar";
</script>

<template>
  <SidebarHeader>
    <div class="flex justify-between items-center">
      <NuxtLink
        to="/"
        class="text-2xl p-2 font-semibold"
      >Square<span class="text-teal-500">One</span></NuxtLink>
      <AppColorToggle />
    </div>
    <hr>
  </SidebarHeader>
</template>
