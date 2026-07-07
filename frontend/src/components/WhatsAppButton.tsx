import { useContent } from "../api/hooks";
import { WhatsAppIcon } from "./icons";

const DEFAULT_NUMBER = "256700123000";
const PRESET_MESSAGE = "Hello Treasure Pharmacy, I'd like to ask about your services.";

export default function WhatsAppButton() {
  const { data: content } = useContent();
  const number = content?.["whatsapp-number"]?.text ?? DEFAULT_NUMBER;

  return (
    <a
      href={`https://wa.me/${number}?text=${encodeURIComponent(PRESET_MESSAGE)}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed right-5 bottom-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
