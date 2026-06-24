<script setup>
import SiteFooter from '../components/SiteFooter.vue'
import SiteHeader from '../components/SiteHeader.vue'
import {
  companyHighlights,
  insights,
  legalLinks,
  products,
  stats,
  trustSignals,
} from '../data/siteContent'

const iconPaths = {
  wallets: [
    'M4 6.75h16a1.75 1.75 0 0 1 1.75 1.75v10A1.75 1.75 0 0 1 20 20.25H4A1.75 1.75 0 0 1 2.25 18.5v-10A1.75 1.75 0 0 1 4 6.75Z',
    'M16 13.5h4.75',
    'M2.25 9.5H15a3 3 0 0 1 3 3',
  ],
  payments: [
    'M12 3v18',
    'M17.5 7H9.75a2.75 2.75 0 0 0 0 5.5h4.5a2.75 2.75 0 1 1 0 5.5H6',
  ],
  recipients: [
    'M9 11.5a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z',
    'M3.25 20a5.75 5.75 0 0 1 11.5 0',
    'M16 7.5a3.25 3.25 0 0 1 0 6.5',
    'M19.75 20a5.25 5.25 0 0 0-3.25-4.85',
  ],
  accounts: [
    'M12 11.5a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z',
    'M4.75 20.25a7.25 7.25 0 0 1 14.5 0',
  ],
}
</script>

<template>
  <div class="home">
    <SiteHeader />

    <main>
      <section class="hero">
        <div class="container hero-grid">
          <div class="hero-copy">
            <span class="eyebrow">Banking infrastructure, reimagined</span>
            <h1>Modern infrastructure for global money movement</h1>
            <p class="hero-sub">
              75 Pillars unifies accounts, wallets, payments and recipients into a single
              API-driven platform &mdash; built for businesses and consumers who expect more from their
              financial services.
            </p>

            <div class="hero-cta">
              <RouterLink class="btn btn-primary btn-lg" :to="{ path: '/app' }">
                Login to platform
              </RouterLink>
              <RouterLink class="btn btn-ghost btn-lg" :to="{ path: '/', hash: '#products' }">
                Explore products
              </RouterLink>
            </div>

            <ul class="hero-trust" aria-label="Platform capabilities">
              <li v-for="signal in trustSignals" :key="signal">{{ signal }}</li>
            </ul>
          </div>

          <div class="hero-visual" aria-hidden="true">
            <div class="orb orb-a"></div>
            <div class="orb orb-b"></div>
            <div class="glass-card">
              <div class="gc-row">
                <span class="gc-label">Total balance</span>
                <span class="gc-pill">USD</span>
              </div>
              <div class="gc-amount">$1,284,560.00</div>
              <div class="gc-bars">
                <span style="height: 38%"></span>
                <span style="height: 62%"></span>
                <span style="height: 48%"></span>
                <span style="height: 80%"></span>
                <span style="height: 56%"></span>
                <span style="height: 92%"></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="products" class="products section-offset">
        <div class="container">
          <div class="section-head">
            <span class="eyebrow">Platform</span>
            <h2>One platform, every money-movement need</h2>
            <p>
              Build and scale financial products on a single, unified core &mdash; from accounts and
              wallets to payments and recipient management.
            </p>
          </div>

          <div class="product-grid">
            <article
              v-for="product in products"
              :id="product.id"
              :key="product.id"
              class="card section-offset"
            >
              <div class="card-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                  <path
                    v-for="path in iconPaths[product.icon]"
                    :key="path"
                    :d="path"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <h3>{{ product.title }}</h3>
              <p>{{ product.description }}</p>
            </article>
          </div>
        </div>
      </section>

      <section id="company" class="stats section-offset">
        <div class="container">
          <div class="stats-head">
            <span class="eyebrow dark">Company</span>
            <h2>Trusted infrastructure at scale</h2>
            <p>Built for reliability, compliance and growth.</p>
          </div>

          <div class="stats-grid">
            <div v-for="stat in stats" :key="stat.label" class="stat">
              <div class="stat-value">{{ stat.value }}</div>
              <div class="stat-label">{{ stat.label }}</div>
            </div>
          </div>
        </div>
      </section>

      <section id="solutions" class="solutions section-offset">
        <div class="container split-section">
          <div>
            <span class="eyebrow">Solutions</span>
            <h2>Launch account and payment experiences with fewer handoffs</h2>
          </div>
          <p>
            Bring onboarding, balances, recipients, deposits and internal transfers into a single
            operational view for teams that need speed without losing control.
          </p>
        </div>
      </section>

      <section class="company-details">
        <div class="container detail-grid">
          <article
            v-for="item in companyHighlights"
            :id="item.id"
            :key="item.id"
            class="detail-card section-offset"
          >
            <h2>{{ item.title }}</h2>
            <p>{{ item.text }}</p>
          </article>
        </div>
      </section>

      <section id="insights" class="insights section-offset">
        <div class="container">
          <div class="section-head">
            <span class="eyebrow">Insights</span>
            <h2>Operate with clarity from day one</h2>
            <p>
              Centralized financial infrastructure gives teams a clearer path from product launch to
              ongoing payment operations.
            </p>
          </div>

          <div class="insight-grid">
            <article
              v-for="insight in insights"
              :id="insight.id"
              :key="insight.id"
              class="insight-card section-offset"
            >
              <h3>{{ insight.title }}</h3>
              <p>{{ insight.text }}</p>
            </article>
          </div>
        </div>
      </section>

      <section class="legal-section">
        <div class="container legal-grid">
          <article
            v-for="link in legalLinks"
            :id="link.id"
            :key="link.id"
            class="legal-card section-offset"
          >
            <h2>{{ link.label }}</h2>
            <p>{{ link.text }}</p>
          </article>
        </div>
      </section>

      <section class="cta-band">
        <div class="container cta-inner">
          <div class="cta-copy">
            <h2>Ready to get started?</h2>
            <p>Log in to access your accounts, wallets and payments in one place.</p>
          </div>
          <div class="cta-actions">
            <RouterLink class="btn btn-primary btn-lg" :to="{ path: '/app' }">
              Login to platform
            </RouterLink>
            <RouterLink class="btn btn-ghost btn-lg" :to="{ path: '/', hash: '#contact' }">
              Contact sales
            </RouterLink>
          </div>
        </div>
      </section>
    </main>

    <SiteFooter />
  </div>
</template>
