import { MessageCircle } from 'lucide-react';

interface FloatingWhatsAppProps {
  onOpenContact?: () => void;
}

export function FloatingWhatsApp({ onOpenContact }: FloatingWhatsAppProps) {
  const whatsappUrl = "https://wa.me/918871694891?text=Hi!%20I%20have%20a%20question%20about%20the%20Crova%20Crochet%20Bundle.";

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end group">
      {/* Tooltip on hover */}
      <div className="hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-stone-900 text-white text-[11px] font-semibold py-1 px-2.5 rounded-md shadow-lg mb-1.5 whitespace-nowrap pointer-events-none">
        Need Help? Chat on WhatsApp
      </div>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="w-12 h-12 sm:w-14 sm:h-14 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full flex items-center justify-center shadow-2xl transition-all transform hover:scale-110 active:scale-95 cursor-pointer relative"
      >
        {/* Subtle pulsing background ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping pointer-events-none" />

        {/* WhatsApp Vector Icon */}
        <svg 
          viewBox="0 0 24 24" 
          className="w-7 h-7 sm:w-8 sm:h-8 fill-white"
        >
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M8.53 7.33C8.37 7.33 8.1 7.39 7.87 7.64C7.65 7.89 7 8.5 7 9.71C7 10.93 7.89 12.1 8.01 12.27C8.14 12.44 9.76 14.94 12.24 16.01C12.83 16.27 13.29 16.42 13.65 16.54C14.24 16.73 14.78 16.7 15.21 16.64C15.68 16.57 16.67 16.04 16.88 15.45C17.08 14.86 17.08 14.36 17.02 14.25C16.96 14.15 16.8 14.09 16.56 13.97C16.32 13.85 15.13 13.26 14.91 13.18C14.69 13.1 14.53 13.06 14.37 13.3C14.21 13.55 13.75 14.09 13.61 14.25C13.47 14.41 13.33 14.43 13.09 14.31C12.85 14.19 11.84 13.86 10.65 12.79C9.72 11.96 9.09 10.94 8.91 10.63C8.73 10.32 8.89 10.16 9.01 10.04C9.12 9.93 9.26 9.75 9.38 9.61C9.5 9.47 9.54 9.37 9.62 9.21C9.7 9.04 9.66 8.9 9.6 8.78C9.54 8.66 9.08 7.53 8.89 7.07C8.7 6.62 8.51 6.68 8.37 6.67H8.02L8.53 7.33Z" />
        </svg>
      </a>
    </div>
  );
}
