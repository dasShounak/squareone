<script lang="ts" setup>
import { ref } from "vue";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const emit = defineEmits(["update:modelValue"]);

const selected = ref("");
</script>

<template>
  <Select
    v-model="selected"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <SelectTrigger>
      <SelectValue placeholder="Select a timezone" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="system time">
        System Time
      </SelectItem>
      <SelectItem value="gmt">
        Greenwich Mean Time (GMT)
      </SelectItem>
      <SelectItem value="utc">
        Coordinated Universal Time (UTC)
      </SelectItem>
      <SelectGroup>
        <SelectLabel class="uppercase text-muted-foreground text-xs">
          North America
        </SelectLabel>
        <SelectItem value="est">
          Eastern Standard Time (EST)
        </SelectItem>
        <SelectItem value="cst">
          Central Standard Time (CST)
        </SelectItem>
        <SelectItem value="mt">
          Mountain Time (MT)
        </SelectItem>
        <SelectItem value="pst">
          Pacific Standard Time (PST)
        </SelectItem>
      </SelectGroup>
      <SelectGroup>
        <SelectLabel class="uppercase text-muted-foreground text-xs">
          Europe & Africa
        </SelectLabel>
        <SelectItem value="cet">
          Central European Time (CET)
        </SelectItem>
        <SelectItem value="eet">
          Eastern European Time (EET)
        </SelectItem>
        <SelectItem value="west">
          Western European Summer Time (WEST)
        </SelectItem>
        <SelectItem value="cat">
          Central Africa Time (CAT)
        </SelectItem>
        <SelectItem value="eat">
          East Africa Time (EAT)
        </SelectItem>
      </SelectGroup>
      <SelectGroup>
        <SelectLabel class="uppercase text-muted-foreground text-xs">
          Asia
        </SelectLabel>
        <SelectItem value="ist">
          India Standard Time (IST)
        </SelectItem>
        <SelectItem value="cst_china">
          China Standard Time (CST)
        </SelectItem>
        <SelectItem value="sst">
          Singapore Standard Time (SST)
        </SelectItem>
        <SelectItem value="jst">
          Japan Standard Time (JST)
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
