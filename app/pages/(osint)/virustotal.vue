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

const ip = ref("");
const result = ref<string | null>(null);
const loading = ref(false);

const scanIp = async () => {
  result.value = null;
  loading.value = true;

  try {
    const res = await $fetch<{ output: string }>("/api/virustotal/ipscan", {
      query: { ip: ip.value }
    });
    result.value = res.output;
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

// const scanIp = async () => {
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
//   scanIp();
// });
</script>

<template>
  <div class="max-w-2xl mx-auto pt-20 px-5">
    <FieldSet>
      <FieldLegend>VirusTotal</FieldLegend>
      <FieldDescription>Paste the IP to be scanned below.</FieldDescription>
      <FieldGroup>
        <Field>
          <div class="flex gap-2 items-center">
            <ButtonGroup class="w-full">
              <AppButtonPaste
                v-model="ip"
                variant="outline"
              />
              <Input
                v-model="ip"
                type="text"
                placeholder="Example: 127.0.0.1"
                autocomplete="off"
              />
              <AppButtonClear
                v-model="ip"
                variant="outline"
              />
            </ButtonGroup>
            <Button
              class="cursor-pointer"
              @click="scanIp"
            >
              <ScanEye /> {{ loading ? "Scannning.." : "Scan" }}
            </Button>
          </div>
        </Field>
      </FieldGroup>
      <div v-if="result">
        <AppOutputBox :output="result" />
      </div>
    </FieldSet>
  </div>
</template>
