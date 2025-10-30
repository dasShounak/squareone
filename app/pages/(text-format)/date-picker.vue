<script setup lang="ts">
import type { DateValue, Time } from "@internationalized/date";
import {
  DateFormatter,
  getLocalTimeZone,
} from "@internationalized/date";
import { CalendarIcon } from "lucide-vue-next";

import { ref } from "vue";
// import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  TimeFieldInput,
  TimeFieldRoot,
} from "reka-ui";
import {
  Field,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";

const df = new DateFormatter("en-US", {
  dateStyle: "long",
});

const value = ref<DateValue>();
const time = ref<Time>();
const timezone = ref("");

const formatter = new DateFormatter("en-US", {
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});
</script>

<template>
  <div class="max-w-2xl mx-auto pt-20 px-5">
    <FieldSet>
      <FieldLegend class="mb-4">
        Date Picker
      </FieldLegend>
      <FieldGroup>
        <Field>
          <div class="w-full flex flex-col gap-4">
            <Popover>
              <div class="flex gap-2">
                <PopoverTrigger
                  as-child
                  class="flex-1"
                >
                  <Button
                    variant="outline"
                    class="justify-start text-left font-normal"
                  >
                    <CalendarIcon class="mr-2 h-4 w-4" />
                    <span class="text-slate-500 dark:text-slate-400">Pick a date</span>
                  </Button>
                </PopoverTrigger>
                <AppSelectTimezone
                  v-model="timezone"
                  class="flex-1"
                />
              </div>
              <PopoverContent class="w-auto p-0">
                <Calendar
                  v-model="value"
                  initial-focus
                />
                <TimeFieldRoot
                  v-slot="{ segments }"
                  v-model="time"
                  class="w-fit mx-auto mb-4 flex select-none items-center justify-center rounded-md shadow-sm text-center text-sm text-slate-200 border px-2 py-1 data-[invalid]:border-red-500"
                >
                  <div
                    v-for="item in segments"
                    :key="item.part"
                  >
                    <TimeFieldInput
                      v-if="item.part === 'literal'"
                      :part="item.part"
                    >
                      {{ item.value }}
                    </TimeFieldInput>
                    <TimeFieldInput
                      v-else
                      :part="item.part"
                      class="rounded p-0.5 focus:outline-none focus:border-2 focus:border-slate-400 data-[placeholder]:text-white"
                    >
                      {{ item.value }}
                    </TimeFieldInput>
                  </div>
                </TimeFieldRoot>
              </PopoverContent>
            </Popover>
            <AppOutputBox
              :output="value ? df.format(value.toDate(getLocalTimeZone())) + (time ? ' ' + formatter.format(new Date().setHours(time.hour, time.minute, time.second)) + ' ' + timezone.toUpperCase() : ' ' + timezone.toUpperCase()) : ''"
            />
          </div>
        </Field>
      </FieldGroup>
    </FieldSet>
  </div>
</template>
