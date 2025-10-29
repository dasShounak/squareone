<script setup lang="ts">
import { ref } from "vue";
import { ClipboardPaste, ClipboardCheck } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import { toast } from "vue-sonner";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { modelValue } = defineProps<{
  modelValue: string;
  variant?: "default" | "secondary" | "outline" | "destructive" | "ghost" | "link";
}>();

const emit = defineEmits(["update:modelValue"]);

const isPasted = ref(false);
const pasteButton = ref("");

const paste = async () => {
  try {
    await navigator.clipboard.readText().then((pasteText) => {
      emit("update:modelValue", pasteText);
      isPasted.value = true;
      if (pasteText == "") {
        toast.warning("Output is empty.");
      }
      else {
        toast.success("Text has been pasted!");
      }
      setTimeout(() => {
        isPasted.value = false;
      }, 3000);
    });
  }
  catch (err) {
    toast.error("FAILED to paste text. Error: " + err);
    console.error("Failed to paste:", err);
  }
};
</script>

<template>
  <Button
    v-model="pasteButton"
    :variant="variant || 'default'"
    class="cursor-pointer"
    aria-label="Paste"
    @click="paste"
  >
    <component :is="isPasted ? ClipboardCheck : ClipboardPaste" />
  </Button>
</template>
