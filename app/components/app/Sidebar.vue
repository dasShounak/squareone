<script setup lang="ts">
import { ChevronDown } from "lucide-vue-next";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const textFormatItems = [
  {
    title: "Defang URL",
    url: "/defang",
  },
  {
    title: "Refang URL",
    url: "/refang",
  },
];

const osintItems = [
  {
    title: "VirusTotal",
    url: "/comingsoon",
  },
  {
    title: "AbuseIPDB",
    url: "/comingsoon",
  },
  {
    title: "IBM X-Force",
    url: "/comingsoon",
  }
];

const route = useRoute();
</script>

<template>
  <Sidebar variant="floating">
    <SidebarContent>
      <AppSidebarHeader />
      <Collapsible
        default-open
        class="group/collapsible"
      >
        <SidebarGroup>
          <SidebarGroupLabel as-child>
            <CollapsibleTrigger class="cursor-pointer">
              TEXT FORMAT
              <ChevronDown class="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
            </CollapsibleTrigger>
          </SidebarGroupLabel>
          <CollapsibleContent>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem
                  v-for="item in textFormatItems"
                  :key="item.title"
                >
                  <SidebarMenuButton
                    as-child
                    :is-active="route.path === item.url"
                  >
                    <NuxtLink :to="item.url">
                      {{ item.title }}
                    </NuxtLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </CollapsibleContent>
        </SidebarGroup>
      </Collapsible>
      <Collapsible
        default-open
        class="group/collapsible"
      >
        <SidebarGroup>
          <SidebarGroupLabel as-child>
            <CollapsibleTrigger class="cursor-pointer">
              OSINT
              <ChevronDown class="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
            </CollapsibleTrigger>
          </SidebarGroupLabel>
          <CollapsibleContent>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem
                  v-for="item in osintItems"
                  :key="item.title"
                >
                  <SidebarMenuButton
                    as-child
                    :is-active="route.path === item.url"
                  >
                    <NuxtLink :to="item.url">
                      {{ item.title }}
                    </NuxtLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </CollapsibleContent>
        </SidebarGroup>
      </Collapsible>
      <AppSidebarFooter />
    </SidebarContent>
  </Sidebar>
</template>
