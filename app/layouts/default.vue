<script setup lang="ts">
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
</script>

<template>
  <SidebarProvider>
    <AppSidebarMain />
    <main class="w-full h-screen">
      <SidebarTrigger class="fixed sm:hidden bg-slate-800 m-2 w-10 h-10" />
      <div class="h-full">
        <slot />
      </div>
    </main>
  </SidebarProvider>
</template>
