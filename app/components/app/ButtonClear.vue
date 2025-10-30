<script setup lang="ts">
import { Delete } from "lucide-vue-next";
import { Button } from "../ui/button";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { modelValue, variant } = defineProps<{
  modelValue: string;
  variant?: "default" | "secondary" | "outline" | "destructive" | "ghost" | "link";
}>();

const emit = defineEmits(["update:modelValue"]);

const clear = () => {
  emit("update:modelValue", "");
};
</script>

<template>
  <Button
    id="clear"
    :variant="variant || 'default'"
    class="cursor-pointer"
    aria-label="Clear"
    @click="clear"
  >
    <Delete />
  </Button>
</template>
