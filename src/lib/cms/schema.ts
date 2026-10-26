/**
 * Content schema — the single place that defines what the admin panel can edit.
 *
 * Add a field here and it automatically appears in the admin form. To add a whole
 * new content type, add an entry to `collections` (a list of items) or `singles`
 * (one document, e.g. a page) and, if the public site should show it, read it in
 * src/lib/content.ts.
 */

export type FieldType =
  | 'text' | 'textarea' | 'markdown' | 'number' | 'boolean' | 'date' | 'select'
  | 'icon' | 'url' | 'email' | 'strings' | 'relation' | 'relations' | 'objects' | 'group' | 'datetime';

export interface Field {
  name: string;
  label: string;
  type: FieldType;
  help?: string;
  placeholder?: string;
  required?: boolean;
  readOnly?: boolean;
  options?: { value: string; label: string }[];
  /** relation / relations: name of the collection the slugs point to */
  relation?: string;
  /** objects / group: nested fields */
  fields?: Field[];
  /** objects: label for the "Add" button */
  itemLabel?: string;
  /** textarea rows */
  rows?: number;
}

export interface CollectionDef {
  name: string;
  label: string;
  singular: string;
  description: string;
  /** field shown as the item title in lists */
  titleField: string;
  /** field used to generate the id/slug when creating */
  slugFrom?: string;
  /** extra columns in the list view */
  columns?: string[];
  /** sort field (numeric asc, or string desc for dates) */
  sort?: { field: string; dir: 'asc' | 'desc' };
  fields: Field[];
  /** public URL pattern for "View on site" */
  publicPath?: string;
  /** hide "New" button (e.g. leads are created by the website form) */
  noCreate?: boolean;
}

export interface SingleDef {
  key: string;
  label: string;
  description: string;
  publicPath?: string;
  fields: Field[];
}

const text = (name: string, label: string, extra: Partial<Field> = {}): Field => ({ name, label, type: 'text', ...extra });
const area = (name: string, label: string, extra: Partial<Field> = {}): Field => ({ name, label, type: 'textarea', rows: 3, ...extra });
const strings = (name: string, label: string, extra: Partial<Field> = {}): Field => ({ name, label, type: 'strings', ...extra });
const order = (): Field => ({ name: 'order', label: 'Display order', type: 'number', help: 'Smaller numbers appear first.' });
const faqs = (): Field => ({
  name: 'faqs', label: 'FAQs', type: 'objects', itemLabel: 'FAQ',
  fields: [text('q', 'Question', { required: true }), area('a', 'Answer', { required: true })],
});

const ICONS = ['Globe', 'Smartphone', 'Bot', 'LayoutDashboard', 'PenTool', 'Cloud', 'TrendingUp', 'HeartPulse', 'ShoppingBag', 'GraduationCap', 'Building2', 'Truck', 'Hotel', 'Factory', 'Briefcase', 'Rocket', 'ShieldCheck', 'Gauge', 'Workflow', 'LifeBuoy', 'Star', 'Layers', 'Code2'];
export const ICON_OPTIONS = ICONS.map((i) => ({ value: i, label: i }));

