<template>
  <nav class="breadcrumb" aria-label="面包屑导航">
    <ol class="breadcrumb-list">
      <li v-for="(item, index) in items" :key="index" class="breadcrumb-item">
        <NuxtLink 
          v-if="item.path && index < items.length - 1" 
          :to="item.path" 
          class="breadcrumb-link"
        >
          {{ item.name }}
        </NuxtLink>
        <span v-else class="breadcrumb-current">{{ item.name }}</span>
        <span v-if="index < items.length - 1" class="breadcrumb-separator">/</span>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
interface BreadcrumbItem {
  name: string
  path?: string
}

defineProps<{
  items: BreadcrumbItem[]
}>()
</script>

<style lang="scss" scoped>
.breadcrumb {
  margin-bottom: 20px;
}

.breadcrumb-list {
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: 14px;
}

.breadcrumb-item {
  display: flex;
  align-items: center;
}

.breadcrumb-link {
  color: #666;
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: #ff6b35;
  }
}

.breadcrumb-current {
  color: #333;
  font-weight: 600;
}

.breadcrumb-separator {
  margin: 0 8px;
  color: #ccc;
}
</style> 