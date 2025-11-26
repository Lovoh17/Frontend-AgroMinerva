<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <PublicNavbar />

    <main class="flex-1 min-h-[calc(100vh-140px)]">
      <router-view v-slot="{ Component, route }">
        <Transition name="page" mode="out-in" @before-enter="onBeforeEnter" @enter="onEnter" @leave="onLeave">
          <component :is="Component" :key="route.path" />
        </Transition>
      </router-view>
    </main>

    <PublicFooter />
  </div>
</template>

<script setup>
import PublicNavbar from '@/components/public/Navbar.vue'
import PublicFooter from '@/components/public/Footer.vue'

const onBeforeEnter = (el) => {
  el.style.opacity = '0'
  el.style.transform = 'translateX(20px)'
}

const onEnter = (el, done) => {
  el.animate(
    [
      { opacity: 0, transform: 'translateX(20px)' },
      { opacity: 1, transform: 'translateX(0px)' }
    ],
    {
      duration: 300,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      fill: 'forwards'
    }
  ).onfinish = done
}

const onLeave = (el, done) => {
  el.animate(
    [
      { opacity: 1, transform: 'translateX(0px)' },
      { opacity: 0, transform: 'translateX(-20px)' }
    ],
    {
      duration: 250,
      easing: 'cubic-bezier(0.4, 0, 1, 1)',
      fill: 'forwards'
    }
  ).onfinish = done
}
</script>

<style scoped>
/* Fallback CSS */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.page-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>