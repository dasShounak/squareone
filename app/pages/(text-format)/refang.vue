<script setup lang="ts">
import { ref } from "vue";
import { Link } from "lucide-vue-next";
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

const refang = () => {
  let modifiedUrl = url.value.trim();

  // Restore the protocol safely
  modifiedUrl = modifiedUrl.replace(/^hxxps/, "https").replace(/^hxxp/, "http");

  // Replace defanged [.] back to .
  modifiedUrl = modifiedUrl.replace(/\[\.\]/g, ".");

  // Optional: basic sanity check (not strict URL parsing)
  if (/^https?:\/\/[^\s/$.?#].[^\s]*$/i.test(modifiedUrl)) {
    output.value = modifiedUrl; // Looks like a valid URL
  }
  else {
    // Still show the refanged version even if it's not a valid URL
    output.value = "Invalid URL";
  }
};
</script>

<template>
  <div class="max-w-2xl mx-auto pt-20 px-5">
    <FieldSet>
      <FieldLegend>Refang URL</FieldLegend>
      <FieldDescription>Paste the URL to be refanged in the field below.</FieldDescription>
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
                placeholder="Example: hxxps://www.phishinglink[.]com"
                autocomplete="off"
              />
              <AppButtonClear
                v-model="url"
                variant="outline"
              />
            </ButtonGroup>
            <Button
              class="cursor-pointer"
              @click="refang"
            >
              <Link /> Refang
            </Button>
          </div>
        </Field>
      </FieldGroup>
      <!-- Output -->
      <AppOutputBox :output="output" />
    </FieldSet>
  </div>
</template>
