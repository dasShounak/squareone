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
  const input = url.value.trim();

  if (!input) {
    output.value = "Invalid URL";
    return;
  }

  // Check if protocol exists
  const hasProtocol = /^(https?|ftp):\/\//i.test(input);
  const tempUrl = hasProtocol ? input : `http://${input}`;

  try {
    // Always parse a valid URL
    const parsed = new URL(tempUrl);
    const host = parsed.hostname;

    // Split domain and replace only the last dot before TLD
    const parts = host.split(".");
    if (parts.length < 2) {
      output.value = "Invalid URL";
      return;
    }

    const lastDotIndex = host.lastIndexOf(".");
    const defangedHost
      = host.slice(0, lastDotIndex) + "[.]" + host.slice(lastDotIndex + 1);

    // Build the final defanged URL
    let defangedUrl = parsed.href.replace(host, defangedHost);

    // Replace protocol with hxxp/hxxps for defanging
    defangedUrl = defangedUrl
      .replace(/^https:/i, "hxxps:")
      .replace(/^http:/i, "hxxp:");

    // If no protocol in input, remove ours
    if (!hasProtocol) {
      defangedUrl = defangedUrl.replace(/^hxxp:\/\//i, "");
    }

    output.value = defangedUrl.replace(/\/$/, "");
  }
  catch (e) {
    output.value = "Invalid URL: " + e;
    console.log(e);
  }
};
</script>

<template>
  <div class="max-w-2xl mx-auto pt-20 px-5">
    <FieldSet>
      <FieldLegend>Defang URL or Email</FieldLegend>
      <FieldDescription>Paste the URL or the email address to be defanged in the field below.</FieldDescription>
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
    <p class="text-sm mt-4 text-muted-foreground">
      Want to refang instead? <NuxtLink
        to="/refang"
        class="text-teal-600 dark:text-teal-500 hover:underline"
      >Click here</NuxtLink>
    </p>
  </div>
</template>
