export type Product = {
  _id: string;
  product_name: string;
  shortDescription?: string;
  longDescriptions?: string;
  exclusions?: string;
  operationalNotes?: string;
  deliverables: string;
  service_category: 'discovery' | 'design' | 'web_development' | 'marketing';
  product_type: 'bundle' | 'addon' | 'product';
  est_hrs: number;
  min: number; // flat price
  max: number; // flat price
  hourly_min: number;
  hourly_max: number;
  prerequisites: string[]; // <-- product _ids
};

export const dummyProducts: Product[] = [
  {
    _id: 'prod_001',
    product_name: 'Discovery Sprint',
    shortDescription: 'Define scope, pages, and technical needs before building.',
    longDescriptions:
      'A focused planning sprint to clarify goals, sitemap, content requirements, and development constraints so the build phase stays clean and predictable.',
    exclusions: 'No design comps, no development, no copywriting beyond outlines.',
    operationalNotes: 'Best scheduled before any redesign. Requires 1–2 stakeholder review touchpoints.',
    deliverables: 'Workshop notes; sitemap; page inventory; requirements doc; timeline estimate',
    service_category: 'discovery',
    product_type: 'bundle',
    est_hrs: 12,
    min: 900,
    max: 1800,
    hourly_min: 85,
    hourly_max: 125,
    prerequisites: [],
  },
  {
    _id: 'prod_002',
    product_name: 'Brand Landing Page (1 Page)',
    shortDescription: 'A single conversion page built for speed + clarity.',
    longDescriptions:
      'A high-quality marketing landing page designed and built to look sharp, load fast, and guide users toward one clear action.',
    exclusions: 'No multi-page website, no paid ads management, no heavy motion/3D effects.',
    operationalNotes: 'Includes 1 revision round + final polish pass.',
    deliverables: 'Responsive landing page; basic SEO meta; contact/form integration; QA pass',
    service_category: 'design',
    product_type: 'product',
    est_hrs: 18,
    min: 1200,
    max: 3500,
    hourly_min: 85,
    hourly_max: 140,
    prerequisites: ['prod_001'],
  },
  {
    _id: 'prod_003',
    product_name: 'UI Section Kit (Add-on)',
    shortDescription: 'Reusable sections to accelerate your site build.',
    longDescriptions:
      'A small set of reusable, styled sections (hero, features, CTA, FAQs, etc.) that keeps branding consistent and speeds up future page creation.',
    exclusions: 'No full page builds. No complete design system.',
    operationalNotes: 'Best paired with a landing page or redesign project.',
    deliverables: '4–6 reusable sections; responsive layout rules; basic component notes',
    service_category: 'design',
    product_type: 'addon',
    est_hrs: 10,
    min: 750,
    max: 1800,
    hourly_min: 85,
    hourly_max: 140,
    prerequisites: ['prod_002'],
  },
  {
    _id: 'prod_004',
    product_name: 'Wix Studio Refresh (Up to 5 pages)',
    shortDescription: 'Polish an existing Wix site for mobile + credibility.',
    longDescriptions:
      'A refresh focused on layout cleanup, mobile responsiveness, navigation clarity, and modernizing visual consistency without rebuilding everything from scratch.',
    exclusions: 'No full rebrand, no complex database apps, no custom backend.',
    operationalNotes: 'Great for small businesses that need a clean upgrade without a full rebuild.',
    deliverables: 'Up to 5 pages refreshed; mobile optimization; SEO basics; QA checklist',
    service_category: 'web_development',
    product_type: 'bundle',
    est_hrs: 25,
    min: 1800,
    max: 5000,
    hourly_min: 85,
    hourly_max: 140,
    prerequisites: ['prod_001'],
  },
  {
    _id: 'prod_005',
    product_name: 'Custom Multi-Step Form (Validation + Logic)',
    shortDescription: 'A guided form experience that reduces drop-off.',
    longDescriptions:
      'A polished multi-step form with strong validation, conditional logic, and user-friendly errors so submissions are clean and completion rates improve.',
    exclusions: 'No full CRM build. No payments unless added via a Stripe add-on.',
    operationalNotes: 'Ideal for event registrations, applications, lead intake, or complex contact forms.',
    deliverables: 'Multi-step form UI; validation rules; success/error states; submission handling',
    service_category: 'web_development',
    product_type: 'product',
    est_hrs: 16,
    min: 1200,
    max: 3800,
    hourly_min: 95,
    hourly_max: 150,
    prerequisites: ['prod_001'],
  },
  {
    _id: 'prod_006',
    product_name: 'Stripe Checkout Integration',
    shortDescription: 'Secure payment flow without leaving your site flow.',
    longDescriptions:
      'Stripe Checkout integration that handles line items, confirmation states, and a clean handoff to your backend for order tracking.',
    exclusions: 'No marketplace payouts. No subscriptions unless separately scoped.',
    operationalNotes: 'Built in Stripe test mode first, then rolled to live.',
    deliverables: 'Checkout flow; success/cancel pages; product mapping; basic order logging hooks',
    service_category: 'web_development',
    product_type: 'addon',
    est_hrs: 20,
    min: 1500,
    max: 4200,
    hourly_min: 95,
    hourly_max: 160,
    prerequisites: ['prod_005'],
  },
  {
    _id: 'prod_007',
    product_name: 'Technical SEO Audit (Implementation Ready)',
    shortDescription: 'Find SEO blockers + get a prioritized fix list.',
    longDescriptions:
      'A technical SEO scan that flags indexing issues, metadata gaps, performance bottlenecks, and structural opportunities so fixes can be applied quickly.',
    exclusions: 'No backlink outreach. No blog writing. No ranking guarantees.',
    operationalNotes: 'Audit output is prioritized so you can tackle high-impact fixes first.',
    deliverables: 'Audit report; prioritized recommendations; quick-win checklist',
    service_category: 'marketing',
    product_type: 'product',
    est_hrs: 8,
    min: 600,
    max: 1500,
    hourly_min: 85,
    hourly_max: 125,
    prerequisites: ['prod_001'],
  },
  {
    _id: 'prod_008',
    product_name: 'GA4 + Conversion Tracking Setup',
    shortDescription: 'Track key actions so you can measure performance.',
    longDescriptions:
      'Baseline GA4 setup with events and conversions so you stop guessing and start measuring the actions that matter.',
    exclusions: 'No advanced server-side tracking. No paid media optimization.',
    operationalNotes: 'Best done before launch or before campaigns are turned on.',
    deliverables: 'GA4 installed; conversion events defined; testing checklist; notes for reporting',
    service_category: 'marketing',
    product_type: 'addon',
    est_hrs: 10,
    min: 800,
    max: 1800,
    hourly_min: 85,
    hourly_max: 130,
    prerequisites: [],
  },
  {
    _id: 'prod_009',
    product_name: 'Email Welcome Automation (Mailchimp/Klaviyo)',
    shortDescription: 'Capture leads + deliver a clean first-touch sequence.',
    longDescriptions:
      'A simple but effective welcome automation that tags users correctly, sends the right message, and keeps your list organized.',
    exclusions: 'No full campaign copywriting. No deliverability guarantees or inbox-warming.',
    operationalNotes: 'You provide rough messaging; implementation includes logic + segmentation.',
    deliverables: 'Signup integration; 1 automation flow; tagging/segments; basic reporting setup',
    service_category: 'marketing',
    product_type: 'product',
    est_hrs: 14,
    min: 900,
    max: 2800,
    hourly_min: 85,
    hourly_max: 140,
    prerequisites: [],
  },
  {
    _id: 'prod_010',
    product_name: 'Monthly Website Maintenance (Retainer)',
    shortDescription: 'Keep your site stable, updated, and improving.',
    longDescriptions:
      'Ongoing monthly support for small fixes, updates, performance checks, and priority help so the site doesn’t rot over time.',
    exclusions: 'No major redesigns. No new page builds beyond small edits.',
    operationalNotes: 'Best when requests come in a single tracked queue (Notion/Trello/etc).',
    deliverables: 'Monthly updates; small development tasks; performance checks; status notes',
    service_category: 'web_development',
    product_type: 'bundle',
    est_hrs: 8,
    min: 600,
    max: 1500,
    hourly_min: 85,
    hourly_max: 140,
    prerequisites: [],
  },
];
