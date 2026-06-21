export const navLinks = [
  { label: 'Products', to: { path: '/', hash: '#products' } },
  { label: 'Solutions', to: { path: '/', hash: '#solutions' } },
  { label: 'Company', to: { path: '/', hash: '#company' } },
  { label: 'Insights', to: { path: '/', hash: '#insights' } },
]

export const trustSignals = [
  'Business & consumer accounts',
  'Multi-currency wallets',
  'Real-time payments',
]

export const products = [
  {
    id: 'wallets',
    title: 'Wallets',
    description: 'Multi-currency wallets with real-time balances and instant internal transfers.',
    icon: 'wallet',
  },
  {
    id: 'payments',
    title: 'Payments & Deposits',
    description: 'Move money across rails with fast settlement and full transaction visibility.',
    icon: 'payments',
  },
  {
    id: 'recipients',
    title: 'Recipients',
    description: 'Register and manage payout recipients with built-in verification.',
    icon: 'recipients',
  },
  {
    id: 'accounts',
    title: 'Accounts',
    description: 'Onboard business and consumer accounts with KYC and compliance baked in.',
    icon: 'accounts',
  },
]

export const stats = [
  { value: '99.9%', label: 'Platform availability' },
  { value: '30+', label: 'Supported currencies' },
  { value: '24/7', label: 'Real-time processing' },
  { value: '< 1s', label: 'Internal transfers' },
]

export const companyHighlights = [
  {
    id: 'about',
    title: 'About',
    text: '75 Pillars connects modern companies and consumers to account, wallet, payment and recipient infrastructure from one secure platform.',
  },
  {
    id: 'careers',
    title: 'Careers',
    text: 'We are building reliable global money-movement tools with a team focused on security, speed and customer trust.',
  },
  {
    id: 'contact',
    title: 'Contact',
    text: 'Talk with sales about launching compliant financial services or centralizing payment operations.',
  },
]

export const insights = [
  {
    id: 'insights',
    title: 'API-led operations',
    text: 'Use unified account, wallet and payment data to reduce handoffs and operate with real-time visibility.',
  },
  {
    id: 'resilience',
    title: 'Security-first design',
    text: 'Permissioned access, verification workflows and partner-bank controls help teams scale responsibly.',
  },
]

export const legalLinks = [
  { id: 'privacy', label: 'Privacy', text: 'Privacy practices are designed around clear account ownership and protected customer data.' },
  { id: 'terms', label: 'Terms', text: 'Platform access is governed by product terms, acceptable use and partner institution requirements.' },
  { id: 'compliance', label: 'Compliance', text: 'KYC, recipient verification and transaction visibility support compliant money movement.' },
  { id: 'security', label: 'Security', text: 'Security controls prioritize account protection, access management and operational resilience.' },
]

export const footerGroups = [
  {
    title: 'Products',
    links: [
      { label: 'Wallets', to: { path: '/', hash: '#wallets' } },
      { label: 'Payments', to: { path: '/', hash: '#payments' } },
      { label: 'Recipients', to: { path: '/', hash: '#recipients' } },
      { label: 'Accounts', to: { path: '/', hash: '#accounts' } },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', to: { path: '/', hash: '#about' } },
      { label: 'Careers', to: { path: '/', hash: '#careers' } },
      { label: 'Insights', to: { path: '/', hash: '#insights' } },
      { label: 'Contact', to: { path: '/', hash: '#contact' } },
    ],
  },
  {
    title: 'Legal',
    links: legalLinks.map((link) => ({
      label: link.label,
      to: { path: '/', hash: `#${link.id}` },
    })),
  },
]
