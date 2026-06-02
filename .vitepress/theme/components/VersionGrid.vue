<script setup lang="ts">
import { computed } from "vue";
import { useData } from "vitepress";
import { CURRENT, VERSIONS, NODE_VERSION_PAGE } from "../../config/constants";

const { lang } = useData();
const isRu = computed(() => lang.value === "ru");

function versionLink(version: string) {
  return isRu.value ? `/ru/${version}/${NODE_VERSION_PAGE}` : `/${version}/${NODE_VERSION_PAGE}`;
}
</script>

<template>
  <div class="version-grid">
    <a
      v-for="version in VERSIONS"
      :key="version"
      :href="versionLink(version)"
      class="version-card"
    >
      <span class="version-card__version">{{ version }}</span>
      <span v-if="version === CURRENT" class="version-card__badge">
        {{ isRu ? "текущая" : "current" }}
      </span>
      <span class="version-card__action">
        {{ isRu ? "Открыть документацию →" : "Open documentation →" }}
      </span>
    </a>
  </div>
</template>

<style scoped>
.version-grid {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  margin-top: 24px;
}

.version-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 20px;
  text-decoration: none;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
}

.version-card:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.version-card__version {
  color: var(--vp-c-text-1);
  font-size: 1.25rem;
  font-weight: 600;
}

.version-card__badge {
  color: var(--vp-c-brand-1);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.version-card__action {
  color: var(--vp-c-text-2);
  font-size: 0.875rem;
  margin-top: auto;
}

.version-card:hover .version-card__action {
  color: var(--vp-c-brand-1);
}
</style>
