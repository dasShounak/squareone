<script setup lang="ts">
import { ClipboardCheck, ClipboardCopy } from "lucide-vue-next";
import { Toaster, toast } from "vue-sonner";
import { Button } from "@/components/ui/button";

const { copyText } = defineProps<{
  copyText: string;
  variant?: "default" | "secondary" | "outline" | "destructive" | "ghost" | "link";
}>();

const isCopied = ref(false);
const copyButton = ref("");
const copy = async () => {
  try {
    await navigator.clipboard.writeText(copyText).then(() => {
      isCopied.value = true;
      if (copyText == "") {
        toast.warning("Output is empty.");
      }
      else {
        toast.success("Text has been copied!");
      }
      setTimeout(() => {
        isCopied.value = false;
      }, 3000)
      ;
    });
  }
  catch (err) {
    toast.error("FAILED to copy text. Error: " + err);
    console.error("Failed to copy:", err);
  }
};
</script>

<template>
  <Toaster
    rich-colors
    :close-button="true"
    close-button-position="top-right"
    theme="system"
  />
  <Button
    v-model="copyButton"
    :variant="variant || 'default'"
    class="cursor-pointer"
    @click="copy"
  >
    <component :is="isCopied ? ClipboardCheck : ClipboardCopy" />
  </Button>
</template>
