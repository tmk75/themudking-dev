<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import logoUrl from '../assets/logo.png'
import { navLinks } from '../data/siteContent'

const isScrolled = ref(false)

function updateScrollState() {
  isScrolled.value = window.scrollY > 12
}

onMounted(() => {
  updateScrollState()
  window.addEventListener('scroll', updateScrollState, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateScrollState)
})
</script>

<template>
  <header class="site-header" :class="{ scrolled: isScrolled }">
    <div class="container header-inner">
      <RouterLink class="brand" :to="{ path: '/' }" aria-label="75 Pillars home">
        <img class="brand-logo" :src="logoUrl" alt="75 Pillars" />
        <span class="brand-name">75 Pillars</span>
      </RouterLink>

      <nav class="nav-links" aria-label="Primary navigation">
        <RouterLink v-for="link in navLinks" :key="link.label" :to="link.to">
          {{ link.label }}
        </RouterLink>
      </nav>

      <div class="header-actions">
        <RouterLink class="btn btn-primary" :to="{ path: '/app' }">Login</RouterLink>
      </div>
    </div>
  </header>
</template>
