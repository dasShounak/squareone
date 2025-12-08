<template>
  <div class="max-w-2xl mx-auto pt-20 px-5">
    <FieldSet>
      <FieldLegend>Date Picker</FieldLegend>
      <FieldGroup>
        <Field>
          <div class="space-y-4">
            <Select
              v-model="mode"
              class="flex flex-col gap-4 md:flex-row"
            >
              <!-- Mode Selector -->
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">
                  Date
                </SelectItem>
                <SelectItem value="datetime">
                  Date & Time
                </SelectItem>
                <SelectItem value="daterange">
                  Date Range
                </SelectItem>
                <SelectItem value="datetimerange">
                  Date & Time Range
                </SelectItem>
              </SelectContent>
            </Select>
            <AppSelectTimezoneMain
              v-model="timezone"
              class="flex-1"
            />

            <!-- Date/Time Picker -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="text-sm font-semibold">Start</label>
                <input
                  v-model="start"
                  :type="isDateTime ? 'datetime-local' : 'date'"
                  class="border rounded-md p-2 w-full text-muted-foreground"
                >
              </div>

              <div v-if="isRange">
                <label class="text-sm font-semibold">End</label>
                <input
                  v-model="end"
                  :type="isDateTime ? 'datetime-local' : 'date'"
                  class="border rounded-md p-2 w-full text-muted-foreground"
                >
              </div>
            </div>

            <AppOutputBox :output="formattedOutput" />
          </div>
        </Field>
      </FieldGroup>
    </FieldSet>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Field,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";

const mode = ref(null);
const start = ref("");
const end = ref("");
const timezone = ref(null);

const isRange = computed(() => mode.value?.includes("range"));
const isDateTime = computed(() => mode.value?.includes("time"));

function formatDate(dateStr) {
  if (!dateStr) return "";
  const date = new Date(dateStr);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: isDateTime.value ? "numeric" : undefined,
    minute: isDateTime.value ? "numeric" : undefined,
    hour12: true,
    timeZone: "UTC",
  };

  return date.toLocaleString("en-US", options) + (timezone.value ? ` ${timezone.value.toUpperCase()}` : "");
}

const formattedOutput = computed(() => {
  const s = formatDate(start.value);
  if (!isRange.value) return s;

  const e = formatDate(end.value);
  return s && e ? `${s} - ${e}` : " ";
});

// async function copy() {
//   if (formattedOutput.value) await navigator.clipboard.writeText(formattedOutput.value);
// }
</script>
