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
        <pre class="font-sans whitespace-pre-wrap">{{ output }}</pre>
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
