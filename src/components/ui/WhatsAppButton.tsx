// src/components/ui/WhatsAppButton.tsx
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  // Remove the unused isVisible state
  const phoneNumber = process.env.REACT_APP_WHATSAPP_NUMBER || '1234567890';
  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
      aria-label="Contact on WhatsApp"
    >
      <MessageCircle size={24} className="md:w-7 md:h-7" />
      <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-ink-950 animate-pulse" />
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-ink-900 text-white text-xs font-medium rounded-lg border border-white/10 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        Chat with us
      </span>
    </a>
  );
}