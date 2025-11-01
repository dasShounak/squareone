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

  if (!modifiedUrl) {
    output.value = "Invalid URL";
    return;
  }

  // Restore protocol safely
  modifiedUrl = modifiedUrl
    .replace(/^hxxps/, "https")
    .replace(/^hxxp/, "http");

  // Replace defanged [.] back to .
  modifiedUrl = modifiedUrl.replace(/\[\.\]/g, ".");

  // If no protocol present, temporarily add one for validation
  const hasProtocol = /^(https?|ftp):\/\//i.test(modifiedUrl);
  const tempUrl = hasProtocol ? modifiedUrl : `http://${modifiedUrl}`;

  try {
    // Try parsing it with URL constructor
    const parsed = new URL(tempUrl);

    // Remove protocol again if original didn't have one
    output.value = hasProtocol
      ? parsed.href
      : parsed.href.replace(/^https?:\/\//, "").replace(/\/$/, "");
  }
  catch (e) {
    // Even if it's not parseable, return refanged text
    output.value = modifiedUrl.replace(/\/^/, "");
    console.log(e);
  }
};
</script>

<template>
  <div class="max-w-2xl mx-auto pt-20 px-5">
    <FieldSet>
      <FieldLegend>Refang URL or Email</FieldLegend>
      <FieldDescription>Paste the URL or the email address to be refanged in the field below.</FieldDescription>
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
    <p class="text-sm mt-4 text-muted-foreground">
      Want to defang instead? <NuxtLink
        to="/defang"
        class="text-teal-600 dark:text-teal-500 hover:underline"
      >Click here</NuxtLink>
    </p>
  </div>
</template>
