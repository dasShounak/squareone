<script setup lang="ts">
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "~/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { ScanEye } from "lucide-vue-next";

const queryString = ref("");
const result = ref<string | null>(null);
const loading = ref(false);

const scanIOC = async () => {
  result.value = null;
  loading.value = true;

  try {
    const res = await $fetch<{ finalOutput: string }>("/api/virustotal/scan", {
      query: { input: queryString.value }
    });
    result.value = res.finalOutput;
    console.log(result.value);
  }
  catch (err) {
    console.error(`Scan Failed: ${err}`);
  }
  finally {
    loading.value = false;
  }
};

// const { data: result } = await useFetch("/api/virustotal/ipscan");

// const config = useRuntimeConfig();

// const result = ref(null);

// const scanIOC = async () => {
//   const options = {
//     method: "GET",
//     headers: {
//       "accept": "application/json",
//       "x-apikey": config.VT_API_KEY,
//     }
//   };

//   const scanResult = await fetch("https://www.virustotal.com/api/v3/ip_addresses/1.156.17.126", options);
//   result.value = await scanResult.json();

//   return scanResult;
// };

// onMounted(() => {
//   scanIOC();
// });
</script>

<template>
  <div class="max-w-3xl mx-auto pt-20 px-5">
    <FieldSet>
      <FieldLegend>OSINT Scanner</FieldLegend>
      <FieldDescription>Paste the IP/Domain to be scanned below.</FieldDescription>
      <FieldGroup>
        <Field>
          <div class="flex gap-2 items-center">
            <ButtonGroup class="w-full">
              <AppButtonPaste
                v-model="queryString"
                variant="outline"
              />
              <Input
                v-model="queryString"
                type="text"
                placeholder="Example: 127.0.0.1"
                autocomplete="off"
              />
              <AppButtonClear
                v-model="queryString"
                variant="outline"
              />
            </ButtonGroup>
            <Button
              class="cursor-pointer"
              @click="scanIOC"
            >
              <ScanEye /> {{ loading ? "Scannning.." : "Scan" }}
            </Button>
          </div>
        </Field>
      </FieldGroup>
      <div v-if="result">
        <AppOutputBoxPre :output="result" />
      </div>
    </FieldSet>
  </div>
</template>
