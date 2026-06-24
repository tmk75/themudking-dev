<script setup>
import logoUrl from '../assets/logo.png'
import { footerGroups } from '../data/siteContent'

const year = new Date().getFullYear()
</script>

<template>
  <footer id="footer" class="site-footer">
    <div class="container footer-grid">
      <div class="footer-brand">
        <RouterLink class="footer-brand-row" :to="{ path: '/' }" aria-label="75 Pillars home">
          <img class="footer-logo" :src="logoUrl" alt="75 Pillars" />
          <span class="footer-name">75 Pillars</span>
        </RouterLink>
        <p class="footer-tagline">Modern infrastructure for global money movement.</p>
      </div>

      <div v-for="group in footerGroups" :key="group.title" class="footer-col">
        <h2>{{ group.title }}</h2>
        <ul>
          <li v-for="link in group.links" :key="link.label">
            <RouterLink :to="link.to">{{ link.label }}</RouterLink>
          </li>
        </ul>
      </div>
    </div>

    <div class="container footer-bottom">
      <span>&copy; {{ year }} 75 Pillars. All rights reserved.</span>
      <span class="legal">Banking services provided by partner financial institutions.</span>
    </div>
  </footer>
</template>
