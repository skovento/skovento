/**
 * Contact helpers.
 *
 * These values now live in src/lib/site-config.ts, which is the single source
 * of truth shared by schema.org markup, llms.txt, the footer NAP and every
 * click-to-call link. Consistent name/address/phone across all of those is what
 * local search and AI engines use to resolve you as one entity — the same
 * number written three slightly different ways reads as three businesses.
 *
 * This file is kept as a thin re-export so existing imports keep working.
 * Prefer importing from '@/lib/site-config' in new code.
 */

import { siteConfig } from './site-config';

export const PHONE_NUMBER_DISPLAY = siteConfig.contact.phoneDisplay;
export const PHONE_NUMBER_TEL = siteConfig.contact.phone;
export const WHATSAPP_NUMBER = siteConfig.contact.whatsapp;
export const WHATSAPP_DEFAULT_MESSAGE = siteConfig.contact.whatsappMessage;

export const whatsappLink = (message: string = WHATSAPP_DEFAULT_MESSAGE) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const telLink = () => `tel:${PHONE_NUMBER_TEL}`;

export const mailtoLink = () => `mailto:${siteConfig.contact.email}`;