export const collections: CollectionDef[] = [
  {
    name: 'service-categories', label: 'Service Categories', singular: 'category',
    description: 'Top-level service groups shown on the Services page and in the menu.',
    titleField: 'title', slugFrom: 'title', columns: ['icon', 'order'], sort: { field: 'order', dir: 'asc' }, publicPath: '/services/{id}',
    fields: [
      text('title', 'Title', { required: true }),
      { name: 'icon', label: 'Icon', type: 'icon' },
      area('summary', 'Short summary', { help: 'Shown on cards and in the menu.' }),
      area('description', 'Description', { rows: 5, help: 'Shown on the category page.' }),
      order(),
    ],
  },
  {
    name: 'services', label: 'Services', singular: 'service',
    description: 'Individual services (sub-categories). Each belongs to one category.',
    titleField: 'title', slugFrom: 'title', columns: ['categorySlug', 'order'], sort: { field: 'order', dir: 'asc' }, publicPath: '/services/{categorySlug}/{id}',
    fields: [
      text('title', 'Title', { required: true }),
      { name: 'categorySlug', label: 'Category', type: 'relation', relation: 'service-categories', required: true },
      area('summary', 'Short summary', { help: 'Also used as the meta description.' }),
      area('description', 'Description', { rows: 6 }),
      strings('deliverables', 'What the client gets', { help: 'One item per line.' }),
      strings('techs', 'Technologies'),
      faqs(),
      order(),
    ],
  },
  {
    name: 'industries', label: 'Industries', singular: 'industry',
    description: 'Sectors you build for.',
    titleField: 'title', slugFrom: 'title', columns: ['icon', 'order'], sort: { field: 'order', dir: 'asc' }, publicPath: '/industries/{id}',
    fields: [
      text('title', 'Title', { required: true }),
      { name: 'icon', label: 'Icon', type: 'icon' },
      area('summary', 'Summary'),
      strings('challenges', 'Common challenges'),
      strings('solutions', 'How we help'),
      { name: 'relatedServices', label: 'Related services', type: 'relations', relation: 'services' },
      { name: 'image', label: 'Image URL', type: 'url', help: 'e.g. /images/industry-retail.jpg or a full https link. Use a landscape photo (1280x800).' },
      text('imageAlt', 'Image description (alt text)', { help: 'Describe what the photo shows. Helps accessibility and SEO.' }),
      order(),
    ],
  },
  {
    name: 'technologies', label: 'Technology Groups', singular: 'group',
    description: 'Groups of tools shown on the Technologies page.',
    titleField: 'group', slugFrom: 'group', columns: ['order'], sort: { field: 'order', dir: 'asc' }, publicPath: '/technologies',
    fields: [text('group', 'Group name', { required: true }), area('description', 'Description'), strings('items', 'Technologies'), order()],
  },
  {
    name: 'projects', label: 'Projects', singular: 'project',
    description: 'Showcase projects. Keep "Sample project" ON until a project is real and approved.',
    titleField: 'title', slugFrom: 'title', columns: ['industry', 'isSample', 'order'], sort: { field: 'order', dir: 'asc' }, publicPath: '/projects/{id}',
    fields: [
      text('title', 'Title', { required: true }),
      { name: 'industry', label: 'Industry', type: 'relation', relation: 'industries' },
      { name: 'services', label: 'Services used', type: 'relations', relation: 'services' },
      area('summary', 'Short summary'),
      area('description', 'Description', { rows: 6 }),
      strings('highlights', 'Highlights'),
      strings('techs', 'Technologies'),
      { name: 'coverImage', label: 'Cover image URL', type: 'url', help: 'Optional. Falls back to the industry photo.' },
      text('coverAlt', 'Cover image description (alt text)'),
      { name: 'isSample', label: 'Sample project (shows a "Sample" label)', type: 'boolean' },
      order(),
    ],
  },
  {
    name: 'case-studies', label: 'Case Studies', singular: 'case study',
    description: 'Challenge → solution → outcome stories.',
    titleField: 'title', slugFrom: 'title', columns: ['client', 'isSample', 'order'], sort: { field: 'order', dir: 'asc' }, publicPath: '/case-studies/{id}',
    fields: [
      text('title', 'Title', { required: true }),
      text('client', 'Client (can be anonymised)'),
      { name: 'industry', label: 'Industry', type: 'relation', relation: 'industries' },
      { name: 'services', label: 'Services used', type: 'relations', relation: 'services' },
      area('summary', 'Short summary'),
      area('challenge', 'The challenge', { rows: 5 }),
      area('solution', 'What we built', { rows: 5 }),
      {
        name: 'results', label: 'Outcomes', type: 'objects', itemLabel: 'outcome',
        fields: [text('metric', 'Metric (e.g. "-40% no-shows")'), text('label', 'Description', { required: true })],
      },
      strings('techs', 'Technologies'),
      { name: 'coverImage', label: 'Cover image URL', type: 'url' },
      text('coverAlt', 'Cover image description (alt text)'),
      { name: 'isSample', label: 'Illustrative sample (hides metrics)', type: 'boolean' },
      order(),
    ],
  },
  {
    name: 'blogs', label: 'Blog Posts', singular: 'post',
    description: 'Articles. Unpublished posts are hidden from the website.',
    titleField: 'title', slugFrom: 'title', columns: ['category', 'publishedAt', 'published'], sort: { field: 'publishedAt', dir: 'desc' }, publicPath: '/blog/{id}',
    fields: [
      text('title', 'Title', { required: true }),
      text('category', 'Category', { placeholder: 'e.g. Technical SEO' }),
      area('excerpt', 'Excerpt', { help: 'Shown in lists and used as the meta description (aim for under 160 characters).' }),
      { name: 'body', label: 'Article', type: 'markdown', required: true, help: 'Use ## for headings, - for bullet lists, **bold**.' },
      { name: 'publishedAt', label: 'Publish date', type: 'date', required: true },
      { name: 'readingMinutes', label: 'Reading time (minutes)', type: 'number' },
      strings('tags', 'Tags'),
      { name: 'coverImage', label: 'Cover image URL', type: 'url' },
      text('coverAlt', 'Cover image description (alt text)'),
      { name: 'published', label: 'Published', type: 'boolean' },
    ],
  },
  {
    name: 'leads', label: 'Leads (CRM)', singular: 'lead',
    description: 'Enquiries from the website. Track status, owner and follow-ups here.',
    titleField: 'name', columns: ['status', 'service', 'createdAt'], sort: { field: 'createdAt', dir: 'desc' }, noCreate: true,
    fields: [
      { name: 'status', label: 'Status', type: 'select', options: ['new', 'contacted', 'qualified', 'proposal_sent', 'won', 'lost', 'spam'].map((v) => ({ value: v, label: v.replace('_', ' ') })) },
      { name: 'priority', label: 'Priority', type: 'select', options: ['low', 'normal', 'high'].map((v) => ({ value: v, label: v })) },
      text('assignedTo', 'Assigned to'),
      { name: 'followUpDate', label: 'Follow-up date', type: 'date' },
      { name: 'dealValue', label: 'Deal value (₹)', type: 'number' },
      area('notes', 'Internal notes', { rows: 5 }),
      text('name', 'Name', { readOnly: true }),
      { name: 'email', label: 'Email', type: 'email', readOnly: true },
      text('phone', 'Phone', { readOnly: true }),
      text('company', 'Company', { readOnly: true }),
      text('service', 'Service interested in', { readOnly: true }),
      text('budgetRange', 'Budget', { readOnly: true }),
      area('message', 'Message', { readOnly: true, rows: 5 }),
      text('source', 'Source', { readOnly: true }),
      text('pagePath', 'Submitted from', { readOnly: true }),
      { name: 'createdAt', label: 'Received', type: 'datetime', readOnly: true },
    ],
  },
];

