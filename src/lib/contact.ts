export const PHONE_NUMBER_DISPLAY = '+91 91044 50552';
export const PHONE_NUMBER_TEL = '+919104450552';
export const WHATSAPP_NUMBER = '919104450552';
export const WHATSAPP_DEFAULT_MESSAGE = "Hi Skovento, I'd like to talk about a project.";

export const whatsappLink = (message: string = WHATSAPP_DEFAULT_MESSAGE) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const telLink = () => `tel:${PHONE_NUMBER_TEL}`;
