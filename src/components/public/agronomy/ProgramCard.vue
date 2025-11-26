<template>
  <div 
    class="bg-white border-2 border-gray-200 hover:border-accent-500 transition-all duration-300 overflow-hidden group cursor-pointer"
    @click="$emit('open-detail', subject)"
  >
    <div class="bg-tertiary-600 text-white p-4 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-accent-500 flex items-center justify-center font-bold text-lg">
          {{ subject.order }}
        </div>
        <div>
          <p class="text-xs text-primary-200">Ciclo {{ subject.cycle }}</p>
          <p class="font-bold">{{ subject.code }}</p>
        </div>
      </div>
      <div class="text-right">
        <p class="text-2xl font-bold">{{ subject.credits }}</p>
        <p class="text-xs text-primary-200">U.V.</p>
      </div>
    </div>

    <div class="p-4">
      <h3 class="text-lg font-bold text-gray-800 mb-3 min-h-[3rem] line-clamp-2">
        {{ subject.name }}
      </h3>

      <div v-if="subject.prerequisites.length > 0" class="mb-3">
        <p class="text-xs font-semibold text-gray-600 mb-2">Prerrequisitos:</p>
        <div class="flex flex-wrap gap-1">
          <span 
            v-for="prereq in subject.prerequisites" 
            :key="prereq"
            class="px-2 py-1 bg-gray-100 text-gray-700 text-xs border border-gray-300"
          >
            {{ prereq }}
          </span>
        </div>
      </div>
      <div v-else class="mb-3">
        <span class="px-2 py-1 bg-accent-100 text-accent-700 text-xs font-medium border border-accent-300">
          Sin prerrequisitos
        </span>
      </div>

      <div class="pt-3 border-t-2 border-gray-200">
        <span class="px-3 py-1 bg-tertiary-100 text-tertiary-700 text-xs font-semibold border border-tertiary-300">
          {{ subject.category }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

defineProps({
  subject: {
    type: Object,
    required: true
  }
})

defineEmits(['open-detail'])
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>