const nav = (): Field => ({
  name: 'nav', label: 'Main menu', type: 'objects', itemLabel: 'menu link',
  fields: [text('label', 'Label', { required: true }), text('href', 'Link', { required: true, placeholder: '/services' })],
});

export const singles: SingleDef[] = [
  {
    key: 'settings', label: 'Site Settings', publicPath: '/',
    description: 'Brand, contact details, menu, SEO / indexing and tracking.',
    fields: [
      text('siteName', 'Site name', { required: true }),
      text('tagline', 'Tagline'),
      area('description', 'Site description', { help: 'Default meta description and used in structured data.' }),
      text('url', 'Public website URL', { placeholder: 'https://skovento.com' }),
      text('legalEntityName', 'Registered company name (optional)', { help: 'Shown in the footer and structured data only if filled. Leave empty to show just the brand name.' }),
      text('foundingYear', 'Founding year (optional)'),
      {
        name: 'contact', label: 'Contact details', type: 'group',
        fields: [
          { name: 'email', label: 'Public email', type: 'email', help: 'Leave empty to hide everywhere.' },
          text('phone', 'Phone'), text('whatsapp', 'WhatsApp number', { help: 'Digits with country code, e.g. 919876543210' }),
          text('addressLine', 'Address line'), text('city', 'City'), text('region', 'State / region'), text('country', 'Country'), text('hours', 'Working hours'),
        ],
      },
      {
        name: 'socials', label: 'Social profiles', type: 'group',
        fields: ['linkedin', 'x', 'instagram', 'github', 'youtube'].map((n) => ({ name: n, label: n[0].toUpperCase() + n.slice(1), type: 'url' as const })),
      },
      {
        name: 'seo', label: 'SEO & indexing', type: 'group',
        fields: [
          { name: 'allowIndexing', label: 'Allow search engines to index this site', type: 'boolean', help: 'OFF = hidden from Google and all crawlers (noindex, nofollow, robots.txt blocks everything, empty sitemap). Turn ON only at launch.' },
          text('titleTemplate', 'Title template', { help: '%s is replaced by the page title.' }),
          { name: 'defaultOgImage', label: 'Default social share image URL', type: 'url' },
        ],
      },
      {
        name: 'tracking', label: 'Analytics & tracking', type: 'group',
        fields: [
          text('gtmId', 'Google Tag Manager ID', { placeholder: 'GTM-XXXXXXX' }),
          text('ga4Id', 'Google Analytics 4 ID', { placeholder: 'G-XXXXXXXXXX' }),
          text('googleSiteVerification', 'Google Search Console verification token', { help: 'Only the content value of the meta tag.' }),
          text('bingSiteVerification', 'Bing verification token'),
          text('metaPixelId', 'Meta Pixel ID'),
          text('clarityId', 'Microsoft Clarity ID'),
          area('customHeadScript', 'Custom script (advanced)', { rows: 4, help: 'Raw JavaScript that runs on every public page. Only paste code you trust.' }),
        ],
      },
      {
        name: 'cta', label: 'Main call to action', type: 'group',
        fields: [text('primaryLabel', 'Primary button label'), text('primaryHref', 'Primary button link'), text('secondaryLabel', 'Secondary button label'), text('secondaryHref', 'Secondary button link')],
      },
      nav(),
      area('footerTagline', 'Footer text'),
    ],
  },
  {
    key: 'home', label: 'Home Page', publicPath: '/', description: 'Hero, stats, why-us pillars, process and FAQs on the home page.',
    fields: [
      {
        name: 'hero', label: 'Hero', type: 'group',
        fields: [text('eyebrow', 'Small label above the title'), text('titleLead', 'Title (first part)'), text('titleHighlight', 'Title (highlighted part)'), area('subtitle', 'Subtitle'), strings('terminalLines', 'Animated terminal lines', { help: 'Lines starting with $ are commands, ✓ are success.' })],
      },
      { name: 'stats', label: 'Stats strip', type: 'objects', itemLabel: 'stat', fields: [text('value', 'Value', { required: true }), text('label', 'Label', { required: true })] },
      { name: 'pillars', label: 'Why-us pillars', type: 'objects', itemLabel: 'pillar', fields: [{ name: 'icon', label: 'Icon', type: 'icon' }, text('title', 'Title', { required: true }), area('text', 'Text')] },
      { name: 'process', label: 'Process steps', type: 'objects', itemLabel: 'step', fields: [text('step', 'Number'), text('title', 'Title', { required: true }), area('text', 'Text')] },
      faqs(),
    ],
  },
  {
    key: 'about', label: 'About Page', publicPath: '/about', description: 'Company-first story, mission, values and facts.',
    fields: [
      text('headline', 'Headline'), area('intro', 'Intro', { rows: 4 }), area('mission', 'Mission'), area('vision', 'Vision'), area('story', 'Our story', { rows: 6 }),
      { name: 'values', label: 'Values', type: 'objects', itemLabel: 'value', fields: [text('title', 'Title', { required: true }), area('text', 'Text')] },
      { name: 'differentiators', label: 'How we are different', type: 'objects', itemLabel: 'point', fields: [text('title', 'Title', { required: true }), area('text', 'Text')] },
      { name: 'facts', label: 'Quick facts', type: 'objects', itemLabel: 'fact', fields: [text('label', 'Label', { required: true }), text('value', 'Value', { required: true })] },
      { name: 'image', label: 'Team / hero image URL', type: 'url' },
      text('imageAlt', 'Image description (alt text)'),
    ],
  },
  {
    key: 'contact', label: 'Contact Page', publicPath: '/contact', description: 'Headline and the options in the enquiry form.',
    fields: [text('headline', 'Headline'), area('intro', 'Intro'), strings('serviceOptions', 'Service dropdown options'), strings('budgetOptions', 'Budget dropdown options')],
  },
  {
    key: 'legal', label: 'Legal Pages', publicPath: '/privacy', description: 'Privacy Policy and Terms text (supports ## headings and - lists).',
    fields: [
      { name: 'privacy', label: 'Privacy Policy', type: 'markdown', rows: 14 },
      { name: 'terms', label: 'Terms & Conditions', type: 'markdown', rows: 14 },
    ],
  },
];

export const getCollection = (name: string) => collections.find((c) => c.name === name);
export const getSingle = (key: string) => singles.find((s) => s.key === key);
