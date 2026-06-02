<script setup lang="ts">
import { computed } from "vue";
import { useData, useRoute } from "vitepress";
import VPFlyout from "vitepress/dist/client/theme-default/components/VPFlyout.vue";
import VPMenuLink from "vitepress/dist/client/theme-default/components/VPMenuLink.vue";
import { CURRENT, VERSIONS, NODE_VERSION_PAGE } from "../../config/constants";

const route = useRoute();
const { lang } = useData();

const isRu = computed(() => lang.value === "ru");

function versionEntry(version: string) {
  return isRu.value
    ? `/ru/${version}/${NODE_VERSION_PAGE}`
    : `/${version}/${NODE_VERSION_PAGE}`;
}

function versionPrefix(version: string) {
  return isRu.value ? `/ru/${version}/` : `/${version}/`;
}

function detectVersion(path: string) {
  const parts = path.split("/").filter(Boolean);
  if (parts[0] === "ru" && VERSIONS.includes(parts[1] as (typeof VERSIONS)[number])) {
    return parts[1];
  }
  if (VERSIONS.includes(parts[0] as (typeof VERSIONS)[number])) {
    return parts[0];
  }
  return null;
}

const activeVersion = computed(() => detectVersion(route.path) || CURRENT);

const activeVersionLabel = computed(() =>
  activeVersion.value === CURRENT
    ? `${activeVersion.value} (current)`
    : activeVersion.value,
);

const versionItems = computed(() =>
  VERSIONS.map((version) => ({
    text: version === CURRENT ? `${version} (current)` : version,
    link: versionEntry(version),
    activeMatch: versionPrefix(version),
  })),
);

const flyoutLabel = computed(() =>
  isRu.value ? "Сменить версию" : "Change version",
);

const sectionTitle = computed(() => (isRu.value ? "Версия" : "Version"));
</script>

<template>
  <VPFlyout
    class="VPNavBarVersions"
    :button="activeVersionLabel"
    :label="flyoutLabel"
  >
    <div class="items">
      <p class="title">{{ sectionTitle }}</p>
      <VPMenuLink
        v-for="item in versionItems"
        :key="item.link"
        :item="item"
      />
    </div>
  </VPFlyout>
</template>

<style scoped>
.VPNavBarVersions {
  display: none;
}

@media (min-width: 1280px) {
  .VPNavBarVersions {
    display: flex;
    align-items: center;
  }
}

.title {
  color: var(--vp-c-text-1);
  font-size: 14px;
  font-weight: 700;
  line-height: 32px;
  padding: 0 24px 0 12px;
}
</style>
