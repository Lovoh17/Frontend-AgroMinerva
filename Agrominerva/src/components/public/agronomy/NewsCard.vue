<template>
  <article
    class="rounded-xl border border-gray-200 bg-white p-4 md:p-5 shadow-sm hover:shadow-md transition"
  >
    <!-- Categoría y fecha -->
    <div class="flex items-center justify-between gap-2 mb-2">
      <span class="text-xs font-semibold uppercase tracking-wide text-accent-600">
        {{ news.category }}
      </span>
      <span class="text-xs text-gray-500">
        {{ formatDate(news.date) }}
      </span>
    </div>

    <!-- Título -->
    <h3 class="text-lg md:text-xl font-semibold text-gray-900 mb-2">
      {{ news.title }}
    </h3>

    <!-- Ubicación -->
    <p v-if="news.location" class="text-xs text-gray-500 mb-2 flex items-center gap-1">
      <i class="pi pi-map-marker text-accent-600"></i>
      <span>{{ news.location }}</span>
    </p>

    <!-- Imagen + texto -->
    <div class="flex flex-col md:flex-row gap-3">
      <div v-if="news.image" class="md:w-32 flex-shrink-0">
        <img
          :src="news.image"
          :alt="news.title"
          class="w-full h-24 md:h-20 object-cover rounded-lg"
        />
      </div>
      <p class="text-sm text-gray-700 leading-relaxed">
        {{ news.excerpt }}
      </p>
    </div>

    <!-- Tags -->
    <div
      v-if="news.tags && news.tags.length"
      class="mt-3 flex flex-wrap gap-2"
    >
      <Tag
        v-for="tag in news.tags"
        :key="tag"
        :value="tag"
        severity="secondary"
        class="text-xs"
      />
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue'
import Tag from 'primevue/tag'

const props = defineProps({
  news: {
    type: Object,
    required: true
  }
})

const formatDate = (iso) => {
  if (!iso) return ''
  const d = new Date(iso)
  return d.toLocaleDateString('es-SV', {
    year: 'numeric',
    month: 'short',
    day: '2-digit'
  })
}
</script>
