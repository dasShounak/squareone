<script setup lang="ts">
import { Undo2 } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
</script>

<template>
  <div class="flex flex-col max-w-2xl h-full mx-auto justify-center space-y-4 text-center">
    <h1 class="text-4xl font-semibold">
      Coming Soon!
    </h1>
    <Button
      variant="outline"
      class="w-fit mt-4 cursor-pointer p-0 mx-auto"
    >
      <NuxtLink
        to="/"
        class="flex items-center justify-between gap-1 p-2"
      >
        <Undo2 /><span>Go Back</span>
      </NuxtLink>
    </Button>
  </div>
</template>
