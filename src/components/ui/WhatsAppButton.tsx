import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const phoneNumber = process.env.REACT_APP_WHATSAPP_NUMBER || '1234567890';
  const whatsappUrl = `https://wa.me/${phoneNumber}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-3 md:p-4 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
      aria-label="Contact on WhatsApp"
    >
      <MessageCircle size={24} className="md:w-7 md:h-7" />
    </a>
  );
}