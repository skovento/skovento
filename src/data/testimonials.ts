export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  rating: number;
  avatarInitials: string;
}

export const testimonialsData: Testimonial[] = [
  {
    id: '1',
    quote: 'Skovento didn\'t just build us a website — they built us a system that actually brings in high-value customers predictably every single month.',
    author: 'Marcus Vance',
    role: 'Founder & CEO',
    company: 'Vance Logistics',
    rating: 5,
    avatarInitials: 'MV'
  },
  {
    id: '2',
    quote: 'Finally, a digital partner that understands both design and revenue metrics. Working with their combined dev and marketing team cut our time-to-market in half.',
    author: 'Elena Rostova',
    role: 'Marketing Director',
    company: 'BrightScale Solutions',
    rating: 5,
    avatarInitials: 'ER'
  },
  {
    id: '3',
    quote: 'Their attention to performance, speed, and UI micro-interactions is unmatched. Our conversion rate jumped by 180% within 90 days of launch.',
    author: 'Dr. Aris Thorne',
    role: 'Managing Partner',
    company: 'Thorne & Associates',
    rating: 5,
    avatarInitials: 'AT'
  },
  {
    id: '4',
    quote: 'Seamless communication, transparent timelines, and zero surprises. Skovento is the gold standard for full-service web agencies.',
    author: 'Sarah Jenkins',
    role: 'Head of Growth',
    company: 'Nova Pay',
    rating: 5,
    avatarInitials: 'SJ'
  }
];
