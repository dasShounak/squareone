<script setup lang="ts">
import { ref } from "vue";
import { Unlink, ClipboardCopy, ClipboardPaste, ClipboardCheck, Delete } from "lucide-vue-next";
import { Input } from "@/components/ui/input";
import { Button } from "~/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Toaster, toast } from "vue-sonner";
import "vue-sonner/style.css";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import {
  Item,
  ItemActions,
  ItemTitle,
} from "@/components/ui/item";

const url = ref("");
const output = ref("");

const defang = () => {
  const modifiedUrl = url.value.trim().replace(/^http/, "hxxp");

  try {
    // Parse URL safely (replace hxxp -> http temporarily)
    const parsed = new URL(modifiedUrl.replace(/^hxxp/, "http"));
    const host = parsed.hostname;

    // Replace only the dot before the TLD
    const parts = host.split(".");
    if (parts.length >= 2) {
      const lastDotIndex = host.lastIndexOf(".");
      const defangedHost
        = host.slice(0, lastDotIndex) + "[.]" + host.slice(lastDotIndex + 1);

      // Rebuild full URL
      const defangedUrl = modifiedUrl.replace(host, defangedHost);
      output.value = defangedUrl;
    }
    else {
      output.value = "Invalid URL";
    }
  }
  catch (e) {
    output.value = "Invalid URL " + e;
  }
};

const clear = () => {
  url.value = "";
};

// Clipboard
// Copy
const isCopied = ref(false);
const copyButton = ref("");
const copy = async () => {
  const copyText = output.value;

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

// Paste
const isPasted = ref(false);
const pasteButton = ref("");
const paste = async () => {
  try {
    await navigator.clipboard.readText().then((pasteText) => {
      url.value = pasteText;
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
  <div class="max-w-2xl mx-auto pt-20 px-5">
    <FieldSet>
      <FieldLegend>Defang URL</FieldLegend>
      <FieldDescription>Paste the URL to be defanged in the field below.</FieldDescription>
      <FieldGroup>
        <Field>
          <div class="flex gap-2 items-center">
            <ButtonGroup class="w-full">
              <Button
                v-model="pasteButton"
                variant="outline"
                class="cursor-pointer"
                aria-label="Paste"
                @click="paste"
              >
                <component :is="isPasted ? ClipboardCheck : ClipboardPaste" />
              </Button>
              <Input
                v-model="url"
                type="text"
                placeholder="Example: https://www.phishinglink.com"
                autocomplete="off"
              />
              <Button
                id="clear"
                variant="outline"
                class="cursor-pointer"
                aria-label="Clear"
                @click="clear"
              >
                <Delete />
              </Button>
            </ButtonGroup>
            <Button
              class="cursor-pointer"
              @click="defang"
            >
              <Unlink /> Defang
            </Button>
          </div>
        </Field>
      </FieldGroup>
      <Item variant="outline">
        <div class="flex w-full gap-2">
          <ItemTitle class="w-full">
            {{ output }}
          </ItemTitle>
          <ItemActions>
            <Toaster
              rich-colors
              :close-button="true"
              close-button-position="top-right"
              theme="system"
            />
            <Button
              v-model="copyButton"
              variant="secondary"
              class="cursor-pointer"
              @click="copy"
            >
              <component :is="isCopied ? ClipboardCheck : ClipboardCopy" />
            </Button>
          </ItemActions>
        </div>
      </Item>
    </FieldSet>
  </div>
</template>
