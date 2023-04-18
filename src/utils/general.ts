import { CONTACT_INFO } from "@/data/general";

export const generateWhatsAppLink = (message: string) => {
  const {whatsapp} = CONTACT_INFO
  const url = `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`;
  
  return url;
}