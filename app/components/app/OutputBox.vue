<script setup lang="ts">
import {
  Item,
  ItemActions,
  ItemTitle,
} from "@/components/ui/item";

const { output } = defineProps<{
  output: string;
}>();
</script>

<template>
  <Item variant="outline">
    <div class="flex w-full gap-2">
      <ItemTitle class="w-full">
        {{ output }}
      </ItemTitle>
      <ItemActions>
        <AppButtonCopy
          :copy-text="output"
          variant="secondary"
        />
      </ItemActions>
    </div>
  </Item>
</template>
