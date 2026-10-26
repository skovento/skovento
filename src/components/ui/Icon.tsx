import {
  ArrowRight, ArrowUpRight, Bot, Briefcase, Building2, Check, ChevronDown, Cloud, Factory, Gauge, Globe,
  GraduationCap, HeartPulse, Hotel, Layers, LayoutDashboard, LifeBuoy, Mail, MapPin, Menu, MessageCircle,
  PenTool, Phone, Rocket, ShieldCheck, ShoppingBag, Smartphone, Star, TrendingUp, Truck, Workflow, X,
  Clock, Code2, type LucideIcon,
} from 'lucide-react';

const icons: Record<string, LucideIcon> = {
  ArrowRight, ArrowUpRight, Bot, Briefcase, Building2, Check, ChevronDown, Cloud, Factory, Gauge, Globe,
  GraduationCap, HeartPulse, Hotel, Layers, LayoutDashboard, LifeBuoy, Mail, MapPin, Menu, MessageCircle,
  PenTool, Phone, Rocket, ShieldCheck, ShoppingBag, Smartphone, Star, TrendingUp, Truck, Workflow, X,
  Clock, Code2,
};

export function Icon({ name, className, size = 20 }: { name: string; className?: string; size?: number }) {
  const C = icons[name] ?? Layers;
  return <C className={className} size={size} aria-hidden="true" />;
}
