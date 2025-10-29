<script setup lang="ts">
import { ref } from "vue";
import { Unlink } from "lucide-vue-next";
import { Input } from "@/components/ui/input";
import { Button } from "~/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import "vue-sonner/style.css";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";

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
              <AppButtonPaste
                v-model="url"
                variant="outline"
              />
              <Input
                v-model="url"
                type="text"
                placeholder="Example: https://www.phishinglink.com"
                autocomplete="off"
              />
              <AppButtonClear
                v-model="url"
                variant="outline"
              />
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
      <!-- Output -->
      <AppOutputBox :output="output" />
    </FieldSet>
  </div>
</template>
