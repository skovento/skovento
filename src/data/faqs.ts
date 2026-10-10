export interface Faq {
  question: string;
  answer: string;
}

export const homepageFaqs: Faq[] = [
  {
    question: 'What services does Skovento provide?',
    answer:
      'We provide business website development, e-commerce and booking systems, custom web applications, SaaS dashboards, API integrations, workflow automation, and technical SEO foundations. We focus on building digital products that solve real business problems.',
  },
  {
    question: 'How does a project begin?',
    answer:
      'A project begins with a free discovery conversation. We discuss your requirements, constraints, and goals. If it is a good fit, we prepare a clear written proposal covering scope, deliverables, timeline, and pricing before any work starts.',
  },
  {
    question: 'Can I see examples of your work?',
    answer:
      'Yes. Our Demonstrations page showcases independently created concept projects that illustrate how we approach different business challenges — from local business websites to booking systems and business dashboards. These are clearly labelled as concept projects, not client engagements.',
  },
  {
    question: 'How much does a website cost?',
    answer:
      'Pricing depends on scope, page count, and required functionality. A simple business website differs significantly in cost from a custom web application with authentication and integrations. We provide a detailed written proposal before any commitment is required.',
  },
  {
    question: 'Can you build custom web applications?',
    answer:
      'Yes. We build customer portals, admin dashboards, booking systems, data management tools, and SaaS products. We use React, Next.js, Node.js, and PostgreSQL, and integrate with third-party APIs and services as required.',
  },
  {
    question: 'Do you provide post-launch support?',
    answer:
      'Yes. Every project includes a defined post-launch support period. We also offer ongoing maintenance arrangements covering updates, security monitoring, and performance improvements. The exact terms are agreed in your project proposal.',
  },
];
