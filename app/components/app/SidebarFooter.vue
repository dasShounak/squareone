<script setup lang="ts">
import { Globe } from "lucide-vue-next";
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
</script>

<template>
  <SidebarFooter class="mt-auto text-sm px-4 mb-1">
    <SidebarMenu>
      <SidebarMenuItem>
        <div class="flex justify-between items-center">
          <p>Shounak Das &copy; 2025</p>
          <NuxtLink to="https://shattereddisk.github.io/rickroll/rickroll.mp4" external target="_blank"
            rel="noopener noreferrer">
            <Globe class="w-4" />
          </NuxtLink>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarFooter>
</template>
